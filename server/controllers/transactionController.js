const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const transactionSchema = require('../models/schemas/Transaction');
const User = require('../models/User');

const Transaction = mongoose.model('TransactionHistory', transactionSchema);

// @desc Get all user transactions
// @route GET /transaction
// @access PRIVATE
const getAllUserTransactions = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: 'User id is missing to get transactions' });

  const transaction = await User.findOne({ _id: id }).select('payments expenses updatedAt').lean();

  if (!transaction) return res.status(400).json({ message: 'User not found' });

  return res.json(transaction);
});

// @desc Send new expense or payment
// @route POST /transaction
// @access PRIVATE
const addNewTransaction = asyncHandler(async (req, res) => {
  const { id, type, amount } = req.body;

  if (!id || !type || !amount) return res.status(400).json({ message: 'All parameters are needed' });

  const wrongExpression = /^(?!expense$|payment$).*/i;

  if (wrongExpression.test(type)) return res.status(400).json({ message: 'Transaction wrong type' });

  const transaction = new Transaction({ amount });

  const arrayType = `${type}s`.toLowerCase(); // Expenses or Payments (type + s to make it plural)

  const user = await User.updateOne({ _id: id }, { $push: { [arrayType]: transaction } }, { runValidators: true });

  if (!user) return res.status(400).json({ message: 'User not found' });

  return res.json({ message: 'Successfully added new transaction' });
});

module.exports = {
  getAllUserTransactions,
  addNewTransaction,
};
