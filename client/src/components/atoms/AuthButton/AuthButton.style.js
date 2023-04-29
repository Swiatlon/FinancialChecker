import styled from 'styled-components';

const AuthSubmitButton = styled.input`
  border: ${({ theme }) => `1px solid  ${theme.colors.neonColor}`};
  padding: 12px 20px;
  font-size: 14px;
  background: none;
  cursor: pointer;
  transition: 0.5s all;
  color: white;
  &&:hover {
    transform: scale(1.1);
  }
`;

export default AuthSubmitButton;
