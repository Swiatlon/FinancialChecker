import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials } from '../auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://financial-checker-api.onrender.comm',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState().auth;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // console.log(args) // request url, method, body
  // console.log(api) // signal, dispatch, getState()
  // console.log(extraOptions) //custom like {shout: true}
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    // send refresh token to get new access token
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

    if (refreshResult?.data) {
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }));

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = 'Your login has expired. ';
      }
      return refreshResult;
    }
  }

  return result;
};

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Transaction'],
  endpoints: (builder) => ({}),
});

export default apiSlice;
