const asyncHandler = require('express-async-handler');
const Wallet = require('../models/Wallet');

// @desc Get all users
// @route GET /users
// @access ?

const getAllWallets = asyncHandler(async (req, res) => {
  const wallets = await Wallet.find().lean();

  if (!wallets?.length) return res.status(400).json({ message: 'No wallets found!' });

  return res.json(wallets);
});

module.exports = {
  getAllWallets,
};
