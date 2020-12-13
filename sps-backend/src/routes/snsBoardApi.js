'use strict';
const authMiddleware = require('../middlewares/auth'); // JTW 유효성 검사 
const { validateSnsBoardCreate } = require('../middlewares/validators/snsBoardValidator');

module.exports = (app) => {
  const sns_board_api = require('../controllers/snsBoardController.js');

  app.use('/snsboard', authMiddleware);
  app.route('/snsboard')
    .get(sns_board_api.getAllBoardByUserId); // token 에서 userId와 일치하는 글만 가져오기 

  app.use('/snsboards', authMiddleware);
  app.route('/snsboards')
    .get(sns_board_api.getAllBoards) // 걍 다 가져오기 
    .post(validateSnsBoardCreate, sns_board_api.creatBoard); // create sns board 

  app.use('/snsboards/user', authMiddleware);
  app.route('/snsboards/user')
    .get(sns_board_api.getBoardByClusterData)
    .post(sns_board_api.getAllBoardByTargetUser); // create sns board 

  app.use('/snsboard/like', authMiddleware);
  app.route('/snsboard/like')
    .put(sns_board_api.updateBoardGreat);
};