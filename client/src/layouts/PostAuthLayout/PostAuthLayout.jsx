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
import useAuth from '@/hooks/useAuth';
import Loader from '@/helpers/Loader/Loader';

function PostAuthLayout() {
  const updateAppColor = useContext(ThemeUpdateContext);
  const { id: userID } = useAuth();
  const { data, isLoading, isSuccess, isError, error } = useGetUserQuery(userID);

  if (isLoading) return <Loader color="#36d7b7" />;

  const user = data;
  // top component
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
            // alertForChoosingAppColor(updateAppColor);
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
