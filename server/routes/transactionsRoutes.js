const express = require('express');
const transactionController = require('../controllers/transactionController');

const router = express.Router();

router
  .route('/transaction')
  .get(transactionController.getAllUserTransactions)
  .post(transactionController.addNewTransaction)
  .delete(transactionController.deleteAllUserTransactions);

module.exports = router;
