import apiSlice from '../api/apiSlice';
import { logOut, setCredentials } from './authSlice';

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credntials) => ({
        url: '/auth',
        method: 'POST',
        body: { ...credntials },
      }),
    }),

    sendLogout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logOut());
          dispatch(apiSlice.util.resetApiState()); // clear main data + cache in main API Data Storage
          return true;
        } catch (err) {
          return err;
        }
      },
    }),

    createNewUser: builder.mutation({
      query: (initialUserData) => ({
        url: 'auth/register',
        method: 'POST',
        body: {
          ...initialUserData,
        },
        invalidatesTags: (result, error, arg) => [{ type: 'User', id: 'user' }],
      }),
    }),

    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken }));
          return true;
        } catch (err) {
          return err;
        }
      },
    }),
  }),
});

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation, useCreateNewUserMutation } = authApiSlice;
