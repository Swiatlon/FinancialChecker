import React from 'react';
import { useGetTransactionsQuery } from '@/features/transactions/transactionsApiSlice';
import Loader from '@/helpers/Loader/Loader';
import useAuth from '@/hooks/useAuth';
import MyWalletOverview from '@/components/OverviewElements/MyWallet/MyWalletOverview';
import LastExpenses from '@/components/OverviewElements/LastExpenses/LastExpenses';
import ThisMonthExpenses from '@/components/OverviewElements/ThisMonthExpenses/ThisMonthExpenses';
import ThisWeekExpenses from '@/components/OverviewElements/ThisWeekExpenses/ThisWeekExpenses';
import OverviewContainer from './Overview.style';

function Overview() {
  const { id: userID } = useAuth();

  // Redux
  const { data, isLoading, isSuccess, isError, error } = useGetTransactionsQuery(userID);

  if (isLoading) return <Loader />;

  if (isSuccess) {
    const { expenses = [], payments = [] } = data ?? {};
    return (
      <OverviewContainer>
        <MyWalletOverview expenses={expenses} payments={payments} />
        <ThisWeekExpenses expenses={expenses} />
        <LastExpenses expenses={expenses} payments={payments} />
        <ThisMonthExpenses expenses={expenses} />
      </OverviewContainer>
    );
  }
}

export default Overview;
