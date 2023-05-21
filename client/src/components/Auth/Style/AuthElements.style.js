import styled from 'styled-components';
import size from '@/assets/styles/mediaQueries.style';

export const AuthTitle = styled.h2`
  font-size: 22px;
  padding-bottom: 20px;
  text-align: center;
`;

export const AuthTextField = styled.div`
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
    align-self: center;
    &&::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }
  }
`;

export const AuthRememberBox = styled.div`
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
    display: flex;
    gap: 5px;
    align-items: center;
  }
`;

export const AuthForm = styled.form`
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

  span {
    max-width: 200px;
    white-space: pre-line;
    line-height: 15px;
    font-size: 12px;
    display: block;
    color: red;
    text-align: center;
  }

  @media (max-width: ${size.mobileL}) {
    padding: 50px 30px;
  }
`;

export const AuthSubmitButton = styled.input`
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
