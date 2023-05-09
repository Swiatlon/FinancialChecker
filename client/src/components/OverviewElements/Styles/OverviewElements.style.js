import styled from 'styled-components';
import size from '@/assets/styles/mediaQueries.style';

export const SideDiv = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    height: 50px;
  }
`;

export const BoxesContainer = styled.div`
  display: grid;
  grid-template-columns: ${({ amountOfBoxes }) => `repeat(${amountOfBoxes}, 1fr)`};
  text-align: center;
  div {
    background: #282525;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.neonColor};
    border-width: 0px 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: ${size.mobileL}) {
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
  }
`;

export const ExpensesBox = styled.div`
  max-width: 150px;
  height: 120px;
  margin: 20px 0px;
  color: red;
  @media (max-width: ${size.laptopL}) {
    height: 100px;
    width: 120px;
  }
  @media (max-width: ${size.laptop}) {
    width: 100px;
    height: 100px;
    margin: 10px 20px;
  }
  @media (max-width: ${size.tablet}) {
    width: 60px;
    height: 60px;
    padding: 15px;
  }
`;

export const RectangleBox = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  max-width: 230px;
  width: 80%;
  height: 100px;
  padding: 10px;
  span {
    color: ${({ moneyBalance }) => (moneyBalance < 0 ? 'red' : ' green')};
  }
  @media (max-width: ${size.laptopL}) {
    width: 140px;
    height: 100px;
  }
  @media (max-width: ${size.laptop}) {
    margin: 10px 20px;
  }
  @media (max-width: ${size.mobileL}) {
    width: 150px;
    height: 60px;
    font-size: 14px;
  }
`;

export const WeeklyChartBox = styled.div`
  width: 70%;
  height: 85%;
  @media (min-width: 1025px) and (max-width: 1600px) {
    width: 80%;
  }
  @media (max-width: 1024px) {
    width: 50vw;
    height: 85%;
  }
  @media (max-width: 900px) {
    width: 60vw;
    height: 85%;
  }
`;

export const MonthlyChartBox = styled.div`
  width: 70%;
  height: 85%;
  @media (min-width: 1025px) and (max-width: 1600px) {
    width: 80% !important;
  }
  @media (max-width: 1024px) {
    width: 50vw;
  }
  @media (max-width: 900px) {
    width: 60vw;
  }
  @media (max-width: ${size.tablet}) {
    height: ${({ mobileHeight }) => `${mobileHeight}px`};
  }
`;
