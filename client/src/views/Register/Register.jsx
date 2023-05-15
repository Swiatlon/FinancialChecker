import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/features/auth/authSlice';
import AuthForm from '@/components/Auth/AuthForm/AuthForm.style';
import AuthTitle from '@/components/Auth/AuthTitle/AuthTitle.style';
import AuthTextField from '@/components/Auth/AuthTextField/AuthTextField.style';
import AuthSubmitButton from '@/components/Auth/AuthButton/AuthButton.style';
import mailIcon from '@/assets/images/icons/mail.svg';
import passwordIcon from '@/assets/images/icons/lock.svg';
import { useLoginMutation, useCreateNewUserMutation } from '@/features/auth/authApiSlice';
import { alertForSuccessfulAuth, alertForErrors } from '@/helpers/Alerts/Swal';
import {
  requiredOptions,
  maxLength,
  minLength,
  emailPatternOptions,
  passwordPatternOptions,
} from '@/helpers/Forms/FormHelpers';

function Register() {
  // React Router
  const navigate = useNavigate();

  // Redux
  const dispatch = useDispatch();
  const [registerUser] = useCreateNewUserMutation();
  const [login] = useLoginMutation();

  // React Forms
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const logUserAfterRegister = async (message, email, password) => {
    await login({ email, password })
      .unwrap()
      .then((result) => {
        const { accessToken } = result;
        dispatch(setCredentials({ accessToken }));
        alertForSuccessfulAuth(message, () => {
          navigate('/postAuth');
        });
      })
      .catch((err) => alertForErrors(err.data.message));
  };

  const onSubmit = async (data) => {
    const { email, password } = data;
    await registerUser({ email, password })
      .unwrap()
      .then((result) => {
        logUserAfterRegister(result.message, email, password);
      })
      .catch((err) => alertForErrors(err.data.message));
  };

  return (
    <AuthForm onSubmit={handleSubmit(onSubmit)} hasErrors={errors}>
      <AuthTitle>Register Form</AuthTitle>
      <AuthTextField>
        <img src={mailIcon} alt="email" />
        <input
          {...register('email', {
            required: requiredOptions,
            maxLength: maxLength(32),
            minLength: minLength(3),
            pattern: emailPatternOptions,
          })}
          placeholder="email"
          type="email"
          aria-invalid={errors.email ? 'true' : 'false'}
        />
      </AuthTextField>
      {errors.email && <span role="alert">{errors.email.message}</span>}

      <AuthTextField>
        <img src={passwordIcon} alt="password" />
        <input
          {...register('password', {
            required: requiredOptions,
            minLength: minLength(6),
            maxLength: maxLength(24),
            pattern: passwordPatternOptions,
          })}
          placeholder="password"
          type="password"
          aria-invalid={errors.password ? 'true' : 'false'}
        />
      </AuthTextField>
      {errors.password && <span role="alert">{errors.password.message}</span>}

      <AuthSubmitButton type="submit" value="Register" />
    </AuthForm>
  );
}

export default Register;
