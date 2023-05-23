import styled from 'styled-components';
import size from '@/assets/styles/mediaQueries.style';

export const ImgBox = styled.div`
  max-width: 400px;
  max-height: 400px;
  svg {
    width: 100%;
    height: 100%;
  }

  @media (max-width: ${size.mobileS}) {
    svg {
      height: auto;
      width: 150px;
    }
  }
`;

export const ThreeItemsPerRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;

  button {
    width: fit-content;
    background: none;
    border: none;
    cursor: pointer;
  }

  p {
    font-size: 15px;
    font-weight: bold;
    width: 14px;
    height: 14px;
    padding: 10px;
    border: 3px solid white;
    border-radius: 100%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: ${size.mobileL}) {
    p {
      width: 10px;
      height: 10px;
      padding: 10px;
      font-size: 14px;
    }
    svg {
      height: auto;
      width: 25px;
    }
  }
`;
