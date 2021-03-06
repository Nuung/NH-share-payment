'use strict';
const authMiddleware = require('../middlewares/auth'); // JTW 유효성 검사 
const { validateUserCreate, validateUserLogin } = require('../middlewares/validators/userValidator');

module.exports = (app) => {
  const user_api = require('../controllers/userController.js');

  // user restful CRUD API 
  app.route('/users')
    .get(user_api.getAllUser)
    .put(user_api.updateById)
    .delete(user_api.removeById);

  // get a user info and Login
  app.route('/user').post(validateUserCreate, user_api.creatUser)
  app.route('/user/id').post(user_api.getAUser);
  app.route('/user/login').post(validateUserLogin, user_api.logInUser);

  /////////////////////////////////////////////
  // Auth Test
  app.use('/user/check', authMiddleware);
  app.route('/user/check')
    .get(user_api.userCheck)
    .post(user_api.getAUserByAuth);
};