import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateUserMutation } from '@/features/user/userApiSlice';
import { alertForSuccessfulAction, alertForErrors } from '@/helpers/Alerts/Swal';
import { requiredOptions, minLength, maxLength, passwordPatternOptions } from '@/helpers/Forms/FormHelpers';

function ChangePassword({ id }) {
  // React Hook-Form
  const {
    control,
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({});

  // Redux
  const [updatePasswordMutation, {}] = useUpdateUserMutation();

  // Functions
  const updatePassword = async (data) => {
    const { oldPassword, newPassword } = data;
    await updatePasswordMutation({ id, oldPassword, newPassword })
      .unwrap()
      .then((result) => {
        reset();
        return alertForSuccessfulAction(`${result.message}`);
      })
      .catch((err) => {
        return alertForErrors(err?.data?.message);
      });
  };

  return (
    <form onSubmit={handleSubmit(updatePassword)}>
      <label htmlFor="password">
        Change Password
        <input
          {...register('oldPassword', {
            required: requiredOptions,
          })}
          placeholder="old password"
          type="password"
          aria-invalid={errors.oldPassword ? 'true' : 'false'}
        />
        {errors.oldPassword && <p className="error-color">{errors.oldPassword.message}</p>}
        <input
          {...register('newPassword', {
            required: requiredOptions,
            minLength: minLength(6),
            maxLength: maxLength(32),
            pattern: passwordPatternOptions,
          })}
          placeholder="new password"
          type="password"
          aria-invalid={errors.newPassword ? 'true' : 'false'}
        />
        {errors.newPassword && <p className="error-color">{errors.newPassword.message}</p>}
        <button type="submit" aria-label="Save">
          Save
        </button>
      </label>
    </form>
  );
}

export default ChangePassword;
