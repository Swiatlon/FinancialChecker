import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateUserMutation } from '@/features/user/userApiSlice';
import { alertForSuccessfulAction, alertForErrors } from '@/helpers/Alerts/Swal';
import { requiredOptions, minLength, maxLength } from '@/helpers/Forms/FormHelpers';
import { Text } from '@/components/Reusable/Style/ReusableElements';

function ChangeUsername({ actualName, id }) {
  // React Hook-Form
  const {
    control,
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({});

  // Redux
  const [updateUsernameMutation] = useUpdateUserMutation();

  // Functions

  const updateUsername = async (data) => {
    await updateUsernameMutation({ id, name: data.title })
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
    <form onSubmit={handleSubmit(updateUsername)}>
      <label htmlFor="username">
        <Text> Username: {actualName}</Text>
        <input
          {...register('title', {
            required: requiredOptions,
            minLength: minLength(4),
            maxLength: maxLength(15),
          })}
          placeholder="new username"
        />
        {errors.title && <Text className="error-color">{errors.title.message}</Text>}
        <button type="submit" aria-label="Save">
          Save
        </button>
      </label>
    </form>
  );
}

export default ChangeUsername;
