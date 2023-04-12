import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import apiSlice from '../api/apiSlice';

const transactionsAdapter = createEntityAdapter({});

const initialState = transactionsAdapter.getInitialState();

export const transactionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: () => 'api/transaction',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedTransactions = responseData.map((transaction) => {
          transaction.id = transaction._id;
          return transaction;
        });
        return transactionsAdapter.setAll(initialState, loadedTransactions);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [{ type: 'Transactions', id: 'LIST' }, ...result.ids.map((id) => ({ type: 'Transactions', id }))];
        }
        return [{ type: 'Transactions', id: 'LIST' }];
      },
    }),

    addNewTransaction: builder.mutation({
      query: (initialTransaction) => ({
        url: 'api/transaction',
        method: 'POST',
        body: initialTransaction,
      }),
    }),
  }),
});

export const { useGetTransactionsQuery, useAddNewTransactionMutation } = transactionsApiSlice;
