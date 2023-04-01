import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import {
  PostAuthContainer,
  ContentContainer,
  TopInformationBox,
  UserInformationBox,
  ConfigImg,
} from './PostAuthLayout.style';
import AvatarSVG from '@/assets/images/icons/user.svg';
import ConfigSVG from '@/assets/images/icons/settings.svg';
import { ThemeUpdateContext } from '@/App';
import alertForChoosingAppColor from '@/helpers/Alerts/Swal';

function PostAuthLayout() {
  const nickname = 'Wiercik';
  const updateAppColor = useContext(ThemeUpdateContext);

  return (
    <PostAuthContainer>
      <TopInformationBox>
        <UserInformationBox>
          <img src={AvatarSVG} alt="user avatar" />
          <p>{nickname}</p>
        </UserInformationBox>

        <ConfigImg
          src={ConfigSVG}
          alt="user avatar"
          onClick={() => {
            alertForChoosingAppColor(updateAppColor);
          }}
        />
      </TopInformationBox>
      <ContentContainer>
        <Outlet key={uuidV4()} />
      </ContentContainer>
    </PostAuthContainer>
  );
}

export default PostAuthLayout;
