const express = require('express');
const userController = require('../controllers/userController');
const verifyJWT = require('../middleware/verifyJWT.JS');

const router = express.Router();
router.use(verifyJWT);

router
  .route('/user')
  .get(userController.getUser)
  .post(userController.createNewUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
