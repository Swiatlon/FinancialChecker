import React from 'react';
import Loader from '@/helpers/Loader/Loader';
import Scheduler from '@/components/Scheduler/Scheduler';
import useAuth from '@/hooks/useAuth';
import { useGetTransactionsQuery } from '@/features/transactions/transactionsApiSlice';

function MyWallet() {
  const { id: userID } = useAuth();

  // Redux
  const { data, isLoading, isSuccess, isError, error } = useGetTransactionsQuery(userID);

  if (isLoading) return <Loader />;

  if (isSuccess) {
    const { expenses = [], payments = [] } = data ?? {};
    return <Scheduler expenses={expenses} payments={payments} />;
  }
}

export default MyWallet;
