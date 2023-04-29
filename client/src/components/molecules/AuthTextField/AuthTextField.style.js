import styled from 'styled-components';

const AuthTextField = styled.div`
  display: flex;
  padding-bottom: 10px;
  max-width: 200px;
  position: relative;
  align-items: flex-end;
  align-content: end;
  border-bottom: ${({ theme }) => `1px solid  ${theme.colors.neonColor}`};
  img {
    width: 20px;
  }
  input {
    width: 100%;
    background: none;
    outline: none;
    border: none;
    color: white;
    font-size: 12px;
    padding-left: 10px;
    align-self:center;
    &&::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }
  }
`;

export default AuthTextField;
