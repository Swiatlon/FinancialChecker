const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      set(value) {
        // our default function
        if (!value || value.trim() === '') {
          return 'Nameless Transaction';
        }
        return value;
      },
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
