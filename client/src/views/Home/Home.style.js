import styled from 'styled-components';

const HomeBox = styled.div`
  border-style: solid;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.neonColor};
  box-shadow: ${({ theme }) => `8px 1px 30px -20px ${theme.colors.neonColor}`};
  display: grid;
  text-align: center;
  margin: 25px;
  padding: 40px 25px;
  gap: 25px;
  background: rgba(0, 0, 0, 0.9);
  h2 {
    font-size: 22px;
  }
  p {
    font-size: 14px;
  }
`;

export const ThreeButtonsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
  a {
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
  a:hover {
    transform: scale(1.2);
  }
`;

export const PostAuthContainer = styled.div`
  max-width: max-content;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 15vh;
  align-content: center;
  margin-left: auto;
  margin-right: auto;
`;

export default HomeBox;
