import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { NewExpensesContainer, ExpensesForm, TwoItemsPerRow, ExpensesItem } from './NewExpenses.style';

function NewExpenses() {
  const {
    control,
    register,
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
    console.log(data);
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
