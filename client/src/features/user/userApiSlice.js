import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import apiSlice from '../api/apiSlice';

const userAdapter = createEntityAdapter({});

const initialState = userAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (userID) => `api/user?id=${userID}`,  // there will be query which user
      method: 'GET',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedUser = { ...responseData };
        loadedUser.id = loadedUser._id;
        return userAdapter.setOne(initialState, loadedUser);
      },
    }),

    addNewUser: builder.mutation({
      query: (initialUserData) => ({
        url: 'api/user',
        method: 'POST',
        body: {
          ...initialUserData,
        },
        invalidatesTags: (result, error, arg) => [{ type: 'User', id: 'LIST' }],
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
