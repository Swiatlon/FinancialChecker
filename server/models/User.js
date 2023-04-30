const mongoose = require('mongoose');
const transactionSchema = require('./schemas/Transaction');
const expenseSchema = require('./schemas/Expense');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },

    name: {
      type: String,
      unique: true,
      max: 50,
      default: () => {
        return this.email.split('@')[0]; // Set name as the part before the @ symbol
      },
    },

    password: {
      type: String,
      required: true,
    },

    payments: [transactionSchema],

    expenses: [expenseSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
