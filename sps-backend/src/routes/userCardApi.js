'use strict';
const authMiddleware = require('../middlewares/auth'); // JTW 유효성 검사 

module.exports = (app) => {
  const user_card_api = require('../controllers/userCardController.js');

  // user restful CRUD API 
  app.route('/user/card')
    .get(user_card_api.getAllUser)
    .post(user_card_api.creatUser)
    .put(user_card_api.updateById)
    .delete(user_card_api.removeById);

  // get a user info and Login
  // app.route('/user/id').post(user_api.getAUser);
  // app.route('/user/login').post(user_api.logInUser);
  // Auth
  // app.use('/user/check', authMiddleware);
  // app.route('/user/check').get(user_api.userCheck);
};