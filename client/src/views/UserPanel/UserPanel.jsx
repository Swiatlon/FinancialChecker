import React from 'react';
import UserPanelContainer from './UserPanel.style';
import { useGetUserQuery } from '@/features/user/userApiSlice';
import useAuth from '@/hooks/useAuth';
import Loader from '@/helpers/Loader/Loader';
import ChoosingColor from '@/components/UserPanelElements/ChoosingColor/ChoosingColor';
import ChangeUsername from '@/components/UserPanelElements/ChangeUsername/ChangeUsername';
import ChangePassword from '@/components/UserPanelElements/ChangePassword/ChangePassword';
import ChangeEmail from '@/components/UserPanelElements/ChangeEmail/ChangeEmail';
import DeleteAccount from '@/components/UserPanelElements/DeleteAccount/DeleteAccount';

function UserPanel() {
  // React
  const { id: userID } = useAuth();

  // Redux
  const { data, isLoading } = useGetUserQuery(userID);

  if (isLoading) return <Loader />;

  const { email, name } = data;
  // Functions

  return (
    <UserPanelContainer>
      <h2>User Panel</h2>
      {name === 'Guest' ? (
        <>
          <p>With your permission you can only change color of app</p>
          <br />
          <ChoosingColor />
        </>
      ) : (
        <>
          <ChangeUsername actualName={name} id={userID} />
          <ChangeEmail id={userID} actualEmail={email} />
          <ChangePassword id={userID} />
          <ChoosingColor />
          <DeleteAccount id={userID} />
        </>
      )}
    </UserPanelContainer>
  );
}

export default UserPanel;
