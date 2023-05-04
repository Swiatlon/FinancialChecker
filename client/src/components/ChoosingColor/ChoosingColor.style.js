import styled from 'styled-components';

const ChoosingColorBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  overflow: hidden;
  button {
    transition: 1s all;
    height: 100px;
    width: 33.3%;
    border: none;
    cursor: pointer;
  }
  button:hover {
    transform: scale(1.2);
    z-index: 99;
  }
  h3 {
    width: 100%;
  }
  input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: transparent;
    width: 100px;
    height: 100px;
    display: block;
    border: none;
    cursor: pointer;
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
