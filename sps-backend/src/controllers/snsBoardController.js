'use strict';

const SnsBoard = require('../services/snsBoardService');
const jwt = require('jsonwebtoken'); // User Login JWT Create
const colors = require('colors'); // for log color :) -> success "colors.bgGreen.black"

// Get A Board by user id
const getAllBoardByUserId = async (req, res) => {
    try {
        // req.body (id value) 값에 대한 값 보증 필요 and Vaildatation
        if (!req.body.userId) return res.status(400).send({ error: true, message: 'Please provide Board userId' });

        await SnsBoard.getAllBoardByUserId(req.body.userId, function (err, board) {
            console.log('snsBoardController - getAllBoardByUserId');
            if (err) {
                console.log('snsBoardController - getAllBoardByUserId Error: ', err);
                throw new Error(`snsBoardController - getAllBoardByUserId Error: ${err}`);
            }
            return res.status(200).json(board)
        });
    }
    catch (error) {
        console.log(`snsBoardController getAllBoardByUserId: ${error}`);
        return res.status(404).json({
            position: "snsBoardController getAllBoardByUserId",
            message: error.message
        });
    }
};

// Get All Boards
const getAllBoards = async (req, res) => { 
    try {
        await SnsBoard.getAllBoards(function (err, boards) {
            console.log('snsBoardController - getAllBoards');
            if (err) {
                console.log('snsBoardController - getAllBoards Error: ', err);
                throw new Error(`snsBoardController - getAllBoards Error: ${err}`);
            }
            return res.status(200).json({ boards })
        });
    }
    catch (error) {
        console.log(`snsBoardController getAllBoards: ${error}`);
        return res.status(404).json({
            position: "snsBoardController getAllBoards",
            message: error.message
        });
    }
};

// Update A Board by Id
const updateById = async (req, res) => { 

    const updatedBoard = new snsBoard(req.body, true);
    try {
        await SnsBoard.updateById(updatedBoard, function (err, result) {
            if (err) {
                console.log('snsBoardController - updateById Error: ', err);
                throw new Error(`snsBoardController - updateById Error: ${err}`);
            }
            return res.status(201).send(result);
        });
    }
    catch (error) {
        console.log(`snsBoardController updateById: ${error}`);
        return res.status(404).json({
            position: "snsBoardController updateById",
            message: error.message
        });
    }
};

// Remove A Board By Id
const removeById = async (req, res) => { 
    try {
        await SnsBoard.removeById(req.body.id, function (err, result) {
            if (err) {
                console.log('snsBoardController - removeById Error: ', err);
                throw new Error(`snsBoardController - removeById Error: ${err}`);
            }
            return res.status(201).send(result);
        });
    }
    catch (error) {
        console.log(`snsBoardController removeById: ${error}`);
        return res.status(404).json({
            position: "snsBoardController removeById",
            message: error.message
        });
    }
}

module.exports = {
    getAllBoardByUserId,
    getAllBoards,
    updateById,
    removeById
};