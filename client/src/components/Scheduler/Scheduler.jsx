import React, { useState } from 'react';
import { ReactComponent as ArrowLeft } from '@/assets/icons/arrow-left.svg';
import { ReactComponent as ArrowRight } from '@/assets/icons/arrow-right.svg';
import { SchedulerBox, MonthName, TopInformation } from './Scheduler.style';
import SchedulerContent from './SchedulerContent/SchedulerContent';
import { getMonthlyTransactions } from '@/helpers/Transactions/TransactionsHelper';

function Scheduler({ expenses, payments }) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const [monthIndex, setMonthIndex] = useState(currentMonth); // Initial month value

  const handlePrevMonth = () => {
    const previousMonthIndex = (monthIndex - 1 + monthNames.length) % monthNames.length;
    setMonthIndex(previousMonthIndex);
  };

  const handleNextMonth = () => {
    const nextMonthIndex = (monthIndex + 1 + monthNames.length) % monthNames.length;
    setMonthIndex(nextMonthIndex);
  };

  const getAmountOfDaysInMonth = () => {
    return new Date(currentYear, monthIndex + 1, 0).getDate(); // +1 because  Dec => 0 January=> 1... and our index start from 0
  };

  const filteredData = getMonthlyTransactions(expenses, monthIndex);

  return (
    <SchedulerBox>
      <TopInformation>
        <ArrowLeft onClick={handlePrevMonth} />
        <MonthName>{`${currentYear}/${monthNames[monthIndex]}`}</MonthName>
        <ArrowRight onClick={handleNextMonth} />
      </TopInformation>
      <SchedulerContent choosedMonthData={filteredData} amountOfDaysInChoosedMonth={getAmountOfDaysInMonth()} />
    </SchedulerBox>
  );
}

export default Scheduler;
