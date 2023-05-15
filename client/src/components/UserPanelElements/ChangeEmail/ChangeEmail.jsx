import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateUserMutation } from '@/features/user/userApiSlice';
import { alertForSuccessfulAction, alertForErrors } from '@/helpers/Alerts/Swal';
import { requiredOptions, minLength, maxLength, emailPatternOptions } from '@/helpers/Forms/FormHelpers';

function ChangeEmail({ actualEmail, id }) {
  // React Hook-Form
  const {
    control,
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({});

  // Redux
  const [updateEmailMutation, {}] = useUpdateUserMutation();

  // Functions

  const updateEmail = async (data) => {
    await updateEmailMutation({ id, email: data.email })
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
    <form onSubmit={handleSubmit(updateEmail)}>
      <label htmlFor="email">
        <p> Email: {actualEmail}</p>
        <input
          {...register('email', {
            required: requiredOptions,
            maxLength: maxLength(32),
            minLength: minLength(3),
            pattern: emailPatternOptions,
          })}
          placeholder="new email"
        />
        {errors.email && <p className="error-color">{errors.email.message}</p>}
        <button type="submit" aria-label="Save">
          Save
        </button>
      </label>
    </form>
  );
}

export default ChangeEmail;
