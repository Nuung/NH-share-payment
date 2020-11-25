'use strict';

module.exports = (app) => {
    const customer_api = require('../controllers/customerController.js');

    // todoList Routes
    app.route('/customers')
        .get(customer_api.getAllCustomer)
        .post(customer_api.creatCustomer);

    /*
    app.route('/customers/:name')
      .get(customer_api.read_a_customer_by_name);
  
    app.route('/customers/list/:id') // id is primary key
      .get(customer_api.read_a_customer)
      .delete(customer_api.delete_a_customer);
    */
};