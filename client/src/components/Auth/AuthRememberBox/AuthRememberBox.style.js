import styled from 'styled-components';

const AuthRememberBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  input {
    -webkit-appearance: none;
    appearance: none;
    background-color: none;
    padding: 2px;
    border: 2px solid gray;
    border-radius: 2px;
    display: grid;
    place-content: center;
    cursor: pointer;
  }
  input[type='checkbox']::before {
    content: '';
    width: 0.65em;
    height: 0.65em;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    transform: scale(0);
    transform-origin: bottom left;
    transition: 120ms transform ease-in-out;
    box-shadow: ${({ theme }) => `inset 1em 1em ${theme.colors.neonColor}`};
    /* Windows High Contrast Mode */
    background-color: CanvasText;
  }
  input[type='checkbox']:checked::before {
    transform: scale(1);
  }
  label {
    color: gray;
    font-size: 12px;
  }
`;

export default AuthRememberBox;
