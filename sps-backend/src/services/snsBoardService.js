'user strict';

// db setting / connect to DB -> and connection Test
const connection = require('../models/database');
const axios = require('axios');
const appConfig = require('dotenv').config(); // env config ------

// call back 지옥 탈출을 위한 추가 db모듈 
const pool = require('../models/database2');

// Object constructor ~ DTO
const SnsBoard = require('../models/SnsBoardsDTO');
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

//////////////////////////////////////////////////// make sns_board_likes Task's methods

// Find by user_id in sns_board_likes table! 
SnsBoard.findUserLike = async function (user_id) {
    const connection = await pool.getConnection(async conn => conn);
    try {
        const [rows] = await connection.query("Select * from sns_board_likes WHERE user_id = ?", [user_id]);
        if (isAllEmpty(rows)) return false;
        else return true;
    } catch (error) {
        console.log(`snsBoardServeice findUserLike Error: ${error}`);
        throw new Error(`snsBoardServeice findUserLike Error: ${error}`);
    }
};

//////////////////////////////////////////////////// make sns_boards Task's methods

// Find board by id
SnsBoard.findById = async function (board_id) {
    const connection = await pool.getConnection(async conn => conn);
    try {
        const [rows] = await connection.query("Select * from sns_boards WHERE id = ?", [board_id]);
        if (isAllEmpty(rows)) return false;
        else return rows[0];
    } catch (error) {
        console.log(`snsBoardServeice findUserLike Error: ${error}`);
        throw new Error(`snsBoardServeice findUserLike Error: ${error}`);
    }
};

// Create a userPayment (Real data for user)
SnsBoard.creatBoard = async function (newUserPayment, result) {
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



// Get all sns_boards for user_id
SnsBoard.getAllBoardByUserId = async function (userId, result) {
    connection.query("Select * from sns_boards WHERE user_id = ?", [userId], function (err, res) {
        if (err) {
            console.log("getAllBoardByUserId service error: ", err);
            result(null, err);
        }
        else result(null, res);
    });
};

// Get all sns_boards
SnsBoard.getAllBoards = async function (result) {
    connection.query("Select * from sns_boards", function (err, res) {
        if (err) {
            console.log("getAllBoards service error: ", err);
            result(null, err);
        }
        else result(null, res);
    });
};

// Update Target Board's information
SnsBoard.updateGreatById = async function (greatNow, board_id, result) {
    const sql = "UPDATE sns_boards SET `great` = ? WHERE id = ?";
    connection.query(sql, [greatNow, board_id],
        function (err, res) {
            if (err) {
                console.log("updateGreatById service error: ", err);
                result(null, `snsBoardService updateGreatById Error: ${err}`);
            }
            else result(null, res);
        }
    );
};

// UserPayment remove - paymentHistory data By id
SnsBoard.removeById = async function (id, result) {
    connection.query("DELETE FROM sns_boards WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("removeById service error: ", err);
            result(null, err);
        }
        else result(null, res);
    });
};


module.exports = SnsBoard;