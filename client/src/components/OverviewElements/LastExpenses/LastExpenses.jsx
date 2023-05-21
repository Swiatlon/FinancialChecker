import React from 'react';
import { SideDiv, BoxesContainer, ExpensesBox } from '../Styles/OverviewElements.style';
import { Text } from '@/components/Reusable/Style/ReusableElements';

function LastExpenses({ expenses }) {
  const lastSixExpenses = Array(6).fill(0);
  for (let i = 0; i < 6; i += 1) {
    lastSixExpenses[i] = expenses[expenses.length - 1 - i];
  }
  return (
    <SideDiv>
      <h3>Last expeneses:</h3>
      <BoxesContainer amountOfBoxes="3">
        {lastSixExpenses.map((expense, index) =>
          expense.amount ? (
            <ExpensesBox key={index}>
              <h5>{expense.title}</h5>
              <Text className="error-color">{expense.amount}</Text>
            </ExpensesBox>
          ) : (
            <ExpensesBox key={index}>
              <Text>Add data</Text>
            </ExpensesBox>
          ),
        )}
      </BoxesContainer>
    </SideDiv>
  );
}

export default LastExpenses;
