const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
      validate: {
        validator(value) {
          if (value <= 0) return false;
          return true;
        },
        message: 'Value cannot be negative number',
      },
    },
  },
  { autoCreate: false, timestamps: false },
);

module.exports = itemSchema;
