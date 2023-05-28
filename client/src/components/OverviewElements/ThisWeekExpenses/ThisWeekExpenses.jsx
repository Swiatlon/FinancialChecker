import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { useTheme } from 'styled-components';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line } from 'react-chartjs-2';
import { SideDiv, WeeklyChartBox } from '../Styles/OverviewElements.style';
import { formatNumber } from '@/helpers/helpers';
import { SmallTitle } from '@/components/Reusable/Style/ReusableElements.style';
import { getWeeklyTransactionsValues } from '@/helpers/Transactions/TransactionsHelper';

function ThisWeekExpenses({ expenses }) {
  // React
  const theme = useTheme();

  // CHARTS
  ChartJS.register(ChartDataLabels);
  const weeklyExpenses = getWeeklyTransactionsValues(expenses);

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
