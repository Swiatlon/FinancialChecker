import React, { useState } from 'react';
import { NavBar, Menu, MenuItem, LogoHamburgerContainer, LogoContentBox, LogoutButton } from './Navigation.style';
import LogoImage from '@/assets/images/logo.jpg';
import Logo from '@/components/atoms/Logo.style';
import Hamburger from '@/components/atoms/Hamburger.style';
import HamburgerSrc from '@/assets/images/icons/hamburger.svg';
import cardIcon from '@/assets/images/icons/credit-card.svg';
import homeIcon from '@/assets/images/icons/home.svg';
import expensesIcon from '@/assets/images/icons/trending-down.svg';
import logoutIcon from '@/assets/images/icons/log-out.svg';

function Navigation() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const navigationItems = ['Overview', 'My wallet', 'Add new expenses'];
  const itemsIcons = [homeIcon, cardIcon, expensesIcon];

  const handleClick = () => {
    setIsMenuVisible(!isMenuVisible);
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
        {navigationItems.map((item, index) => (
          <MenuItem key={`${item + index}`} onClick={handleClick}>
            <img src={itemsIcons[index]} alt="menu-icon" />
            {item}
          </MenuItem>
        ))}
        <LogoutButton src={logoutIcon} alt="logout-icon" />
      </Menu>
    </NavBar>
  );
}

export default Navigation;
