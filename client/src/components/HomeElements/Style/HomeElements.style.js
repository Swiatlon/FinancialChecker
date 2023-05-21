import styled from 'styled-components';

const ThreeButtonsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
  
  a,
  button {
    padding: 15px;
    font-size: 14px;
    background: rgb(0, 0, 0);
    color: white;
    border-style: solid;
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.neonColor};
    cursor: pointer;
    transition: 1s all;
  }

  a:hover,
  button:hover {
    transform: scale(1.2);
  }
`;

export default ThreeButtonsBox;
