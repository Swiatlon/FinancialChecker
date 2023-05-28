import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import {
  TransactionForm,
  TwoItemsPerRow,
  ExpensesItem,
} from '@/components/NewTransactionElements/Style/NewTransactionElements.style';
import { useAddNewTransactionMutation, selectExpenses } from '@/features/transactions/transactionsApiSlice';
import { useGetUserQuery } from '@/features/user/userApiSlice';
import { alertForErrors, alertForSuccessfulAction, alertForMoneyIncorrecntess } from '@/helpers/Alerts/Swal';
import {
  requiredOptions,
  onlyNumberOptions,
  regexpForNoNumbers,
  maxLength,
  minLength,
} from '@/helpers/Forms/FormHelpers';
import { MediumTitle, Text } from '@/components/Reusable/Style/ReusableElements.style';
import useAuth from '@/hooks/useAuth';

function NewExpenses() {
  const { id: userID } = useAuth();

  // Redux
  const [addNewTransaction] = useAddNewTransactionMutation();
  const { data: userData, isLoading, isSuccess, isError, error } = useGetUserQuery(userID);
  const transactionCount = useSelector(selectExpenses(userID));

  // React Forms
  const {
    control,
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({});

  const { fields, append, remove } = useFieldArray({
    name: 'items',
    control,
  });

  // React Forms Functions
  const addNewItem = () => {
    append({
      name: '',
      value: '',
    });
  };

  const deleteItem = (index) => {
    remove(index);
  };

  const onSubmit = async (data) => {
    let userConfirm = true;
    const { name } = userData;
    let { amount } = data;
    const { location, title, items } = data;

    // Guest User
    if (name.toLowerCase() === 'guest') {
      if (transactionCount > 15) return alertForErrors('Maximum amount of transactions on guest account reached!');

      if (amount > 3000) return alertForErrors('Guest user can only send amount lower than 3000');
    }

    // Normal User
    const totalMoneyAmountOfItems = Object.values(items.length > 0 ? items : 0)
      .map((item) => item.value)
      .reduce((a, b) => a + b, 0);

    // If user pass items and there is incorrectness in overal amount
    if (totalMoneyAmountOfItems > amount || totalMoneyAmountOfItems < amount)
      await alertForMoneyIncorrecntess().then((isConfirmed) => {
        userConfirm = isConfirmed;
        amount = totalMoneyAmountOfItems;
      });

    if (!userConfirm) return alertForErrors("Your data hasn't been sent");

    await addNewTransaction({ userID, type: 'expense', amount, title, location, items })
      .unwrap()
      .then((result) => {
        reset(); // This will reset all form values
        remove(); // Reset all items
        if (isError) return alertForErrors("Your data hasn't been sent");

        return alertForSuccessfulAction(`${result.message}`);
      });
  };

  return (
    <TransactionForm onSubmit={handleSubmit(onSubmit)}>
      <MediumTitle>New Expenses</MediumTitle>

      <input
        {...register('title', {
          required: requiredOptions,
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

      <input
        {...register('location', {
          required: false,
          minLength: minLength(2),
          maxLength: maxLength(20),
        })}
        placeholder="Location"
      />
      {errors.location && <Text className="error-color">{errors.location.message}</Text>}

      <TwoItemsPerRow>
        <Text>Add Item</Text>
        <input value="+" type="button" onClick={addNewItem} />
      </TwoItemsPerRow>

      {fields.map((field, index) => {
        return (
          <>
            <ExpensesItem key={field.id}>
              <input
                {...register(`items.${index}.name`, {
                  required: requiredOptions,
                  pattern: regexpForNoNumbers,
                  maxLength: maxLength(20),
                })}
                placeholder="Item"
              />

              <input
                {...register(`items.${index}.value`, { required: requiredOptions, valueAsNumber: onlyNumberOptions })}
                placeholder="Value"
                type="Number"
              />

              <input
                type="button"
                value="X"
                onClick={() => {
                  deleteItem(index);
                }}
              />
            </ExpensesItem>

            {errors.items && errors.items[index] && (
              <Text className="error-color">
                {errors.items[index].name?.message || errors.items[index].value?.message}
              </Text>
            )}
          </>
        );
      })}
      <input type="submit" value="Submit" />
    </TransactionForm>
  );
}

export default NewExpenses;
