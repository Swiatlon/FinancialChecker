import styled from 'styled-components';

export const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-items: center;
  gap: 10px;
  padding: 10px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    margin: 20px;
  }
`;

export const DayBox = styled.div`
  width: 85px;
  height: 85px;
  border: 1px solid black;
  box-shadow: ${({ theme }) => `${theme.colors.neonColor} 0px 0px 6px 0px`};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }

  @media (max-width: 600px) {
    width: 60vw;
    height: 100px;
  }
`;

export const DayNumer = styled.span`
  position: absolute;
  left: 0;
  bottom: 0;
  margin-left: 2px;
  font-size: 14px;
  color: white;
`;

export const DaySumarryExpense = styled.p`
  color: red;
`;
