import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { useTheme } from 'styled-components';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line } from 'react-chartjs-2';
import { SideDiv, ChartBox } from '../Styles/OverviewElements.style';

function ThisMonthExpenses({ expenses }) {
  // React
  const theme = useTheme();

  // Get Monthly Expenses
  function getMonthlyTransactions() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const dailyTransaction = {};

    expenses
      .filter(
        (transaction) =>
          new Date(transaction.createdAt) >= startOfMonth && new Date(transaction.createdAt) <= endOfMonth,
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

  // Charts
  const monthlyExpenses = getMonthlyTransactions();
  ChartJS.register(ChartDataLabels);

  const monthlyChart = {
    labels: [...Object.keys(monthlyExpenses)],
    datasets: [
      {
        data: [...Object.values(monthlyExpenses)],
        borderColor: theme.colors.neonColor,
        backgroundColor: 'white',
        pointBackgroundColor: 'white',
        pointBorderColor: 'black',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    // indexAxis: 'y',
    aspectRadio: 10,
    layout: {
      padding: 25,
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        color: 'silver',
        anchor: 'end',
        offset: 0, // Add margin between label and data point
        align: 'top', // Align label text to the top
        textShadowColor: 'black',
        textShadowBlur: 4,
        textShadowOffsetX: 2,
        textShadowOffsetY: 2,
        z: 1,
      },
    },
  };

  return (
    <SideDiv>
      <h3>This Motnh:</h3>
      <ChartBox height="250px">
        <Line data={monthlyChart} options={chartOptions} />
      </ChartBox>
    </SideDiv>
  );
}

export default ThisMonthExpenses;
