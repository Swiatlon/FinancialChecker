import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { useTheme } from 'styled-components';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line, Bar } from 'react-chartjs-2';
import { SideDiv, MonthlyChartBox } from '../Styles/OverviewElements.style';
import useGetWidth from '@/hooks/useGetWidth';
import { formatNumber } from '@/helpers/helpers';
import { SmallTitle } from '@/components/Reusable/Style/ReusableElements.style';
import { getMonthlyTransactionsValues } from '@/helpers/Transactions/TransactionsHelper';

function ThisMonthExpenses({ expenses }) {
  // React
  const monthlyExpenses = getMonthlyTransactionsValues(expenses);
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
        textStrokeWidth: 1.5,
        textStrokeColor: '#272222',
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
      <SmallTitle>This Month:</SmallTitle>
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
