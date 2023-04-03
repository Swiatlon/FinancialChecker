const express = require('express');
const transactionController = require('../controllers/transactionController');

const router = express.Router();

router
  .route('/transaction')
  .get(transactionController.getAllUserTransactions)
  .post(transactionController.addNewTransaction);

module.exports = router;
