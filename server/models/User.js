const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  wallet: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'Wallet',
  },
});

module.exports = mongoose.model('User', userSchema);
