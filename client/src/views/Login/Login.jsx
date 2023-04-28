import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '@/features/auth/authSlice';
import { useLoginMutation } from '@/features/auth/authApiSlice';
import usePersist from '@/hooks/usePersist';
import AuthForm from '@/components/organisms/AuthForm/AuthForm.style';
import AuthTitle from '@/components/atoms/AuthTitle/AuthTitle.style';
import AuthTextField from '@/components/molecules/AuthTextField/AuthTextField.style';
import AuthSubmitButton from '@/components/atoms/AuthButton/AuthButton.style';
import mailIcon from '@/assets/images/icons/mail.svg';
import passwordIcon from '@/assets/images/icons/lock.svg';
import AuthRememberBox from '@/components/molecules/AuthRememberBox/AuthRememberBox.style';
import { alertForErrors, alertForSuccessfulAuth } from '@/helpers/Alerts/Swal';

function Login() {
  // React
  const [persist, setPersist] = usePersist();

  // React Router
  const navigate = useNavigate();

  // Redux
  const dispatch = useDispatch();
  const [login, { isLoading, isError, error }] = useLoginMutation();

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
        <img src={mailIcon} alt="email" />
        <input {...register('email', { required: true })} placeholder="email" />
      </AuthTextField>
      <AuthTextField>
        <img src={passwordIcon} alt="password" />
        <input {...register('password', { required: true })} placeholder="password" type="password" />
      </AuthTextField>
      <AuthRememberBox>
        <input type="checkbox" id="myCheckbox" onChange={handleToggle} checked={persist} />
        <label htmlFor="myCheckbox">Remember Me</label>
      </AuthRememberBox>
      <AuthSubmitButton type="submit" value="login" />
    </AuthForm>
  );
}

export default Login;
