import React, { useState } from 'react';
import { NavBar, Menu, MenuItem } from './Navigation.style';
import LogoImage from '@/assets/images/logo.svg';
import Logo from '@/components/atoms/Logo.style';
import Hamburger from '@/components/atoms/Hamburger.style';
import HamburgerSrc from '@/assets/images/icons/hamburger.svg';
import cardIcon from '@/assets/images/icons/credit-card.svg';
import homeIcon from '@/assets/images/icons/home.svg';
import expensesIcon from '@/assets/images/icons/trending-down.svg';

function Navigation() {
  const [navHidden, setNavHidden] = useState(false);
  const navigationItems = ['Overview', 'My wallet', 'Add new expenses'];
  const itemsIcons = [homeIcon, cardIcon, expensesIcon];
  return (
    <NavBar navHidden={navHidden}>
      <Menu>
        <Hamburger
          src={HamburgerSrc}
          alt="menu-logo"
          onClick={() => {
            setNavHidden(!navHidden);
          }}
        />
        <Logo src={LogoImage} alt="logo" className="logo" />
        {navigationItems.map((item, index) => (
          <MenuItem key={`${item + index}`}>
            <img src={itemsIcons[index]} alt="menu-icon" />
            {item}
          </MenuItem>
        ))}
      </Menu>
    </NavBar>
  );
}

export default Navigation;
