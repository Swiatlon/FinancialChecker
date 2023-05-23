const mongoose = require('mongoose');
const itemSchema = require('./Item');
const transactionSchema = require('./Transaction');

const ExpenseSchema = new mongoose.Schema(
  {
    ...transactionSchema.obj,
    location: {
      type: String,
      default: 'none',
    },
    items: [itemSchema],
  },
  { autoCreate: false, timestamps: true },
);

module.exports = ExpenseSchema;
