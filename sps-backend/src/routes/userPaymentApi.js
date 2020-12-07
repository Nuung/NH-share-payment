'use strict';
const authMiddleware = require('../middlewares/auth'); // JTW 유효성 검사 
const { validateUserUpdatePayHistory } = require('../middlewares/validators/userPaymentValidator');

module.exports = (app) => {
  const user_payment_api = require('../controllers/userPaymentController.js');

  app.use('/user/payment', authMiddleware);
  app.route('/user/payment')
    .get(user_payment_api.getAllPayments);

  // userPayment restfull API 
  app.use('/user/payment/history', authMiddleware);
  app.route('/user/payment/history')
    .get(user_payment_api.getAllPayHistory);
    // .put(validateUserUpdatePayHistory, user_payment_api.updatePayHistory);

};