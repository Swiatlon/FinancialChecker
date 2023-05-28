export const getMonthlyTransactions = (transactions, month = new Date().getMonth()) => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), month, 1);
  const endOfMonth = new Date(now.getFullYear(), month + 1, 0);
  endOfMonth.setHours(23, 59, 59);
  const monthlyTransactions = transactions.filter(
    (transaction) => new Date(transaction.createdAt) >= startOfMonth && new Date(transaction.createdAt) <= endOfMonth,
  );

  return monthlyTransactions;
};

export function getMonthlyTransactionsValues(monthlyTransactions) {
  const dailyTransaction = {};

  // Summary Daily Transactions
  monthlyTransactions.forEach((transaction) => {
    const date = new Date(transaction.createdAt).toLocaleDateString('en-gb', { day: 'numeric' });
    const { amount } = transaction;

    if (dailyTransaction[date]) {
      dailyTransaction[date] += amount;
    } else {
      dailyTransaction[date] = amount;
    }
  });

  return dailyTransaction;
}

export const getWeeklyTransactions = (transactions) => {
  // Get Curent Date
  const now = new Date();

  // Parameters for calculations
  const currentDay = now.getDay();
  const daysSinceMonday = currentDay === 0 ? 6 : currentDay - 1;

  // Week start/end
  const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - daysSinceMonday); // Monday
  const endOfWeek = new Date(now.getFullYear(), now.getMonth(), startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59); // Sunday 23:59:59

  const weeklyTransactions = transactions.filter(
    (transaction) =>
      new Date(transaction.createdAt).getTime() >= startOfWeek.getTime() &&
      new Date(transaction.createdAt).getTime() <= endOfWeek.getTime(),
  );

  return weeklyTransactions;
};

export function getWeeklyTransactionsValues(transactions) {
  // Container for day:value data
  const dailyTransactions = {};
  const days = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
  const weeklyTransactions = getMonthlyTransactions(transactions);

  weeklyTransactions.forEach((transaction) => {
    const date = new Date(transaction.createdAt);
    const dayOfWeek = date.getDay() === 0 ? days.length - 1 : date.getDay() - 1; // 0 is sunday so we need change it into 6
    const { amount } = transaction;

    if (dailyTransactions[days[dayOfWeek]]) {
      dailyTransactions[days[dayOfWeek]] += amount;
    } else {
      dailyTransactions[days[dayOfWeek]] = amount;
    }
  });

  return dailyTransactions;
}
