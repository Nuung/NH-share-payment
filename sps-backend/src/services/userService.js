'user strict';

const { get } = require('../../app');
// db setting / connect to DB -> and connection Test
const connection = require('../models/database');

// Object constructor ~ DTO
const User = require('../models/UsersDTO');


//////////////////////////////////////////////////// make Task's methods

// result는 callback함수의 결과임 

User.getAUser = async function (id, result) {
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

User.getAllUser = async function (result) {
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


User.creatUser = async function (newUser, result) {
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

User.updateById = function (updateUser, result) {
    // parsing (ES6 문법)
    const {
        id,
        password,
        name,
        birthday,
        gender,
        login_type,
        fin_account,
        updated_at
    } = updateUser;

    const sql = "UPDATE users SET `password` = ?, `name` = ?, `birthday` = ?, `gender` = ?, `login_type` = ?, `fin_account` = ?, `updated_at` = ? WHERE id = ?"
    connection.query(sql, [password, name, birthday, gender, login_type, fin_account, updated_at, id],
        function (err, res) {
            if (err) {
                console.log("updateByid service error: ", err);
                result(null, err);
                // console.log(res);
            }
            else {
                // console.log(res);
                result(null, res);
            }
        }
    );
};

User.removeById = function (id, result) {
    connection.query("DELETE FROM users WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};


module.exports = User;