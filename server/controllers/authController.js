const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc Login
// @route POST /auth
// @access Public

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'All fields are required!' });

  const foundUser = await User.findOne({ email }).exec();

  if (!foundUser) return res.status(401).json({ message: 'User not exist!' });

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) return res.status(401).json({ message: 'Password or email not correct!' });

  // After everything is correct we set JWT Tokens

  const accessToken = jwt.sign(
    {
      UserInfo: {
        email: foundUser.email,
        id: foundUser._id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' },
  );

  const refreshToken = jwt.sign(
    {
      email: foundUser.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' },
  );

  const cookieTime = 7 * 24 * 60 * 60 * 1000; // 7 days
  // Create secure cookie with refresh token
  res.cookie('jwt', refreshToken, {
    httpOnly: true, // accessible only by web server
    secure: true, // https
    sameSite: 'None', // cross-site cookie
    maxAge: cookieTime, // cookie expiry: set to match refreshToken
  });

  // Send accessToken 
  return res.json({ accessToken });
});
/*--------------------------------------------------------------*/

// @desc Create new user
// @route POST auth/register
// @access Public

const createNewUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Confirm data
  if (!email || !password) return res.status(400).json({ message: 'All fields are required!' });

  // Check for duplicate

  const duplicate = await User.findOne({ email }).lean().exec();

  if (duplicate) return res.status(409).json({ message: 'User with this email exists' });

  // hash password
  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

  // get username  ? Maybe in schema model create ?

  const name = email.split('@')[0];

  const userObject = { email, password: hashedPwd, name };

  // Create and store new user

  const user = await User.create(userObject);

  if (!user) return res.status(400).json({ message: 'Invalid user data received' });

  return res.status(201).json({ message: `New user ${name} created` });
});
/*--------------------------------------------------------------*/

// @desc Refresh
// @route POST /auth/refresh
// @access Public

const refresh = (req, res) => {
  const { cookies } = req;

  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized!' });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Session expired' });

      const foundUser = await User.findOne({ email: decoded.email }).exec();

      if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            email: foundUser.email,
            id: foundUser._id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' },
      );

      return res.json({ accessToken });
    }),
  );
};
/*--------------------------------------------------------------*/

// @desc Logout
// @route POST /auth/logout
// @access Public

const logout = (req, res) => {
  const { cookies } = req;

  if (!cookies?.jwt) return res.sendStatus(204); // No content

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

  return res.json({ message: 'Cookie cleared' });
};

module.exports = {
  login,
  refresh,
  logout,
  createNewUser,
};
