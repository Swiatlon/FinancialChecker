import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { NewExpensesContainer, ExpensesForm, TwoItemsPerRow, ExpensesItem } from './NewExpenses.style';
import { useAddNewTransactionMutation } from '@/features/transactions/transactionsApiSlice';
import { alertForErrors, alertForSuccessfulAction, alertForMoneyIncorrecntess } from '@/helpers/Alerts/Swal';
import useAuth from '@/hooks/useAuth';

function NewExpenses() {
  const { id: userID } = useAuth();

  // Validation
  const regexpForNoNumbers = /^[A-Za-z-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/i;
  const regexpForMinTwoLetters = /^(?=.*[a-zA-Z].*[a-zA-Z])[a-zA-Z0-9]*$/;

  const requiredOptions = { value: true, message: 'Field is required!' };
  const onlyNumberOptions = { value: true, message: 'Field need to be numer type!' };

  const patternMessage = 'You need to meet the pattern validation!';

  // Redux
  const [addNewTransaction, { isLoading, isError, data, error }] = useAddNewTransactionMutation();

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
    let { amount } = data;
    const { location, title, items } = data;

    const totalMoneyAmountOfItems = Object.values(items.length > 0 ? items : 0)
      .map((item) => item.value)
      .reduce((a, b) => a + b, 0);

    if (totalMoneyAmountOfItems > amount)
      await alertForMoneyIncorrecntess().then((isConfirmed) => {
        userConfirm = isConfirmed;
        amount = totalMoneyAmountOfItems;
      });

    if (!userConfirm) return alertForErrors("Your data hasn't been sent");

    await addNewTransaction({ userID, type: 'expense', amount, title, location, items })
      .unwrap()
      .then(() => {
        reset(); // This will reset all form values
        remove(); // Reset all items
        if (isError) return alertForErrors("Your data hasn't been sent");

        return alertForSuccessfulAction('Data sent successfuly!');
      });
  };

  return (
    <NewExpensesContainer>
      <ExpensesForm onSubmit={handleSubmit(onSubmit)}>
        <h2>New Expenses</h2>

        <input
          {...register('title', {
            required: requiredOptions,
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

        <input
          {...register('location', {
            required: false,
            pattern: {
              value: regexpForMinTwoLetters,
              message: patternMessage,
            },
            maxLength: 20,
          })}
          placeholder="Location"
        />
        {errors.location && <p className="error-color">{errors.location.message}</p>}

        <TwoItemsPerRow>
          <p>Add Item</p>
          <input value="+" type="button" onClick={addNewItem} />
        </TwoItemsPerRow>

        {fields.map((field, index) => {
          return (
            <>
              <ExpensesItem key={field.id}>
                <input
                  {...register(`items.${index}.name`, {
                    required: requiredOptions,
                    pattern: {
                      value: regexpForNoNumbers,
                      message: patternMessage,
                    },
                    maxLength: 20,
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
                <p className="error-color">{errors.items[index].name?.message || errors.items[index].value?.message}</p>
              )}
            </>
          );
        })}
        <input type="submit" value="Submit" />
      </ExpensesForm>
    </NewExpensesContainer>
  );
}

export default NewExpenses;
