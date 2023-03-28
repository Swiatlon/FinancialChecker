import styled from 'styled-components';
import size from '@/assets/styles/mediaQueries.style';

export const NavBar = styled.nav`
  height: 100vh;
  width: ${({ navHidden }) => (navHidden ? '65px' : '330px')};
  padding-right: 10px;
  transition: 1s all;
  background: #0e0f11;
  font-family: 'Poppins', sans-serif;
  position: sticky;
  left: 0;
  top: 0;
  border-right: 1px solid rgba(4, 110, 232, 0.6);
  box-shadow: 8px 1px 30px -20px rgb(4 110 232 / 50%);
  .logoContentBox {
    // Animation of hiding
    opacity: ${({ navHidden }) => (navHidden ? '0' : '1')};
    width: ${({ navHidden }) => (navHidden ? '0px' : '280px')};
    height: ${({ navHidden }) => (navHidden ? '0px' : '100vh')};
  }
  @media (max-width: ${size.tablet}) {
    width: ${({ navHidden }) => (navHidden ? '60px' : '65vw')};
  }
  @media (max-width: ${size.mobileL}) {
    width: ${({ navHidden }) => (navHidden ? '60px' : '85vw')};
    padding-right: 10px;
    h3 {
      font-size: 16px;
    }
  }
`;

export const Menu = styled.ul`
  width: 100%;
  color: white;
  overflow: hidden;
  padding-top: 5vh;
  transition: 1s all;
  h3 {
    white-space: nowrap;
    font-size: 20px;
  }
  @media (max-width: ${size.mobileL}) {
    h3 {
      font-size: 16px;
    }
  }
`;

export const LogoHamburgerContainer = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  height: 60px;
`;

export const LogoContentBox = styled.div`
  transition: 1s all;
  display: flex;
  align-items: center;
  padding-left: 20px;
  gap: 20px;
`;

export const MenuItem = styled.li`
  width: min-content;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px 10px;
  margin: 10px 12px;
  padding-right: 15px;
  font-size: 14px;
  white-space: nowrap;
  border: 1px solid transparent;
  img {
    padding-right: 25px;
  }
  &&:hover {
    transition: 0.5s transform;
    transform: scale(1.06);
    border-right: 2px solid #024a9f;
    border-left: 2px solid #024a9f;
  }
`;

export const LogoutButton = styled.img`
  position: absolute;
  bottom: 0;
  margin-left: 20px;
  margin-bottom: 30px;
  width: 30px;
  cursor: pointer;
`;
