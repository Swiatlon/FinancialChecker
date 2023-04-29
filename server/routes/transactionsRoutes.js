const express = require('express');
const transactionController = require('../controllers/transactionController');
const verifyJWT = require('../middleware/verifyJWT');

const router = express.Router();
router.use(verifyJWT);

router
  .route('/transaction')
  .get(transactionController.getAllUserTransactions)
  .post(transactionController.addNewTransaction)
  .delete(transactionController.deleteAllUserTransactions);

module.exports = router;
