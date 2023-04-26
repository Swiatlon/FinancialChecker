import React, { useEffect, useRef, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { alertForSessionExpired } from '@/helpers/Alerts/Swal';
import { useRefreshMutation } from '@/features/auth/authApiSlice';
import usePersist from '@/hooks/usePersist';
import { selectCurrentToken } from '@/features/auth/authSlice';

const PersistLogin = () => {
  // React DOM
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };

  // React
  const [persist] = usePersist();
  const [trueSuccess, setTrueSuccess] = useState(false);
  const effectRan = useRef(false); // React 18 Strict Mode trick to avoid double rendering

  // Redux
  const token = useSelector(selectCurrentToken);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] = useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      // React 18 Strict Mode trick to avoid double rendering

      const verifyRefreshToken = async () => {
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    return () => (effectRan.current = true);
  }, []);

  // Content

  let content;

  if (!persist) {
    // persist: no
    content = <Outlet />;
  } else if (isLoading) {
    // persist: yes, token: no
    content = <p>Loading</p>;
  } else if (isError) {
    // persist: yes, token: no
    alertForSessionExpired();
    content = <div />;
    setTimeout(() => {
      navigateToLogin();
    }, 100);
  } else if ((isSuccess && trueSuccess) || (token && isUninitialized)) {
    // persist: yes, token: yes
    content = <Outlet />;
  }

  return content;
};
export default PersistLogin;
