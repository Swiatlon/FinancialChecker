import React from 'react';
import { SideDiv, BoxesContainer, RectangleBox } from '../Styles/OverviewElements.style';
import { SmallTitle } from '@/components/Reusable/Style/ReusableElements.style';

function MyWalletOverview({ expenses, payments }) {
  function getMoneyBalance() {
    const expensesSum = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const paymentsSum = payments.reduce((acc, payment) => acc + payment.amount, 0);

    return paymentsSum - expensesSum;
  }

  function getMonthlyBalance() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const monthlyExpenses = expenses.filter(
      (transaction) => new Date(transaction.createdAt) >= startOfMonth && new Date(transaction.createdAt) <= endOfMonth,
    );

    const monthlyPayments = payments.filter(
      (transaction) => new Date(transaction.createdAt) >= startOfMonth && new Date(transaction.createdAt) <= endOfMonth,
    );

    const expensesSum = monthlyExpenses.reduce((acc, expense) => acc + expense.amount, 0);
    const paymentsSum = monthlyPayments.reduce((acc, payment) => acc + payment.amount, 0);

    return paymentsSum - expensesSum;
  }

  return (
    <SideDiv>
      <SmallTitle>My Wallet:</SmallTitle>
      <BoxesContainer amountOfBoxes="2">
        <RectangleBox moneyBalance={getMoneyBalance()}>
          Amount:<span>&nbsp;{getMoneyBalance()}</span>
        </RectangleBox>
        <RectangleBox moneyBalance={getMonthlyBalance()}>
          Monthly Balance: <span>&nbsp;{getMonthlyBalance()}</span>
        </RectangleBox>
      </BoxesContainer>
    </SideDiv>
  );
}

export default MyWalletOverview;
