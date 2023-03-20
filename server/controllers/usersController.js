const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Wallet = require('../models/Wallet');

// @desc Get all users
// @route GET /users
// @access ?

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').lean();

  if (!users?.length) return res.status(400).json({ message: 'No users found!' });

  return res.json(users);
});

/*--------------------------------------------------------------*/

// @desc Create new user
// @route POST /users
// @access ?

const createNewUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // Confirm data
  if (!username || !password) return res.status(400).json({ message: 'All files are required!' });

  // Check for duplicate
  const duplicate = await User.findOne({ username }).lean().exec();

  if (duplicate) return res.status(409).json({ messsage: 'Duplicate username' });

  // hash password
  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

  const userObject = { username, password: hashedPwd };

  // Create and store new user

  const user = await User.create(userObject);

  // Create User Wallet

  const walletObject = { amount: 0, user };

  const userWallet = await Wallet.create(walletObject);

  // Assign Wallet

  user.wallet = userWallet;

  await user.save();

  if (!user || !userWallet) return res.status(400).json({ message: 'Invalid user data received' });

  return res.status(201).json({ message: `New user ${username} created` });
});

/*--------------------------------------------------------------*/

// @desc Update a user
// @route PATCH /users
// @access ?
const updateUser = asyncHandler(async (req, res) => {
  const { id, username, password } = req.body;

  if (!id || !username) return res.status(400).json({ message: 'All fields are required!' });

  const user = await User.findById(id).exec();

  if (!user) return res.status(400).json({ message: 'User not found!' });

  // Check for duplictae
  const duplicate = await User.findOne({ username }).lean().exec();
  // Allow updates to the orginal user
  if (duplicate && duplicate?._id.toString() !== id)
    return res.status(409).json({ message: 'Someone have that username already!' });

  user.username = username;

  if (password) {
    // Hash password
    user.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await user.save();

  return res.json({ message: 'Updated sucessfull!' });
});

// @desc Delete a user
// @route DELETE /users
// @access  ?
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: 'User ID Required!' });

  const user = await User.findById(id).exec();

  if (!user) return res.status(400).json({ message: 'User not found!' });

  // First we delete his wallet

  if (user?.wallet) await Wallet.deleteOne(user.wallet);

  // Then we delete  user

  const result = await User.findOneAndDelete(user._id);

  console.log(result);

  const reply = `Username ${result.username} with ID ${result._id} deleted!`;

  return res.json(reply);
});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
