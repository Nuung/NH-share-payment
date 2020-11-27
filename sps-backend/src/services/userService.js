'user strict';

const { get } = require('../../app');
// db setting / connect to DB -> and connection Test
const connection = require('../models/database');

// Object constructor ~ DTO
const User = require('../models/UsersDTO');


//////////////////////////////////////////////////// make Task's methods

User.getAUser = async function(id, result) {
    connection.query("Select * from users WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("getAUser service error: ", err);
            result(null, err);
        }
        else {
            console.log('User : ', res);
            result(null, res);
        }
    });
};

User.getAllUser = async function(result) {
    connection.query("Select * from users", function (err, res) {
        if (err) {
            console.log("getAllUser service error: ", err);
            result(null, err);
        }
        else {
            console.log('User : ', res);
            result(null, res);
        }
    });
};


User.creatUser = async function(newUser, result) {
    connection.query("INSERT INTO users set ?", newUser, function (err, res) {
        if (err) {
            console.log("creatUser service error: ", err);
            result(err, null);
        }
        else {
            // console.log("inputed Id:" + res.insertId);
            result(null, newUser);
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

module.exports = User;