import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { useTheme } from 'styled-components';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line } from 'react-chartjs-2';
import { SideDiv, ChartBox } from '../Styles/OverviewElements.style';

function ThisWeekExpenses({ expenses }) {
  // React
  const theme = useTheme();

  // EXPENSES PREPARE
  function getWeeklyExpenses() {
    const now = new Date();

    const currentDay = now.getDay();
    const daysSinceMonday = currentDay === 0 ? 6 : currentDay - 1;

    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - daysSinceMonday); // Monday
    const endOfWeek = new Date(now.getFullYear(), now.getMonth(), startOfWeek.getDate() + 6); // Sunday

    const days = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

    const dailyExpenses = {};

    expenses
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

  // CHARTS
  ChartJS.register(ChartDataLabels);
  const weeklyExpenses = getWeeklyExpenses();
  
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
      <h3>This Week:</h3>
      <ChartBox height="250px">
        <Line data={weeklyChart} options={chartOptions} />
      </ChartBox>
    </SideDiv>
  );
}

export default ThisWeekExpenses;
