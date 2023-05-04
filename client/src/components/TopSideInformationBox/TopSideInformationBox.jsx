import React, { useContext } from 'react';
import { ThemeUpdateContext } from '@/App';
import useAuth from '@/hooks/useAuth';
import { useGetUserQuery } from '@/features/user/userApiSlice';
import Loader from '@/helpers/Loader/Loader';
import alertForChoosingAppColor from '@/helpers/Alerts/Swal';
import { TopInformationBox, UserInformationBox, ConfigImg } from './TopSideInformationBox.style';
import AvatarSVG from '@/assets/images/icons/user.svg';
import ConfigSVG from '@/assets/images/icons/settings.svg';

function TopSideInformationBox({ updateAppColor }) {
  const { id: userID } = useAuth();
  const { data, isLoading, isSuccess, isError, error } = useGetUserQuery(userID);

  if (isLoading) return <Loader color="#36d7b7" />;

  const user = data;

  return (
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
  );
}

export default TopSideInformationBox;
