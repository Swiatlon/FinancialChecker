const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router
  .route('/user')
  .get(userController.getUser)
  .post(userController.createNewUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
