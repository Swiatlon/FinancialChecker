import styled from 'styled-components';
import size from '@/assets/styles/mediaQueries.style';

export const NewExpensesContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .error-color {
    text-align: center;
  }
`;

export const ExpensesForm = styled.form`
  text-align: center;
  background: #161414;
  margin-top: 10vh;
  width: 300px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  padding: 40px;
  margin-bottom: 50px;
  gap: 25px;
  border: ${({ theme }) => `1px solid  ${theme.colors.neonColor}`};
  input {
    padding: 20px 0px;
    margin-top: 20px;
    width: 100%;
    background: rgba(13, 10, 10, 0.55);
    border: none;
    text-align: center;
    color: white;
  }
  p {
    text-align: right;
  }
  input[type='button'] {
    cursor: pointer;
    background: none;
    font-size: 16px;
    font-weight: bold;
    text-align: right;
    margin: 0px;
  }
  input[type='submit'] {
    background: ${({ theme }) => theme.colors.neonColor};
    cursor: pointer;
  }
  @media (max-width: ${size.tablet}) {
    padding: 20px;
    width: 250px;
  }
  @media (max-width: ${size.mobileL}) {
    padding: 20px;
    width: 180px;
    font-size: 14px;
    input {
      font-size: 12px;
    }
  }
`;

export const TwoItemsPerRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  text-align: center;
  align-items: center;
  gap: 25px;
`;

export const ExpensesItem = styled.div`
  display: grid;
  grid-template-columns: 45% 45% auto;
  text-align: center;
  align-items: center;
  gap: 10px;
  input {
    text-align: center !important;
    margin: 0px;
  }
  input[type='button'] {
    color: red;
  }
`;
