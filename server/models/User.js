const mongoose = require('mongoose');
const transactionSchema = require('./schemas/Transaction');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },

    name: {
      type: String,
    },

    password: {
      type: String,
      required: true,
    },

    payments: [transactionSchema],

    expenses: [transactionSchema],
  },
  // Update with newTransaction ?
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
