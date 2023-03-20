const router = require('./root');
const walletsController = require('../controllers/walletsController');

router.route('/wallets').get(walletsController.getAllWallets);

module.exports = router;
