'use strict';
const authMiddleware = require('../middlewares/auth'); // JTW 유효성 검사 
const { validateSnsBoardCreate } = require('../middlewares/validators/snsBoardValidator');

module.exports = (app) => {
  const sns_board_api = require('../controllers/snsBoardController.js');

  app.use('/snsboard', authMiddleware);
  app.route('/snsboard')
    .get(sns_board_api.getAllBoardByUserId);

  app.use('/snsboards', authMiddleware);
  app.route('/snsboards')
    .get(sns_board_api.getAllBoards)
    .post(validateSnsBoardCreate, sns_board_api.creatBoard); // create sns board 

};