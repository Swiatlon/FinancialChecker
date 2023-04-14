import styled from 'styled-components';
import size from '@/assets/styles/mediaQueries.style';

export const OverviewContainer = styled.div`
  width: 90%;
  min-height: 70%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px 40px;
  color: white;
  margin-left: 8%;
  .expenses-red-color {
    color: red;
  }
  :nth-child(1),
  :nth-child(2) {
    padding-top: 100px;
  }
  @media (max-width: ${size.laptop}) {
    gap: 40px;
    margin-left: 0%;
    width: 100%;
    grid-template-columns: repeat(1, 1fr);
    justify-content: center;
    justify-items: center;
    text-align: center;
  }
`;

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
  @media (max-width: ${size.tablet}) {
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
  }
`;

export const SquareBox = styled.div`
  max-width: 160px;
  width: 80%;
  height: 140px;
  margin: 20px 0px;
  color: red;
  @media (max-width: ${size.laptopL}) {
    height: 120px;
  }
  @media (max-width: ${size.laptop}) {
    width: 100px;
    height: 100px;
    margin: 10px 20px;
  }
  @media (max-width: ${size.tablet}) {
    width: 80px;
    height: 80px;
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

export const ChartBox = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin-top: auto;
  margin-bottom: auto;
  @media (max-width: ${size.tablet}) {
    width: 450px;
  }
  @media (max-width: ${size.mobileL}) {
    width: 300px;
    height: 150px;
  }
  @media (max-width: ${size.mobileM}) {
    width: 230px;
    height: 140px;
  }
`;
