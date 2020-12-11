'use strict';

const SnsComment = require('../services/snsCommentService');
const jwt = require('jsonwebtoken'); // User Login JWT Create
const colors = require('colors'); // for log color :) -> success "colors.bgGreen.black"
// console.log(colors.bgGreen.black('userPaymentController - getAllPayments Successfully'));

// Create A Comment
const creatComment = async (req, res) => {
    const msgLog = "snsCommentController - creatComment";
    try {
        const { userId, userName, userBirth } = jwt.decode(req.cookies['user-login']); 
        let reqInfo = {
            // id: auto increse,
            user_id: userId,
            board_id: req.body.board_id,
            content: req.body.content,
        };
        const newSnsComment = new SnsComment(reqInfo);
        await SnsComment.creatComment(newSnsComment, function (err, result) {
            if (err) {
                console.log(colors.bgGreen.black(`${msgLog}: ${err}`));
                throw new Error(`${msgLog} Error: ${err}`);
            }
            return res.status(201).json(result);
        });
    }
    catch (error) {
        console.log(`${msgLog}: ${error}`);
        return res.status(404).json({
            position: msgLog,
            message: error.message
        });
    }
};


// Get All Comments by user_id
const getAllCommentsByUserId = async (req, res) => {
    const msgLog = "snsCommentController - getAllCommentsByUserId";
    try {
        const { userId, userName, userBirth } = jwt.decode(req.cookies['user-login']);

        await SnsComment.getAllCommentsByUserId(userId, function (err, comments) {
            if (err) {
                console.log(`${msgLog}: ${err}`);
                throw new Error(`${msgLog}: ${err}`);
            }
            return res.status(200).json(comments)
        });
    }
    catch (error) {
        console.log(`${msgLog}: ${error}`);
        return res.status(404).json({
            position: msgLog,
            message: error.message
        });
    }
};

// Get All Comments by board_id
const getAllCommentsByBoardId = async (req, res) => {
    const msgLog = "snsCommentController - getAllCommentsByBoardId";
    try {
        const { boardId } = req.params;
        await SnsComment.getAllCommentsByBoardId(boardId, function (err, comments) {
            // console.log(msgLog);
            if (err) {
                console.log(`${msgLog}: ${err}`);
                throw new Error(`${msgLog}: ${err}`);
            }
            return res.status(200).json(comments)
        });
    }
    catch (error) {
        console.log(`${msgLog}: ${error}`);
        return res.status(404).json({
            position: msgLog,
            message: error.message
        });
    }
};

// Update A Comment by Id
const updateById = async (req, res) => {
    const msgLog = "snsCommentController - updateById";
    try {
        const { id, content } = req.body; // get comment's id and want to fix content
        await SnsComment.updateById(id, content, function (err, result) {
            if (err) {
                console.log(`${msgLog}: ${err}`);
                throw new Error(`${msgLog}: ${err}`);
            }
            return res.status(201).send(result);
        });
    }
    catch (error) {
        console.log(`${msgLog}: ${error}`);
        return res.status(404).json({
            position: msgLog,
            message: error.message
        });
    }
};

// Remove A Comment by Id
const removeById = async (req, res) => {
    const msgLog = "snsCommentController - removeById";
    try {
        await SnsComment.removeById(req.body.id, function (err, result) {
            if (err) {
                console.log(`${msgLog}: ${err}`);
                throw new Error(`${msgLog}: ${err}`);
            }
            return res.status(201).send(result);
        });
    }
    catch (error) {
        console.log(`${msgLog}: ${error}`);
        return res.status(404).json({
            position: msgLog,
            message: error.message
        });
    }
};

module.exports = {
    creatComment,
    getAllCommentsByUserId,
    getAllCommentsByBoardId,
    updateById,
    removeById
};