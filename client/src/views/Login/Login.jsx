import React from 'react';
import { useForm } from 'react-hook-form';
import AuthForm from '@/components/organisms/AuthForm/AuthForm.style';
import AuthTitle from '@/components/atoms/AuthTitle/AuthTitle.style';
import AuthTextField from '@/components/molecules/AuthTextField/AuthTextField.style';
import AuthSubmitButton from '@/components/atoms/AuthButton/AuthButton.style';
import mailIcon from '@/assets/images/icons/mail.svg';
import passwordIcon from '@/assets/images/icons/lock.svg';

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };
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
      <AuthSubmitButton type="submit" value="login" />
    </AuthForm>
  );
}

export default Login;
