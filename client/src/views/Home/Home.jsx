import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '@/features/auth/authApiSlice';
import { setCredentials } from '@/features/auth/authSlice';
import { alertForSuccessfulAction, alertForErrors } from '@/helpers/Alerts/Swal';
import { MediumTitle, Text } from '@/components/Reusable/Style/ReusableElements.style';
import HomeBox from './Home.style';
import ThreeButtonsBox from '@/components/HomeElements/Style/HomeElements.style';

function Home() {
  // React Router
  const navigate = useNavigate();

  // Redux
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  // Functions
  async function logInGuest() {
    const guestEmail = import.meta.env.VITE_QUEST_EMAIL;
    const guestPassword = import.meta.env.VITE_QUEST_PASSWORD;
    try {
      // Set Redux
      const { accessToken } = await login({ email: guestEmail, password: guestPassword }).unwrap();
      dispatch(setCredentials({ accessToken }));
      // Move to next section with alert
      await alertForSuccessfulAction('Logged in!');
      return navigate('/postAuth');
    } catch (err) {
      return alertForErrors(err?.data?.message);
    }
  }
  return (
    <HomeBox>
      <MediumTitle>Welcome</MediumTitle>
      <Text>This website will help you track your expenses!</Text>
      <ThreeButtonsBox>
        <Link to="/register">Get Started!</Link>
        <Link to="/tutorial">Tutorial</Link>
        <button type="button" onClick={logInGuest}>
          Guest Account
        </button>
      </ThreeButtonsBox>
    </HomeBox>
  );
}

export default Home;
