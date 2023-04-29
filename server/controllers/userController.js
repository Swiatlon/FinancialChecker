const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// @desc Get user
// @route GET api/user
// @access PRIVATE

const getUser = asyncHandler(async (req, res) => {
  const { id } = req.query;

  if (!id) return res.status(400).json({ message: 'Id required!' });

  const user = await User.findOne({ _id: id }).select('id email name createdAt updatedAt').lean();

  if (!user) return res.status(400).json({ message: 'User not found!' });

  return res.json(user);
});

/*--------------------------------------------------------------*/

// @desc Update a user
// @route PATCH api/user
// @access PRIVATE

const updateUser = asyncHandler(async (req, res) => {
  const { id, name, password } = req.body;

  if (!id) return res.status(400).json({ message: 'All fields are required!' });

  const user = await User.findById(id).exec();

  if (!user) return res.status(400).json({ message: 'User not found!' });

  user.name = name;

  if (password) {
    // Hash password
    user.password = await bcrypt.hash(password, 10);
  }

  await user.save();

  return res.json({ message: 'Updated sucessfull!' });
});

/*--------------------------------------------------------------*/

// @desc Delete a user
// @route DELETE api/user
// @access  PRIVATE

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: 'User ID Required!' });

  const user = await User.findById(id).exec();

  if (!user) return res.status(400).json({ message: 'User not found!' });

  // Then we delete  user

  const result = await User.findOneAndDelete(user._id);

  const reply = `User ${result.name} with ID ${result._id} deleted!`;

  return res.json(reply);
});

module.exports = {
  getUser,
  updateUser,
  deleteUser,
};
