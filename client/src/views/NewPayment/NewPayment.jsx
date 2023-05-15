import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import {
  NewTransactionContainer,
  TransactionForm,
} from '@/components/NewTransactionElements/Style/NewTransactionElements.style';
import { useAddNewTransactionMutation, selectPayments } from '@/features/transactions/transactionsApiSlice';
import { useGetUserQuery } from '@/features/user/userApiSlice';
import { alertForErrors, alertForSuccessfulAction, alertForMoneyIncorrecntess } from '@/helpers/Alerts/Swal';
import { requiredOptions, onlyNumberOptions } from '@/helpers/Forms/FormHelpers';
import useAuth from '@/hooks/useAuth';

function NewPayment() {
  const { id: userID, email } = useAuth();

  // Validation
  const regexpForNoNumbers = /^[A-Za-z-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/i;
  const patternMessage = 'You need to meet the pattern validation!';

  // Redux
  const [addNewTransaction, {}] = useAddNewTransactionMutation();
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
      <h2>New Payment</h2>

      <input
        {...register('title', {
          pattern: {
            value: regexpForNoNumbers,
            message: patternMessage,
          },
          maxLength: 20,
        })}
        placeholder="Title"
      />
      {errors.title && <p className="error-color">{errors.title.message}</p>}

      <input
        {...register('amount', {
          required: requiredOptions,
          min: 1,
          valueAsNumber: onlyNumberOptions,
        })}
        placeholder="Amount"
        type="number"
      />
      {errors.amount && <p className="error-color">{errors.amount.message}</p>}

      <input type="submit" value="Submit" />
    </TransactionForm>
  );
}

export default NewPayment;
