import styled from 'styled-components';
import size from '@/assets/styles/mediaQueries.style';

const ChoosingColorBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  overflow: hidden;
  button {
    transition: 1s all;
    height: 80px;
    width: 33.3% !important;
    border: none !important;
    cursor: pointer;
  }
  button:hover {
    transform: scale(1.2);
    z-index: 99;
  }
  h3 {
    width: 100%;
    font-weight: normal;
  }
  input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: transparent !important;
    width: 100px !important;
    height: 100px;
    display: block;
    border: none;
    cursor: pointer;
    padding: 0px !important;
    margin: 0px 25%;
  }
  input::-webkit-color-swatch {
    border-radius: 50%;
    border: none;
  }
  input::-moz-color-swatch {
    border-radius: 50%;
    border: none;
  }
  @media (max-width: ${size.mobileM}) {
    button {
      width: 50% !important;
    }
  }
`;

export const PickedColorInformationBox = styled.div`
  span {
    width: 30px;
    display: inline-block;
    height: 30px;
    border-radius: 50%;
  }
  p {
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
`;

export default ChoosingColorBox;
