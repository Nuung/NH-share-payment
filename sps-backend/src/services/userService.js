'user strict';

// db setting / connect to DB -> and connection Test
const connection = require('../models/database');

// call back 지옥 탈출을 위한 추가 db모듈 
const pool = require('../models/database2');

// Object constructor ~ DTO
const User = require('../models/UsersDTO');
const bcrypt = require('bcrypt'); // hashing the password
const saltRounds = 10;


// Check every empty condtion
const isAllEmpty = (value) => {
    if (value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)) {
        return true;
    } else {
        return false;
    }
};

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

// User check the Password by bcrypt -> not a async!
User.verifyPassword = function (user, password) {
    try { // 지금 들어온 input password를 hashing된 DB 값과 비교해봐야함 
        return (bcrypt.compareSync(password, user.password));
    } catch (error) {
        console.log(`userServeice verify Error: ${error}`);
        throw new Error(`userServeice verify Error: ${error}`);
    }
};


// User find By id for ID 중복 Check
User.findById = async function (id) {
    const connection = await pool.getConnection(async conn => conn);
    try {
        const [rows] = await connection.query("Select * from users WHERE id = ?", [id]);
        if (isAllEmpty(rows)) return false;
        else return rows[0];
    } catch (error) {
        console.log(`userServeice findById Error: ${error}`);
        throw new Error(`userServeice findById Error: ${error}`);
    }
};

// Get A user Information
User.getAUser = async function (id, result) {
    connection.query("Select * from users WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("getAUser service error: ", err);
            result(null, err);
        }
        else {
            console.log('User : ', res[0]);
            result(null, res[0]);
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
        family,
        budget,
        updated_at
    } = updateUser;

    const sql = "UPDATE users SET `password` = ?, `name` = ?, `birthday` = ?, `gender` = ?, `login_type` = ?, `fin_account` = ?, `family` = ?, `budget` = ?, `updated_at` = ? WHERE id = ?"
    connection.query(sql, [password, name, birthday, gender, login_type, fin_account, family, budget, updated_at, id],
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