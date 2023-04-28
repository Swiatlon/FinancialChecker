import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/features/auth/authSlice';
import AuthForm from '@/components/organisms/AuthForm/AuthForm.style';
import AuthTitle from '@/components/atoms/AuthTitle/AuthTitle.style';
import AuthTextField from '@/components/molecules/AuthTextField/AuthTextField.style';
import AuthSubmitButton from '@/components/atoms/AuthButton/AuthButton.style';
import mailIcon from '@/assets/images/icons/mail.svg';
import passwordIcon from '@/assets/images/icons/lock.svg';
import { useLoginMutation, useCreateNewUserMutation } from '@/features/auth/authApiSlice';
import { alertForSuccessfulAuth, alertForErrors } from '@/helpers/Alerts/Swal';

function Register() {
  // React Router
  const navigate = useNavigate();

  // Redux
  const dispatch = useDispatch();
  const [registerUser] = useCreateNewUserMutation();
  const [login] = useLoginMutation();

  // React
  const passwordPattern = /^^(?=.*[\W_])(?=.*[A-Z]).+$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // React Forms
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const errorMessageHandler = (error, type) => {
    if (!error) return '';

    if (error === 'required') return 'Field is required!';

    if (error === 'pattern') {
      if (type === 'password') return 'Password pattern:\n -one uppercase letter\n -one special char';

      return "Field don't meet pattern!";
    }

    if (error === 'minLength') return 'Too few characters!';

    if (error === 'maxLength') return 'Field have too many characters!';

    return "Field don't meet required conditions!";
  };

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
          {...register('email', { required: true, maxLength: '30', pattern: emailPattern, minLength: 4 })}
          placeholder="email"
          name="email"
          aria-invalid={errors.email ? 'true' : 'false'}
        />
      </AuthTextField>
      {errors.email && <span role="alert">{errorMessageHandler(errors.email.type, 'email')}</span>}
      <AuthTextField>
        <img src={passwordIcon} alt="password" />
        <input
          {...register('password', { required: true, pattern: passwordPattern, minLength: 6 })}
          placeholder="password"
          type="password"
          name="password"
          aria-invalid={errors.password ? 'true' : 'false'}
        />
      </AuthTextField>
      {errors.password && <span role="alert">{errorMessageHandler(errors.password.type, 'password')}</span>}
      <AuthSubmitButton type="submit" value="Register" />
    </AuthForm>
  );
}

export default Register;
