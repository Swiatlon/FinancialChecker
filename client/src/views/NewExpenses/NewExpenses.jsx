import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { NewExpensesContainer, ExpensesForm, TwoItemsPerRow, ExpensesItem } from './NewExpenses.style';
import { useAddNewTransactionMutation } from '@/features/transactions/transactionsApiSlice';
import { alertForErrors, alertForSuccessfulAction } from '@/helpers/Alerts/Swal';
function NewExpenses() {
  const userID = '643b01db84f83eafe6445864';
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
    name: 'Items',
    control,
  });

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
    const { amount } = data;
    await addNewTransaction({ userId: userID, type: 'expense', amount })
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
        <input {...register('title', { required: true })} placeholder="Title" />

        <input
          {...register('amount', { required: true, min: 0, valueAsNumber: true })}
          placeholder="Amount"
          type="number"
        />

        <input {...register('location', { required: false })} placeholder="Location" />

        <TwoItemsPerRow>
          <p>Add Item</p>
          <input value="+" type="button" onClick={addNewItem} />
        </TwoItemsPerRow>

        {fields.map((field, index) => {
          return (
            <ExpensesItem key={field.id}>
              <input {...register(`Items.${index}.name`, { required: true })} placeholder="Item" />

              <input
                {...register(`Items.${index}.value`, { required: true, valueAsNumber: true })}
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
          );
        })}
        <input type="submit" value="Submit" />
      </ExpensesForm>
    </NewExpensesContainer>
  );
}

export default NewExpenses;
