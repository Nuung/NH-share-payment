'use strict';
const authMiddleware = require('../middlewares/auth'); // JTW 유효성 검사 
const { validateSnsCommentCreate, validateSnsCommentUpdate, validateSnsCommentDelete } = require('../middlewares/validators/snsCommentValidator');

module.exports = (app) => {
  const sns_commnet_api = require('../controllers/snsCommentController.js');

  // Full CRUD for comment
  app.use('/snsboard/comments', authMiddleware);
  app.route('/snsboard/comments')
    .get(sns_commnet_api.getAllCommentsByUserId) // user id 에 해당하는 comment 다 가져오기 (쿠키 이용)
    .post(validateSnsCommentCreate, sns_commnet_api.creatComment) // create sns board 
    .put(validateSnsCommentUpdate, sns_commnet_api.updateById) // update target sns board's comment (but not needed board id)
    .delete(validateSnsCommentDelete, sns_commnet_api.removeById);

  app.use('/snsboard/comment/:boardId', authMiddleware);
  app.route('/snsboard/comment/:boardId')
    .get(sns_commnet_api.getAllCommentsByBoardId);
};