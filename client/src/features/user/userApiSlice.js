import apiSlice from '../api/apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (userID) => `api/user?id=${userID}`,
      method: 'GET',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedUser = { ...responseData };
        loadedUser.id = loadedUser._id;
        return loadedUser;
      },
      providesTags: ['User'],
    }),

    deleteUser: builder.mutation({
      query: ({ id, password }) => ({
        url: 'api/user',
        method: 'DELETE',
        body: { id, password },
      }),
      invalidatesTags: ['User'],
    }),

    updateUser: builder.mutation({
      query: (initialUserData) => ({
        url: 'api/user',
        method: 'PATCH',
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetUserQuery, useDeleteUserMutation, useUpdateUserMutation } = userApiSlice;
