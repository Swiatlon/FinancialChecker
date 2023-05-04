require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConn');

const app = express();

const PORT = process.env.PORT || 3500;

connectDB();

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use('/wakeUp', require('./routes/wakingUpServerRoute'));

app.use('/api', require('./routes/userRoutes'));

app.use('/api', require('./routes/transactionsRoutes'));

app.use('/auth', require('./routes/authRoutes'));

app.use(errorHandler);

mongoose.connection.once('open', () => {
  app.listen(PORT, () => console.log(`Server started on PORT:${PORT}`));
});

mongoose.connection.on('error', (err) => {
  console.log(err);
});
