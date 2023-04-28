import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import HomeBox, { ThreeButtonsBox } from './Home.style';
import { useLoginMutation } from '@/features/auth/authApiSlice';
import { setCredentials } from '@/features/auth/authSlice';
import { alertForSuccessfulAuth, alertForErrors } from '@/helpers/Alerts/Swal';

function Home() {
  // React Router
  const navigate = useNavigate();

  // Redux
  const dispatch = useDispatch();
  const [login, { isLoading, isError, error }] = useLoginMutation();

  async function logInGuest() {
    const guestEmail = import.meta.env.VITE_QUEST_EMAIL;
    const guestPassword = import.meta.env.VITE_QUEST_PASSWORD;
    try {
      const { accessToken } = await login({ email: guestEmail, password: guestPassword }).unwrap();
      dispatch(setCredentials({ accessToken }));
      alertForSuccessfulAuth('Logged in!', () => {
        navigate('/postAuth');
      });
    } catch (err) {
      alertForErrors(err.data.message);
    }
  }
  return (
    <HomeBox>
      <h2>Welcome</h2>
      <p>This website will help you track your expenses!</p>
      <ThreeButtonsBox>
        <Link to="/register">Get Started!</Link>
        <Link to="/tutorial">Tutorial</Link>
        <button type="button" onClick={logInGuest}>
          Quest Account
        </button>
      </ThreeButtonsBox>
    </HomeBox>
  );
}

export default Home;
