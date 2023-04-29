const asyncHandler = require('express-async-handler');

const wakeUp = asyncHandler(async (req, res) => {
  return res.json({ message: 'I am sorry, I woke up!' });
});

module.exports = { wakeUp };
