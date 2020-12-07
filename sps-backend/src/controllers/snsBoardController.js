'use strict';

const SnsBoard = require('../services/snsBoardService');
const jwt = require('jsonwebtoken'); // User Login JWT Create
const colors = require('colors'); // for log color :) -> success "colors.bgGreen.black"


// User Create A Board
const creatBoard = async (req, res) => {
    try {
        const { userId, userName, userBirth } = jwt.decode(req.cookies['user-login']);

        let reqInfo = {
            // id: req.body.id,
            user_id: userId,
            title: req.body.title,
            content: req.body.content,
            great: 0,
            disgreat: 0,
            tags: req.body.tags
        };
        const newSnsBoard = new SnsBoard(reqInfo);
        await SnsBoard.creatBoard(newSnsBoard, function (err, result) {
            if (err) {
                console.log('snsBoardController - creatBoard Error: ', err);
                throw new Error(`snsBoardController - creatBoard Error: ${err}`);
            }
            return res.status(201).json(result);
        });
    }
    catch (error) {
        console.log(`snsBoardController creatBoard: ${error}`);
        return res.status(404).json({
            position: "snsBoardController creatBoard",
            message: error.message
        });
    }
};


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
// const updateById = async (req, res) => {

//     const updatedBoard = new snsBoard(req.body, true);
//     try {
//         await SnsBoard.updateById(updatedBoard, function (err, result) {
//             if (err) {
//                 console.log('snsBoardController - updateById Error: ', err);
//                 throw new Error(`snsBoardController - updateById Error: ${err}`);
//             }
//             return res.status(201).send(result);
//         });
//     }
//     catch (error) {
//         console.log(`snsBoardController updateById: ${error}`);
//         return res.status(404).json({
//             position: "snsBoardController updateById",
//             message: error.message
//         });
//     }
// };

// Update A Board's Great by target Id
const updateBoardGreat = async (req, res) => { // user id , board id 필요함 
    /*
    1. target 글을 누르면 sns_board_likes의 user id find(Select) 확인
    2. 없으면 target board id를 sns_board 에서 update ( +1 ) [ 사실 +1을 위해 find -> updat 2번의 쿼리 필요 ]
    3. 있으면 target board id를 sns_board 에서 update ( -1 ) [ 사실 -1을 위해 find -> updat 2번의 쿼리 필요 ]
    3. (1, 2모두 성공시) front에서 Get target board’s 따봉 개수 받아오고
    4. 결과값으로 바뀐 부분 re render (변경 ㅇㅇ)
    */
    try {
        const { userId, userName, userBirth } = jwt.decode(req.cookies['user-login']);
        const { id } = req.body;
        const isGreat = await SnsBoard.findUserLike(userId);
        const targetBoard = await SnsBoard.findById(id); // target Board Infomation

        // Cant Find target Board Id
        if (!targetBoard) return res.status(400).json({
            position: "snsBoardController updateBoardGreat 'Cant Find target Board Id'",
            message: error.message
        });
        else {
            let greatNow = 0;
            if (isGreat) greatNow = Number(targetBoard['great']) - 1; // disgreat 과정
            else greatNow = Number(targetBoard['great']) + 1; // Great 과정

            await SnsBoard.updateById(greatNow, id, (err, result) => {
                if (err) {
                    console.log('snsBoardController - updateBoardGreat Error: ', err);
                    throw new Error(`snsBoardController - updateBoardGreat Error: ${err}`);
                }
                return res.status(201).send(result);
            });
        }
    } catch (error) {
        console.log(`snsBoardController updateBoardGreat: ${error}`);
        return res.status(404).json({
            position: "snsBoardController updateBoardGreat",
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
};


module.exports = {
    creatBoard,
    updateBoardGreat,
    getAllBoardByUserId,
    getAllBoards,
    // updateById,
    removeById
};