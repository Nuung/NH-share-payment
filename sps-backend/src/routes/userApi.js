'use strict';
const authMiddleware = require('../middlewares/auth'); // JTW 유효성 검사 
const { validateUser } = require('../middlewares/validators/userValidator');

module.exports = (app) => {
  const user_api = require('../controllers/userController.js');

  // user restful CRUD API 
  app.route('/users')
    .get(user_api.getAllUser)
    .post(validateUser, user_api.creatUser)
    .put(user_api.updateById)
    .delete(user_api.removeById);

  // get a user info and Login
  app.route('/user/id').post(user_api.getAUser);
  app.route('/user/login').post(user_api.logInUser);
  
  // Auth Test
  app.use('/user/check', authMiddleware);
  app.route('/user/check').get(user_api.userCheck);
};