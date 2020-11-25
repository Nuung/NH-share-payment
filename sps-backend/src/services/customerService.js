'user strict';

// db setting / connect to DB -> and connection Test
const connection = require('../models/database');

// Object constructor ~ DTO
const Customer = require('../models/CustomerDTO');


//////////////////////////////////////////////////// make Task's methods

Customer.getAllCustomer = async function(result) {
    connection.query("Select * from customers", function (err, res) {
        if (err) {
            console.log("getAllCustomer service error: ", err);
            result(null, err);
        }
        else {
            console.log('Customer : ', res);
            result(null, res);
        }
    });
};


Customer.creatCustomer = async function(newCustomer, result) {
    connection.query("INSERT INTO customers set ?", newCustomer, function (err, res) {
        if (err) {
            console.log("creatCustomer service error: ", err);
            result(err, null);
        }
        else {
            // console.log("inputed Id:" + res.insertId);
            result(null, newCustomer);
        }
    });
};

/*
Customer.getACustomerbyName = function (name, result) {
    connection.query("Select * from customer WHERE name LIKE ?", ['%' + name + '%'], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('A Customer : ', res);
            result(null, res);
        }
    });
};

Customer.getACustomer = function (id, result) {
    connection.query("Select * from customer WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('A Customer : ', res);
            result(null, res);
        }
    });
};

// Customer.updateByid = function(id, customer, result){
//   // isEnd 는 tinyint(1) => 0, 1 값 뿐
//   connection.query("UPDATE customer SET isEnd = ? WHERE id = ?", [customer.isEnd, id], function (err, res) {
//     if(err) {
//       console.log("error: ", err);
//       result(null, err);
//     }
//     else {
//       result(null, res);
//     }
//   }); 
// };

Customer.remove = function (id, result) {
    connection.query("DELETE FROM customer WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
*/

module.exports = Customer;