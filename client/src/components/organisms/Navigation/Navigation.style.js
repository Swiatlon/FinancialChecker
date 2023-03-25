import styled from 'styled-components';

export const NavBar = styled.nav`
  height: 100%;
  width: ${({ navHidden }) => (navHidden ? '50px' : '300px')};
  top: 0;
  display: grid;
  justify-items: center;
  text-align: center;
  position: sticky;
  transition: 1s all;
  background: #0e0f11;
  .logo {
    opacity: ${({ navHidden }) => (navHidden ? '0' : '1')};
    width: ${({ navHidden }) => (navHidden ? '0px' : '200px')};
    height: ${({ navHidden }) => (navHidden ? '0px' : '100%')};
  }
`;

export const Menu = styled.ul`
  padding-top: 5vh;
  width: 100%;
  align-items: center;
  color: white;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-content: center;
`;

export const MenuItem = styled.li`
  width: 80%;
  cursor: pointer;
  padding: 30px;
  display: flex;
  align-items: center;
  img {
    padding-right: 20px;
    padding-left: 10px;
  }
`;
