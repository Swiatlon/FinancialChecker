import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/features/auth/authSlice';
import { AuthTextField, AuthForm, AuthTitle, AuthSubmitButton } from '@/components/Auth/Style/AuthElements.style';
import { useLoginMutation, useCreateNewUserMutation } from '@/features/auth/authApiSlice';
import { alertForSuccessfulAction, alertForErrors } from '@/helpers/Alerts/Swal';
import {
  requiredOptions,
  maxLength,
  minLength,
  emailPatternOptions,
  passwordPatternOptions,
} from '@/helpers/Forms/FormHelpers';
import { ReactComponent as MailIcon } from '@/assets/icons/mail.svg';
import { ReactComponent as PasswordIcon } from '@/assets/icons/lock.svg';

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
    formState: { errors },
  } = useForm();

  const logUserAfterRegister = async (email, password) => {
    await login({ email, password })
      .unwrap()
      .then(async (result) => {
        const { accessToken } = result;
        dispatch(setCredentials({ accessToken }));
        await alertForSuccessfulAction('User created!');
        return navigate('/postAuth');
      })
      .catch((err) => alertForErrors(err.data.message));
  };

  const onSubmit = async (data) => {
    const { email, password } = data;
    await registerUser({ email, password })
      .unwrap()
      .then(() => {
        logUserAfterRegister(email, password);
      })
      .catch((err) => alertForErrors(err?.data?.message));
  };

  return (
    <AuthForm onSubmit={handleSubmit(onSubmit)} hasErrors={errors}>
      <AuthTitle>Register Form</AuthTitle>
      <AuthTextField>
        <MailIcon alt="Mail Icon" />
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
        <PasswordIcon alt="Password Icon" />
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
