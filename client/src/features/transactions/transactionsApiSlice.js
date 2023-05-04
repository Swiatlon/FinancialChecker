import { createSelector } from '@reduxjs/toolkit';
import apiSlice from '../api/apiSlice';

export const transactionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: (userID) => `api/transaction?userID=${userID}`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (response) => {
        const sortedExpenses = response.expenses.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        response.expenses = sortedExpenses;

        const sortedPayments = response.payments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        response.payments = sortedPayments;

        return response;
      },
      providesTags: ['Transaction'],
    }),

    addNewTransaction: builder.mutation({
      query: (initialTransaction) => ({
        url: 'api/transaction',
        method: 'POST',
        body: initialTransaction,
      }),
      invalidatesTags: ['Transaction'],
    }),
  }),
});

export const { useGetTransactionsQuery, useAddNewTransactionMutation } = transactionsApiSlice;

export const selectTransactionsResult = (userID) => transactionsApiSlice.endpoints.getTransactions.select(userID);

export const selectExpenses = (userID) =>
  createSelector(selectTransactionsResult(userID), (transactions) => transactions?.data?.expenses.length);

// export const selectTotalAmountOfTransactions = createSelector(selectTransactions, (transactions) =>
//   transactions.reduce((total, transaction) => total + transaction.amount, 0),
// );

