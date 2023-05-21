import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { TransactionForm } from '@/components/NewTransactionElements/Style/NewTransactionElements.style';
import { useAddNewTransactionMutation, selectPayments } from '@/features/transactions/transactionsApiSlice';
import { useGetUserQuery } from '@/features/user/userApiSlice';
import { alertForErrors, alertForSuccessfulAction, alertForMoneyIncorrecntess } from '@/helpers/Alerts/Swal';
import { requiredOptions, onlyNumberOptions, regexpForNoNumbers, maxLength } from '@/helpers/Forms/FormHelpers';
import { Text, MediumTitle } from '@/components/Reusable/Style/ReusableElements';
import useAuth from '@/hooks/useAuth';

function NewPayment() {
  const { id: userID } = useAuth();

  // Redux
  const [addNewTransaction] = useAddNewTransactionMutation();
  const { data: userData, isLoading, isSuccess, isError, error } = useGetUserQuery(userID);
  const transactionCount = useSelector(selectPayments(userID));

  // React Forms
  const {
    control,
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({});

  // React Forms Functions
  const onSubmit = async (data) => {
    const { name } = userData;
    const { title, amount } = data;

    // Guest User
    if (name.toLowerCase() === 'guest') {
      if (transactionCount > 15) return alertForErrors('Maximum amount of transactions on guest account reached!');

      if (amount > 3000) return alertForErrors('Guest user can only send amount lower than 3000');
    }

    // Normal User
    await addNewTransaction({ userID, type: 'payment', amount, title })
      .unwrap()
      .then((result) => {
        reset(); // This will reset all form values
        if (isError) return alertForErrors("Your data hasn't been sent");

        return alertForSuccessfulAction(`${result.message}`);
      });
  };

  return (
    <TransactionForm onSubmit={handleSubmit(onSubmit)}>
      <MediumTitle>New Payment</MediumTitle>

      <input
        {...register('title', {
          pattern: regexpForNoNumbers,
          maxLength: maxLength(20),
        })}
        placeholder="Title"
      />
      {errors.title && <Text className="error-color">{errors.title.message}</Text>}

      <input
        {...register('amount', {
          required: requiredOptions,
          min: 1,
          valueAsNumber: onlyNumberOptions,
        })}
        placeholder="Amount"
        type="number"
      />
      {errors.amount && <Text className="error-color">{errors.amount.message}</Text>}

      <input type="submit" value="Submit" />
    </TransactionForm>
  );
}

export default NewPayment;
