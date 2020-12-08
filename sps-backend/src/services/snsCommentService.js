'user strict';

// db setting / connect to DB -> and connection Test
const connection = require('../models/database');
const axios = require('axios');
const appConfig = require('dotenv').config(); // env config ------

// call back 지옥 탈출을 위한 추가 db모듈 
const pool = require('../models/database2');

// Object constructor ~ DTO
const SnsComment = require('../models/SnsCommentsDTO');
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


//////////////////////////////////////////////////// make sns_board_comments Task's methods

// Create a sns_board_comments
SnsComment.creatComment = async function (newSnsComment, result) {
    try {
        connection.query("INSERT INTO sns_board_comments set ?", newSnsComment, function (err, res) {
            if (err) {
                console.log("creatComment service error: ", err);
                result(err, null);
            }
            else result(null, res);
        });
    } catch (error) {
        console.log(`snsCommentServeice creatComment Error: ${error}`);
        throw new Error(`snsCommentServeice creatComment Error: ${error}`);
    }
};

// Get all sns_board_comments for user_id
SnsComment.getAllCommentsByUserId = async function (userId, result) {
    connection.query("Select * from sns_board_comments WHERE user_id = ?", [userId], function (err, res) {
        if (err) {
            console.log("sns_board_comments service error: ", err);
            result(null, err);
        }
        else result(null, res);
    });
};

// Get all sns_board_comments for user_id
SnsComment.getAllCommentsByBoardId = async function (boardId, result) {
    connection.query("Select * from sns_board_comments WHERE board_id = ?", [boardId], function (err, res) {
        if (err) {
            console.log("sns_board_comments service error: ", err);
            result(null, err);
        }
        else result(null, res);
    });
};

// Update Target Comment's information
SnsComment.updateById = async function (id, content, result) {
    const sql = "UPDATE sns_board_comments SET `content` = ? WHERE id = ?";
    connection.query(sql, [content, id],
        function (err, res) {
            if (err) {
                console.log("updateById service error: ", err);
                result(null, `snsCommentService updateById Error: ${err}`);
            }
            else result(null, res);
        }
    );
};

// Remove Target Comment's
SnsComment.removeById = async function (id, result) {
    connection.query("DELETE FROM sns_board_comments WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("removeById service error: ", err);
            result(null, `snsCommentService removeById Error: ${err}`);
        }
        else result(null, res);
    });
};


module.exports = SnsComment;