import styled from 'styled-components';
import size from '@/assets/styles/mediaQueries.style';

const UserPanelContainer = styled.div`
  border: ${({ theme }) => `1px solid  ${theme.colors.neonColor}`};
  text-align: center;
  max-width: 300px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 40px;
  margin: 40px 20px;
  h2 {
    padding-bottom: 25px;
  }

  label {
    * {
      margin: 10px;
    }
  }

  form {
    padding: 10px;
    width: 100%;
  }

  input {
    padding: 20px 0px;
    width: 100%;
    background: rgba(13, 10, 10, 0.55);
    border: none;
    text-align: center;
    color: white;
  }

  button {
    background: none;
    color: white;
    padding: 10px 15px;
    width: min-content;
    cursor: pointer;
    border: ${({ theme }) => `1px solid  ${theme.colors.neonColor}`};
    transition: 1s all;
  }

  label button:hover {
    background: ${({ theme }) => `${theme.colors.neonColor} !important`};
  }

  @media (max-width: ${size.mobileM}) {
    padding: 10px;
    margin: 30px 30px;
    h2 {
      font-size: 18px;
    }
    label {
      font-size: 14px;
    }
    input {
      width: 80%;
    }
  }
`;


export default UserPanelContainer;
