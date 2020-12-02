'use strict';

module.exports = (app) => {
  const user_api = require('../controllers/userController.js');

  // user restful CRUD API 
  app.route('/users')
    .get(user_api.getAllUser)
    .post(user_api.creatUser)
    .put(user_api.updateById)
    .delete(user_api.removeById);

  app.route('/users/id')
    .post(user_api.getAUser);

  /*
  app.route('/customers/list/:id') // id is primary key
    .get(customer_api.read_a_customer)
    .delete(customer_api.delete_a_customer);
  */
};