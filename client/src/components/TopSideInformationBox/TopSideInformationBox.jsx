import React, { useContext } from 'react';
import useAuth from '@/hooks/useAuth';
import { useGetUserQuery } from '@/features/user/userApiSlice';
import Loader from '@/helpers/Loader/Loader';
import TopInformationBox from './TopSideInformationBox.style';
import AvatarSVG from '@/assets/images/icons/user.svg';

function TopSideInformationBox() {
  const { id: userID } = useAuth();
  const { data, isLoading, isSuccess, isError, error } = useGetUserQuery(userID);

  if (isLoading) return <Loader color="#36d7b7" />;

  const user = data;

  return (
    <TopInformationBox>
      <img src={AvatarSVG} alt="user avatar" />
      <p>{user?.name ?? 'username'}</p>
    </TopInformationBox>
  );
}

export default TopSideInformationBox;
