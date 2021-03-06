'user strict';

// db setting / connect to DB -> and connection Test
const connection = require('../models/database');
const axios = require('axios');
const appConfig = require('dotenv').config(); // env config ------

// call back 지옥 탈출을 위한 추가 db모듈 
const pool = require('../models/database2');

// Object constructor ~ DTO
const UserPayment = require('../models/UserPaymentsDTO');
const bcrypt = require('bcrypt'); // hashing the password
const saltRounds = 10;

// casting Date to yyyymmdd
Date.prototype.yyyymmdd = function () {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
    ].join('');
};

// Check every empty condtion
const isAllEmpty = (value) => {
    if (value == "" || value == null || value == undefined ||
        (value != null && typeof value == "object" && !Object.keys(value).length)) return true;
    else return false;
};

// 오늘 날짜 + 시간 + 난수 기반으로 만드는 랜덤 Tuno value
const randomIsTuno = (date) => {
    const time = (new Date).getTime();
    return date + String(time);
}

//////////////////////////////////////////////////// make payments Task's methods
// result는 callback함수임 

// Get all payment for user_id
UserPayment.getAllPayments = async function (userId, result) {
    connection.query("Select * from user_payments WHERE user_id = ?", [userId], function (err, res) {
        if (err) {
            console.log("getAllHistory service error: ", err);
            result(null, err);
        }
        else {
            // console.log('User : ', res);
            result(null, res);
        }
    });
};


// Get all payment for user_id and Between start date and end date
UserPayment.getAllPaymentsByMonth = async function (userId, month, result) {
    // Select * From user_payments WHERE MONTH(Trdd) LIKE '11' AND user_id = 'qlgks1@naver.com';
    connection.query("Select * From user_payments WHERE MONTH(Trdd) LIKE ? AND user_id = ?", [month, userId], function (err, res) {
        if (err) {
            console.log("getAllHistory service error: ", err);
            result(null, err);
        }
        else {
            // console.log('User : ', res);
            result(null, res);
        }
    });
};


// Create a userPayment (Real data for user)
UserPayment.creatUserPayment = async function (newUserPayment, result) {
    try {
        connection.query("INSERT INTO user_payments set ?", newUserPayment, function (err, res) {
            if (err) result(err, null);
            else result(null, res);
        });
    } catch (error) {
        console.log(`userServeice creatUser Error: ${error}`);
        throw new Error(`userServeice creatUser Error: ${error}`);
    }
};

// Get Sum of user's all payment [ Usam 필드 합계 ]
UserPayment.getSumOfAllPayments = async function (userId, result) {
    connection.query("Select sum(Usam) as'sum' from user_payments WHERE user_id = ?", [userId], function (err, res) {
        if (err) {
            console.log("getAllHistory service error: ", err);
            result(null, err);
        }
        else result(null, res);
    });
};

// Get Sum of user's all payment [ Usam 필드 합계 ]
UserPayment.getCountOfAllPaymentsCategory = async function (category, userId, result) {
    const castingToString = ["", "식품", "의류", "교육", "교통", "생활"];
    connection.query("Select sum(Usam) as 'sum' from user_payments WHERE (category = ? OR category = ?) AND user_id = ?", [category, castingToString[category], userId], function (err, res) {
        if (err) {
            console.log("getAllHistory service error: ", err);
            result(null, err);
        }
        else result(null, res);
    });
};

//////////////////////////////////////////////////// make history Task's methods

// Create a userPaymnet history. [ await 를 이용하기! ]
// Row which category was choosed by user will be removed!
UserPayment.creatUserCardPayHistory = async function (userId, cardId, newUserPaymentArr, result) {
    try {
        const connection = await pool.getConnection(async conn => conn);
        let insertIdCounter = 0;
        for (let i = 0; i < newUserPaymentArr.length; i++) {
            newUserPaymentArr[i]['user_id'] = userId;
            newUserPaymentArr[i]['card_id'] = cardId;
            let userPayment = new UserPayment(newUserPaymentArr[i]);
            const result = await connection.query("INSERT INTO user_payment_history set ?", userPayment);
            if (!result[0].insertId) throw new Error(`UserPaymentServeice user_payment_history Error`);
            else insertIdCounter++;
        } // for 
        result(null, insertIdCounter);
    } catch (error) {
        console.log(`UserPaymentServeice user_payment_history Error: ${error}`);
        throw new Error(`UserPaymentServeice user_payment_history Error: ${error}`);
    }
};


// Get all payment history for user_id
UserPayment.getAllHistory = async function (userId, result) {
    connection.query("Select * from user_payment_history WHERE user_id = ?", [userId], function (err, res) {
        if (err) {
            console.log("getAllHistory service error: ", err);
            result(null, err);
        }
        else {
            // console.log('User : ', res);
            result(null, res);
        }
    });
};

// UserPayment find - paymentHistory data By id
UserPayment.findHistoryById = async function (id) {
    const connection = await pool.getConnection(async conn => conn);
    try {
        const [rows] = await connection.query("Select * from user_payment_history WHERE id = ?", [id]);
        if (isAllEmpty(rows)) return false;
        else return rows[0];
    } catch (error) {
        console.log(`userServeice findByFinCard Error: ${error}`);
        throw new Error(`userServeice findByFinCard Error: ${error}`);
    }
};

// UserPayment remove - paymentHistory data By id
UserPayment.removeHistoryById = async function (id) {
    const connection = await pool.getConnection(async conn => conn);
    try {
        const result = await connection.query("DELETE FROM user_payment_history WHERE id = ?", [id]);
        if (isAllEmpty(result)) return false;
        else return result;
    } catch (error) {
        console.log(`userServeice findByFinCard Error: ${error}`);
        throw new Error(`userServeice findByFinCard Error: ${error}`);
    }
};


module.exports = UserPayment;