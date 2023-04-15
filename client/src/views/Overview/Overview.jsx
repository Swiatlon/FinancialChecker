import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useTheme } from 'styled-components';
import { Line } from 'react-chartjs-2';
import { OverviewContainer, BoxesContainer, SquareBox, RectangleBox, ChartBox, SideDiv } from './Overview.style';
import {
  useGetTransactionsQuery,
  getMonthlyTransactions,
  getWeeklyExpenses,
  getLastSixExpenses,
  getMonthlyBalance,
  getMoneyBalance,
} from '@/features/transactions/transactionsApiSlice';

function Overview() {
  const theme = useTheme();
  const userID = '642a8c586fbecebb90f43374';

  // Redux
  const { data, isLoading, isSuccess, isError, error } = useGetTransactionsQuery(userID);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { expenses, payments } = data;
  
  const monthlyExpenses = getMonthlyTransactions(expenses);
  const lastSixExpenses = getLastSixExpenses(expenses);
  const weeklyExpenses = getWeeklyExpenses(expenses);

  const monthlyBalance = getMonthlyBalance(monthlyExpenses, getMonthlyTransactions(payments));
  const overallBalance = getMoneyBalance(expenses, payments);
  // Charts
  ChartJS.register(ChartDataLabels);

  const weeklyChart = {
    labels: [...Object.keys(weeklyExpenses)],
    datasets: [
      {
        data: [...Object.values(weeklyExpenses)],
        borderColor: theme.colors.neonColor,
        backgroundColor: 'white',
        pointBackgroundColor: 'white',
        pointBorderColor: 'black',
      },
    ],
  };

  const monthlyChart = {
    labels: [...Object.keys(monthlyExpenses)],
    datasets: [
      {
        data: [...Object.values(monthlyExpenses)],
        borderColor: theme.colors.neonColor,
        pointBackgroundColor: 'white',
        pointBorderColor: 'black',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    aspectRadio: 10,
    layout: {
      padding: 20,
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        color: 'gray',
        anchor: 'end',
        offset: 0, // Add margin between label and data point
        align: 'top', // Align label text to the top
      },
    },
  };

  return (
    <OverviewContainer>
      <SideDiv>
        <h3>My Wallet:</h3>
        <BoxesContainer amountOfBoxes="2">
          <RectangleBox moneyBalance={overallBalance}>
            Amount:<span>&nbsp;{overallBalance}</span>
          </RectangleBox>
          <RectangleBox moneyBalance={monthlyBalance}>
            Monthly Balance: <span>&nbsp;{monthlyBalance}</span>
          </RectangleBox>
        </BoxesContainer>
      </SideDiv>
      <SideDiv>
        <h3>This Week:</h3>
        <ChartBox height="250px">
          <Line data={weeklyChart} options={chartOptions} />
        </ChartBox>
      </SideDiv>
      <SideDiv>
        <h3>Last expeneses:</h3>
        <BoxesContainer amountOfBoxes="3">
          {lastSixExpenses.map((expense, index) => (
            <SquareBox key={index}>- {expense?.amount ?? 'Add data'}</SquareBox>
          ))}
        </BoxesContainer>
      </SideDiv>
      <SideDiv>
        <h3>This Month:</h3>
        <ChartBox height="250px">
          <Line data={monthlyChart} options={chartOptions} />
        </ChartBox>
      </SideDiv>
    </OverviewContainer>
  );
}

export default Overview;
