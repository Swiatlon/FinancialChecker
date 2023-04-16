import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import apiSlice from '../api/apiSlice';

const transactionsAdapter = createEntityAdapter({});

const initialState = transactionsAdapter.getInitialState();

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

export function getMonthlyTransactions(array) {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const dailyTransaction = {};

  array
    .filter(
      (transaction) => new Date(transaction.createdAt) >= startOfMonth && new Date(transaction.createdAt) <= endOfMonth,
    )
    // Summary Daily Transactions
    .forEach((transaction) => {
      const date = new Date(transaction.createdAt).toLocaleDateString('en-gb', { day: 'numeric' });
      const { amount } = transaction;

      if (dailyTransaction[date]) {
        dailyTransaction[date] += amount;
      } else {
        dailyTransaction[date] = amount;
      }
    });

  return dailyTransaction;
}

export function getWeeklyExpenses(array) {
  const now = new Date();

  const currentDay = now.getDay();
  const daysSinceMonday = currentDay === 0 ? 6 : currentDay - 1;

  const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - daysSinceMonday); // Monday
  const endOfWeek = new Date(now.getFullYear(), now.getMonth(), startOfWeek.getDate() + 6); // Sunday
  
  const days = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

  const dailyExpenses = {};

  array
    .filter(
      (transaction) => new Date(transaction.createdAt) >= startOfWeek && new Date(transaction.createdAt) <= endOfWeek,
    )
    .forEach((transaction) => {
      const date = new Date(transaction.createdAt);
      const dayOfWeek = date.getDay() - 1;
      const { amount } = transaction;

      if (dailyExpenses[days[dayOfWeek]]) {
        dailyExpenses[days[dayOfWeek]] += amount;
      } else {
        dailyExpenses[days[dayOfWeek]] = amount;
      }
    });

  return dailyExpenses;
}

export function getLastSixExpenses(array) {
  const LastExpenses = Array(6).fill(0);
  for (let i = 0; i < 6; i += 1) {
    LastExpenses[i] = array[array.length - 1 - i];
  }

  return LastExpenses;
}

export function getMoneyBalance(expenses, payments) {
  const expensesSum = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const paymentsSum = payments.reduce((acc, payment) => acc + payment.amount, 0);

  return paymentsSum - expensesSum;
}

export function getMonthlyBalance(expenses, payments) {
  const expensesSum = Object.values(expenses).reduce((a, b) => a + b, 0);
  const paymentsSum = Object.values(payments).reduce((a, b) => a + b, 0);

  return paymentsSum - expensesSum;
}
