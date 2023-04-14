import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { useTheme } from 'styled-components';
import { Line } from 'react-chartjs-2';
import { OverviewContainer, BoxesContainer, SquareBox, RectangleBox, ChartBox, SideDiv } from './Overview.style';
import { useGetTransactionsQuery } from '@/features/transactions/transactionsApiSlice';
import { getMonthlyTransactions, getWeeklyExpenses } from '@/features/transactions/transactionsApiSlice';

function Overview() {
  const theme = useTheme();
  const userID = '642a8c586fbecebb90f43374';

  // Redux
  const { data, isLoading, isSuccess, isError, error } = useGetTransactionsQuery(userID);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { expenses, payments } = data;
  console.log(expenses);
  const lastSixExpenses = [...expenses, ...Array(Math.max(0, 6 - expenses.length)).fill(null)].splice(0, 6);
  const monthlyExpenses = getMonthlyTransactions(expenses);
  const weeklyExpenses = getWeeklyExpenses(expenses);

  // Charts
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

  const weeklyChartOptions = {
    responsive: true,
    aspectRadio: 10,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const monthlyChartOptions = {
    responsive: true,
    aspectRadio: 10,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <OverviewContainer>
      <SideDiv>
        <h3>My Wallet:</h3>
        <BoxesContainer amountOfBoxes="2">
          <RectangleBox>Amount:&nbsp;0</RectangleBox>
          <RectangleBox>
            Monthly Balance: <span className="expenses-red-color">&nbsp;-3423</span>
          </RectangleBox>
        </BoxesContainer>
      </SideDiv>
      <SideDiv>
        <h3>This Week:</h3>
        <ChartBox height="250px">
          <Line data={weeklyChart} options={weeklyChartOptions} />
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
          <Line data={monthlyChart} options={monthlyChartOptions} />
        </ChartBox>
      </SideDiv>
    </OverviewContainer>
  );
}

export default Overview;
