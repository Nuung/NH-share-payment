'user strict';

// db setting / connect to DB -> and connection Test
const connection = require('../models/database');

// Object constructor ~ DTO
const User = require('../models/UsersDTO');
const bcrypt = require('bcrypt'); // hashing the password
const saltRounds = 10;

//////////////////////////////////////////////////// make Task's methods
// result는 callback함수의 결과임 

// Create a user
User.creatUser = async function (newUser, result) {

    try {
        // 복호화 
        newUser.password = bcrypt.hashSync(newUser.password, saltRounds);
        // bcrypt.compareSync(newUser.password, hash); // true

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
    } catch (error) {
        console.log(`userServeice creatUser Error: ${error}`);
        throw new Error(`userServeice creatUser Error: ${error}`);
    }

};

// LogIn user
User.logIn = async function (user, result) {
    try {

    } catch (error) {

    }
}

// User find By id for ID 중복 Check
User.findById = async function (id) {
    try {
        connection.query("Select * from users WHERE id = ?", [id], function (err, res) {
            if (err) {
                console.log(`userServeice findById DB Error: ${error}`);
                throw new Error(`userServeice findById DB Error: ${error}`);
            }
            else {
                // const userId = res ? user.id : null
                // console.log(JSON.stringify(res));
                if(res) return true;
                else return false;
                // return res ? JSON.stringify(res) : null;
            }
        });
    } catch (error) {
        console.log(`userServeice findById Error: ${error}`);
        throw new Error(`userServeice findById Error: ${error}`);
    }
}

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