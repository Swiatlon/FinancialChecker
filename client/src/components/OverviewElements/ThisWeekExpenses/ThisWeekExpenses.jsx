import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { useTheme } from 'styled-components';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line } from 'react-chartjs-2';
import { SideDiv, WeeklyChartBox } from '../Styles/OverviewElements.style';
import { formatNumber } from '@/helpers/helpers';
import { SmallTitle } from '@/components/Reusable/Style/ReusableElements.style';

function ThisWeekExpenses({ expenses }) {
  // React
  const theme = useTheme();

  // EXPENSES PREPARE
  function getWeeklyExpenses() {
    // Get Curent Date
    const now = new Date();

    // Parameters for calculations
    const currentDay = now.getDay();
    const days = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
    const daysSinceMonday = currentDay === 0 ? 6 : currentDay - 1;

    // Week start/end
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - daysSinceMonday); // Monday
    const endOfWeek = new Date(now.getFullYear(), now.getMonth(), startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59); // Sunday 23:59:59

    // Container for day:value data
    const dailyExpenses = {};

    expenses
      .filter(
        (transaction) =>
          new Date(transaction.createdAt).getTime() >= startOfWeek.getTime() &&
          new Date(transaction.createdAt).getTime() <= endOfWeek.getTime(),
      )
      .forEach((transaction) => {
        const date = new Date(transaction.createdAt);
        const dayOfWeek = date.getDay() === 0 ? days.length - 1 : date.getDay() - 1; // 0 is sunday so we need change it into 6
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
    maintainAspectRatio: false,
    layout: {
      padding: 25,
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        formatter: (value) => formatNumber(value),
        textStrokeWidth: 2,
        textStrokeColor: 'black',
        display: 'auto',
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
      <SmallTitle>This Week:</SmallTitle>
      <WeeklyChartBox>
        <Line data={weeklyChart} options={chartOptions} />
      </WeeklyChartBox>
    </SideDiv>
  );
}

export default ThisWeekExpenses;
