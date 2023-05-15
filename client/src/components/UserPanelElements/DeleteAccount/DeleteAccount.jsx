import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteAccountBox } from '../Style/UserPanelElements.style';
import { useDeleteUserMutation } from '@/features/user/userApiSlice';
import { useSendLogoutMutation } from '@/features/auth/authApiSlice';
import {
  alertForPasswordRequirement,
  alertForConfirmation,
  alertForSuccessfulAction,
  alertForErrors,
} from '@/helpers/Alerts/Swal';

function DeleteAccount({ id }) {
  const navigate = useNavigate();
  const [sendLogout] = useSendLogoutMutation();
  const [deleteUserMutation] = useDeleteUserMutation();

  const buttonHandler = async () => {
    const { value: password } = await alertForPasswordRequirement();

    if (!password) return false;

    const { value: confirmation } = await alertForConfirmation('Are you sure you want to delete account!');

    if (confirmation) {
      await deleteUserMutation({ id, password })
        .unwrap()
        .then((result) => {
          alertForSuccessfulAction(result);
          navigate('/home');
          sendLogout();
        })
        .catch((err) => {
          return alertForErrors(err?.data?.message);
        });
    }
  };

  return (
    <DeleteAccountBox type="button" aria-label="Delete account" onClick={buttonHandler}>
      Delete Account
    </DeleteAccountBox>
  );
}

export default DeleteAccount;
