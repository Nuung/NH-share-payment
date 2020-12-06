'use strict';
const authMiddleware = require('../middlewares/auth'); // JTW 유효성 검사 
const { validateSnsBoardCreate } = require('../middlewares/validators/userPaymentValidator');

module.exports = (app) => {
  const sns_board_api = require('../controllers/userPaymentController.js');

  app.use('/snsboards', authMiddleware);
  app.route('/snsboards')
    .get(validateSnsBoardCreate, sns_board_api.getAllBoards);

};