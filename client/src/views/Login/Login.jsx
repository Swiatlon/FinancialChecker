import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '@/features/auth/authSlice';
import { useLoginMutation } from '@/features/auth/authApiSlice';
import usePersist from '@/hooks/usePersist';
import {
  AuthTextField,
  AuthForm,
  AuthTitle,
  AuthSubmitButton,
  AuthRememberBox,
} from '@/components/Auth/Style/AuthElements.style';
import { ReactComponent as MailIcon } from '@/assets/icons/mail.svg';
import { ReactComponent as PasswordIcon } from '@/assets/icons/lock.svg';
import { alertForErrors, alertForSuccessfulAuth } from '@/helpers/Alerts/Swal';

function Login() {
  // React
  const [persist, setPersist] = usePersist();

  // React Router
  const navigate = useNavigate();

  // Redux
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  // React Hooks Forms
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      const { accessToken } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      alertForSuccessfulAuth('Logged in!', () => {
        navigate('/postAuth');
      });
    } catch (err) {
      alertForErrors(err.data.message);
    }
  };

  const handleToggle = () => setPersist((prev) => !prev);

  return (
    <AuthForm onSubmit={handleSubmit(onSubmit)}>
      <AuthTitle>Login Form</AuthTitle>
      <AuthTextField>
        <MailIcon alt="Mail Icon" />
        <input {...register('email', { required: true })} placeholder="email" />
      </AuthTextField>
      <AuthTextField>
        <PasswordIcon alt="Password Icon" />
        <input {...register('password', { required: true })} placeholder="password" type="password" />
      </AuthTextField>
      <AuthRememberBox>
        <label htmlFor="myCheckbox">
          <input type="checkbox" id="myCheckbox" onChange={handleToggle} checked={persist} />
          Remember Me
        </label>
      </AuthRememberBox>
      <AuthSubmitButton type="submit" value="login" />
    </AuthForm>
  );
}

export default Login;
