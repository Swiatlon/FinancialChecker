import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { useTheme } from 'styled-components';
import { Line } from 'react-chartjs-2';
import { OverviewContainer, BoxesContainer, SquareBox, RectangleBox, ChartBox, SideDiv } from './Overview.style';

function Overview() {
  const theme = useTheme();

  const firstChart = {
    labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [0, 4000, 200, 1000, 300, 200, 1500, 3000, 20, 10],
        borderColor: theme.colors.neonColor,
        backgroundColor: 'white',
        pointBackgroundColor: 'white',
        pointBorderColor: 'black',
      },
    ],
  };

  const secondChart = {
    labels: [
      ...Array(31)
        .fill()
        .map((_, i) => i + 1),
    ],
    datasets: [
      {
        data: [0, 4000, 200, 1000, 300, 200, 1500, 3000, 20, 10],
        borderColor: theme.colors.neonColor,
        pointBackgroundColor: 'white',
        pointBorderColor: 'black',
      },
    ],
  };

  const firstOptions = {
    responsive: true,
    aspectRadio: 10,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const secondOptions = {
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
          <Line data={firstChart} options={firstOptions} />
        </ChartBox>
      </SideDiv>
      <SideDiv>
        <h3>Last expeneses:</h3>
        <BoxesContainer amountOfBoxes="3">
          <SquareBox>A</SquareBox>
          <SquareBox>B</SquareBox>
          <SquareBox>C</SquareBox>
          <SquareBox>D</SquareBox>
          <SquareBox>E</SquareBox>
          <SquareBox>F</SquareBox>
        </BoxesContainer>
      </SideDiv>
      <SideDiv>
        <h3>This Month:</h3>
        <ChartBox height="250px">
          <Line data={secondChart} options={secondOptions} />
        </ChartBox>
      </SideDiv>
    </OverviewContainer>
  );
}

export default Overview;
