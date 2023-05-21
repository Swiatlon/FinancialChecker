import React, { useContext } from 'react';
import useAuth from '@/hooks/useAuth';
import { useGetUserQuery } from '@/features/user/userApiSlice';
import Loader from '@/helpers/Loader/Loader';
import TopInformationBox from './TopSideInformationBox.style';
import { ReactComponent as AvatarSVG } from '@/assets/icons/user.svg';
import { Text } from '../Reusable/Style/ReusableElements';

function TopSideInformationBox() {
  const { id: userID } = useAuth();
  const { data, isLoading, isSuccess, isError, error } = useGetUserQuery(userID);

  if (isLoading) return <Loader color="#36d7b7" />;

  if (isSuccess) {
    const user = data;
    return (
      <TopInformationBox>
        <AvatarSVG alt="user avatar" />
        <Text>{user?.name ?? 'username'}</Text>
      </TopInformationBox>
    );
  }
}

export default TopSideInformationBox;
