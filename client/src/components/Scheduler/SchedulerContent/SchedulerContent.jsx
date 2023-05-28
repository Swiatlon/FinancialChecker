import React from 'react';
import { ContentContainer, DayBox, DayNumer, DaySumarryExpense } from './SchedulerContent.style';
import { getMonthlyTransactionsValues } from '@/helpers/Transactions/TransactionsHelper';
import { alertForShowingDateExpenses } from '@/helpers/Alerts/Swal';

function SchedulerContent({ choosedMonthData, amountOfDaysInChoosedMonth }) {
  const monthlyTransactionsValues = getMonthlyTransactionsValues(choosedMonthData);

  const choosedDayData = (dayIndex) => {
    const choosedDayTransactions = choosedMonthData.filter((transaction) => {
      const transactionDay = new Date(transaction.createdAt).getDate();
      if (dayIndex === transactionDay) return true;
    });
    return choosedDayTransactions;
  };

  const renderDays = () => {
    return Array.from({ length: amountOfDaysInChoosedMonth }, (_, index) => (
      <DayBox
        key={index + 1}
        onClick={() => {
          alertForShowingDateExpenses(choosedDayData(index + 1));
        }}
      >
        <DaySumarryExpense>{monthlyTransactionsValues[index + 1]}</DaySumarryExpense>
        <DayNumer>{index + 1}</DayNumer>
      </DayBox>
    ));
  };

  return <ContentContainer>{renderDays()}</ContentContainer>;
}

export default SchedulerContent;
