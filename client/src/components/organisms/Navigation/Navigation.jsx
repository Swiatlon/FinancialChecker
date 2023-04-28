import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSendLogoutMutation } from '@/features/auth/authApiSlice';
import { selectCurrentToken } from '@/features/auth/authSlice';
import { NavBar, Menu, MenuItem, LogoHamburgerContainer, LogoContentBox, LogoutButton } from './Navigation.style';
import LogoImage from '@/assets/images/logo.jpg';
import Logo from '@/components/atoms/Logo.style';
import Hamburger from '@/components/atoms/Hamburger.style';
import HamburgerSrc from '@/assets/images/icons/hamburger.svg';
import cardIcon from '@/assets/images/icons/credit-card.svg';
import homeIcon from '@/assets/images/icons/home.svg';
import expensesIcon from '@/assets/images/icons/trending-down.svg';
import overviewIcon from '@/assets/images/icons/bar-chart-2.svg';
import logoutIcon from '@/assets/images/icons/log-out.svg';
import registerIcon from '@/assets/images/icons/user-plus.svg';

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

  const navigationItemsAfterAuth = [
    { text: 'Home', icon: homeIcon },
    { text: 'Overview', icon: overviewIcon },
    { text: 'My Wallet', icon: cardIcon },
    { text: 'Add new expenses', icon: expensesIcon },
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
          {navigationItemsAfterAuth.map((item, index) => (
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
            <h3>Financial Checker</h3>
          </LogoContentBox>
          <Hamburger src={HamburgerSrc} alt="menu-logo" onClick={handleClick} />
        </LogoHamburgerContainer>
        {navigationContent()}
      </Menu>
    </NavBar>
  );
}

export default Navigation;
