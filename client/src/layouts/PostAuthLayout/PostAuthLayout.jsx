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
import { useGetUserQuery } from '@/features/user/userApiSlice';

function PostAuthLayout() {
  const userID = '643b01db84f83eafe6445864';
  const { data, isLoading, isSuccess, isError, error } = useGetUserQuery(userID);
  const user = data?.entities[userID];

  const updateAppColor = useContext(ThemeUpdateContext);

  return (
    <PostAuthContainer>
      <TopInformationBox>
        <UserInformationBox>
          <img src={AvatarSVG} alt="user avatar" />
          <p>{user?.name ?? 'username'}</p>
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
