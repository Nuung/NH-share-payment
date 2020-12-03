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

//////////////////////////////////////////////////// make Task's methods
// result는 callback함수임 

// Create a userPaymnet history. [ await 를 이용하기! ]
// Row which category was choosed by user will be removed!
UserPayment.creatUserCardPayHistory = async function (userId, cardId, newUserPaymentArr, result) {
    try {
        const connection = await pool.getConnection(async conn => conn);
        let insertIdCounter = 0;
        for (let i = 0; i < newUserPaymentArr.length; i++) {
            let userPayment = new UserPayment(userId, cardId, newUserPaymentArr[i]);
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


// Create a userPayment (Real data for user)
UserPayment.creatUserPayment = async function (newUserPayment, result) {
    try {
        connection.query("INSERT INTO user_payments set ?", newUserPayment, function (err, res) {
            if (err) {
                console.log("creatUser service error: ", err);
                result(err, null);
            }
            else {
                // console.log("inputed Id:" + res.insertId);
                result(null, newUserPayment);
            }
        });
    } catch (error) {
        console.log(`userServeice creatUser Error: ${error}`);
        throw new Error(`userServeice creatUser Error: ${error}`);
    }
};

module.exports = UserPayment;