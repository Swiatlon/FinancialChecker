const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: 'Nameless transaction',
    },

    amount: {
      type: Number,
      required: true,
      validate: {
        validator(amount) {
          if (amount <= 0) return false;
          return true;
        },
        message: 'Amount cannot be negative number',
      },
    },
  },

  { autoCreate: false, timestamps: true },
);

module.exports = transactionSchema;
