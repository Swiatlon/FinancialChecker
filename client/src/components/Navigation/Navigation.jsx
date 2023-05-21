import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSendLogoutMutation } from '@/features/auth/authApiSlice';
import { selectCurrentToken } from '@/features/auth/authSlice';
import {
  NavBar,
  Menu,
  MenuItem,
  LogoHamburgerContainer,
  LogoContentBox,
  LogoutButton,
  Hamburger,
  Logo,
} from './Navigation.style';
import { SmallTitle } from '../Reusable/Style/ReusableElements';
import LogoImage from '@/assets/images/logo.jpg';
import HamburgerSrc from '@/assets/icons/hamburger.svg';
import cardIcon from '@/assets/icons/credit-card.svg';
import homeIcon from '@/assets/icons/home.svg';
import expensesIcon from '@/assets/icons/trending-down.svg';
import overviewIcon from '@/assets/icons/bar-chart-2.svg';
import logoutIcon from '@/assets/icons/log-out.svg';
import paymentIcon from '@/assets/icons/trending-up.svg';
import registerIcon from '@/assets/icons/user-plus.svg';
import configIcon from '@/assets/icons/settings.svg';

function Navigation() {
  // React Router
  const navigate = useNavigate();

  // Redux
  const currentToken = useSelector(selectCurrentToken);
  const [sendLogout] = useSendLogoutMutation();

  // React
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  const navigationItemsPreAuth = [
    { text: 'Home', icon: homeIcon },
    { text: 'Register', icon: registerIcon },
    { text: 'Login', icon: logoutIcon },
  ];

  const navigationItemsPostAuth = [
    { text: 'Home', icon: homeIcon },
    { text: 'Overview', icon: overviewIcon },
    { text: 'My Wallet', icon: cardIcon },
    { text: 'Add new expenses', icon: expensesIcon },
    { text: 'Add new payment', icon: paymentIcon },
    { text: 'User Panel', icon: configIcon },
  ];

  const isAuthorized = currentToken ? true : false;
  // Handlers

  const handleClick = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleLogout = () => {
    sendLogout();
    navigate('/home');
  };

  // Content

  const navigationContent = () => {
    // POST AUTH
    if (isAuthorized)
      return (
        <>
          {navigationItemsPostAuth.map((item, index) => (
            <MenuItem key={`${item + index}`} to={`postAuth/${item.text.replace(/\s/g, '')}`}>
              <img src={item.icon} alt="menu-icon" />
              {item.text}
            </MenuItem>
          ))}
          {isAuthorized && <LogoutButton src={logoutIcon} alt="logout-icon" onClick={handleLogout} />}
        </>
      );

    // PRE AUTH
    if (!isAuthorized) {
      return navigationItemsPreAuth.map((item, index) => (
        <MenuItem key={`${item + index}`} to={`${item.text.replace(/\s/g, '')}`}>
          <img src={item.icon} alt="menu-icon" />
          {item.text}
        </MenuItem>
      ));
    }
  };

  return (
    <NavBar navHidden={isMenuVisible}>
      <Menu>
        <LogoHamburgerContainer>
          <LogoContentBox className="logoContentBox">
            <Logo src={LogoImage} alt="logo" />
            <SmallTitle>Financial Checker</SmallTitle>
          </LogoContentBox>
          <Hamburger src={HamburgerSrc} alt="menu-logo" onClick={handleClick} />
        </LogoHamburgerContainer>
        {navigationContent()}
      </Menu>
    </NavBar>
  );
}

export default Navigation;
