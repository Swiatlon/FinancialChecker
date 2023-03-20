const router = require('./root');
const usersController = require('../controllers/usersController');

router
  .route('/users')
  .get(usersController.getAllUsers)
  .post(usersController.createNewUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;
