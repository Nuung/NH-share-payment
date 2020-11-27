'use strict';

module.exports = (app) => {
  const user_api = require('../controllers/userController.js');

  // todoList Routes
  app.route('/users')
    .get(user_api.getAllUser)
    .post(user_api.creatUser);

  app.route('/users/:id')
    .get(user_api.getAUser);

  /*
  app.route('/customers/list/:id') // id is primary key
    .get(customer_api.read_a_customer)
    .delete(customer_api.delete_a_customer);
  */
};