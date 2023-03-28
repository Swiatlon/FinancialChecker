import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopInformationBox, UserInformationBox, ConfigImg } from './PostAuthLayout.style';
import AvatarSVG from '@/assets/images/icons/user.svg';
import ConfigSVG from '@/assets/images/icons/settings.svg';

function PostAuthLayout() {
  const nickname = 'Wiercik';
  return (
    <>
      <TopInformationBox>
        <UserInformationBox>
          <img src={AvatarSVG} alt="user avatar" />
          <p>{nickname}</p>
        </UserInformationBox>

        <ConfigImg src={ConfigSVG} alt="user avatar" />
      </TopInformationBox>
      <Outlet />
    </>
  );
}

export default PostAuthLayout;
