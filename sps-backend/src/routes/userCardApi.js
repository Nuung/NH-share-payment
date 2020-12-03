'use strict';
const authMiddleware = require('../middlewares/auth'); // JTW 유효성 검사 
const { validateUserCard } = require('../middlewares/validators/userCardValidator');
const { validateUserCardPay } = require('../middlewares/validators/userCardPayValidator');

module.exports = (app) => {
  const user_card_api = require('../controllers/userCardController.js');


  // user restful CRUD API 
  app.use('/user/card', authMiddleware);
  app.route('/user/card')
    .post(validateUserCard, user_card_api.creatUserCard);

  app.use('/user/card/approve', authMiddleware);
  app.route('/user/card/approve')
    .post(validateUserCardPay, user_card_api.creatUserCardPayHistory);

  //   .post(user_card_api.creatUser)
  //   .put(user_card_api.updateById)
  //   .delete(user_card_api.removeById);

  // get a user info and Login
  // app.route('/user/id').post(user_api.getAUser);
  // app.route('/user/login').post(user_api.logInUser);
  // Auth
  // app.use('/user/check', authMiddleware);
  // app.route('/user/check').get(user_api.userCheck);
};