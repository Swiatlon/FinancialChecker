import styled from 'styled-components';
import size from '@/assets/styles/mediaQueries.style';

const AuthForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background: black;
  padding: 50px 60px;
  margin: 25px;
  gap: ${({ hasErrors }) => {
    return Object.keys(hasErrors ?? 0).length > 0 ? '40px' : '50px';
  }};
  border: ${({ theme }) => `1px solid  ${theme.colors.neonColor}`};
  box-shadow: ${({ theme }) => `8px 1px 30px -5px ${theme.colors.neonColor}`};
  @media (max-width: ${size.mobileL}) {
    padding: 50px 30px;
  }
  span {
    max-width: 200px;
    white-space: pre-line;
    line-height: 15px;
    font-size: 12px;
    display: block;
    color: red;
    text-align: center;
  }
`;
export default AuthForm;
