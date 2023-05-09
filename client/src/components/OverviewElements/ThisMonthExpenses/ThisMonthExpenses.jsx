import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { useTheme } from 'styled-components';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line, Bar } from 'react-chartjs-2';
import { SideDiv, MonthlyChartBox } from '../Styles/OverviewElements.style';
import useGetWidth from '@/hooks/useGetWidth';
import { formatNumber } from '@/helpers/helpers';

function ThisMonthExpenses({ expenses }) {
  // Set Data Before Everything
  function getMonthlyTransactions() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    endOfMonth.setHours(23, 59, 59);

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

  // React
  const monthlyExpenses = getMonthlyTransactions();
  const theme = useTheme();
  const width = useGetWidth();
  const isPhoneSize = width < 768; // 768 => tablet size
  const amountOfItems = Object.keys(monthlyExpenses).length;
  const elementHeight = amountOfItems < 15 ? 25 : 16;

  // Charts Initialize
  ChartJS.register(ChartDataLabels);

  const monthlyChart = {
    labels: [...Object.keys(monthlyExpenses)],
    datasets: [
      {
        data: [...Object.values(monthlyExpenses)],
        borderColor: theme.colors.neonColor,
        backgroundColor: theme.colors.neonColor,
        pointBackgroundColor: 'white',
        pointBorderColor: 'black',
        fill: false, // Ensure that the area under the line is not filled
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    indexAxis: isPhoneSize ? 'y' : 'x',
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true, // Start the y-axis at zero
      },
    },
    layout: {
      padding: {
        top: 25,
        bottom: 25,
        right: 30,
        left: 25,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: 'auto',
        formatter: (value) => formatNumber(value),
        textStrokeWidth: 3,
        textStrokeColor: 'black',
        color: 'silver',
        anchor: 'end',
        offset: 0, // Add margin between label and data point
        align: 'end', // Align label text to the top
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
      <h3>This Month:</h3>
      {/* 20 is item space */}
      <MonthlyChartBox mobileHeight={amountOfItems * elementHeight}>
        {isPhoneSize ? (
          <Bar data={monthlyChart} options={chartOptions} />
        ) : (
          <Line data={monthlyChart} options={chartOptions} />
        )}
      </MonthlyChartBox>
    </SideDiv>
  );
}

export default ThisMonthExpenses;
