import { createSelector } from '@reduxjs/toolkit';
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
    }),

    addNewUser: builder.mutation({
      query: (initialUserData) => ({
        url: 'api/user',
        method: 'POST',
        body: {
          ...initialUserData,
        },
        invalidatesTags: (result, error, arg) => [{ type: 'User', id: 'user' }],
      }),
    }),

    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: '/users',
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }],
    }),

    updateUser: builder.mutation({
      query: (initialUserData) => ({
        url: '/users',
        method: 'PATCH',
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }],
    }),
  }),
});

export const { useGetUserQuery, useAddNewUserMutation, useDeleteUserMutation, useUpdateUserMutation } = userApiSlice;
