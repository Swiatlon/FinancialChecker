const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const transactionSchema = require('../models/schemas/Transaction');
const expenseSchema = require('../models/schemas/Expense');
const itemSchema = require('../models/schemas/Item');
const User = require('../models/User');

const ItemModel = mongoose.model('Item', itemSchema);
const ExpenseModel = mongoose.model('Expense', expenseSchema);
const TransactionModel = mongoose.model('Transaction', transactionSchema);

// @desc Get all user transactions
// @route GET api/transaction
// @access PRIVATE
const getAllUserTransactions = asyncHandler(async (req, res) => {
  const { userID } = req.query;

  if (!userID) return res.status(400).json({ message: 'User id is missing to get transactions' });

  const transactions = await User.findOne({ _id: userID }).select('payments expenses updatedAt').lean();

  if (!transactions) return res.status(400).json({ message: 'User not found' });

  return res.json(transactions);
});

/*--------------------------------------------------------------*/

// @desc Send new expense or payment
// @route POST api/transaction
// @access PRIVATE

const addNewTransaction = asyncHandler(async (req, res) => {
  const { userID, type, amount, title, location, items } = req.body;

  if (!userID || !type || !amount) return res.status(400).json({ message: 'All parameters are needed' });

  const wrongExpression = /^(?!expense$|payment$).*/i;

  if (wrongExpression.test(type)) return res.status(400).json({ message: 'Transaction wrong type' });

  let user;

  // Expense

  if (type.toLowerCase() === 'expense') {
    const expense = new ExpenseModel({ title, amount, location, items });

    // items
    const validatedItems = [];

    items?.forEach((element) => {
      const item = new ItemModel(element);
      validatedItems.push(item);
    });

    expense.items = validatedItems;
    // result

    user = await User.updateOne({ _id: userID }, { $push: { expenses: expense } }, { runValidators: true });
  }

  // Payment

  if (type.toLowerCase() === 'payment') {
    const payment = new TransactionModel({ amount, title });

    user = await User.updateOne({ _id: userID }, { $push: { payments: payment } }, { runValidators: true });
  }

  if (!user) return res.status(400).json({ message: 'User not found' });

  return res.json({ message: 'Successfully added new transaction' });
});

/*--------------------------------------------------------------*/

// @desc Delete all user transaction database
// @route DELETE api/transaction
// @access PRIVATE

const deleteAllUserTransactions = asyncHandler(async (req, res) => {
  const { userID } = req.body;

  if (!userID) return res.status(400).json({ message: 'All fields are required!' });

  const user = await User.findById(userID).exec();

  if (!user) return res.status(400).json({ message: 'User not found!' });

  const result = await User.updateOne(
    { _id: userID },
    {
      $set: {
        payments: [],
        expenses: [],
      },
    },
  );

  if (result.nModified === 0) return res.status(400).json({ message: 'Transaction data could not be deleted!' });

  return res.json({ message: 'Transaction data deleted successfully!' });
});

module.exports = {
  getAllUserTransactions,
  addNewTransaction,
  deleteAllUserTransactions,
};
