'use strict';

const UserPayment = require('../services/userPaymentService');
const jwt = require('jsonwebtoken'); // User Login JWT Create
const { response } = require('express');
const colors = require('colors'); // for log color :) -> success "colors.bgGreen.black"

// 매번 API 호출하는 건 부담임, get payment history를 통해 생성된 payment history들 불러와야함
const getAllPayHistory = async (req, res) => {
    try {
        // const { userId, userName, userBirth } = jwt.decode(headers['x-access-token']);
        const { userId, userName, userBirth } = jwt.decode(req.cookies['user-login']);

        await UserPayment.getAllHistory(userId, function (err, userPaymentHistory) {
            console.log(colors.bgGreen.black('userPaymentController - getAllHistory Successfully'));
            if (err) {
                if (err) throw new Error(`userPaymentController getAllPayHistory Error: ${err}`);
            }
            else return res.status(200).json({ userPaymentHistory });
        });
    }
    catch (error) {
        console.log(`userPaymentController getAllPayHistory: ${error}`);
        return res.status(404).json({
            position: "userPaymentController getAllPayHistory",
            message: error.message
        });
    }
};

// MayBe for making a Graph about target user
const getAllPayments = async (req, res) => {
    try {
        // const { userId, userName, userBirth } = jwt.decode(headers['x-access-token']);
        const { userId, userName, userBirth } = jwt.decode(req.cookies['user-login']);

        await UserPayment.getAllPayments(userId, function (err, userPayment) {
            console.log(colors.bgGreen.black('userPaymentController - getAllPayments Successfully'));
            if (err) throw new Error(`userPaymentController getAllPayments Error: ${err}`);
            else return res.status(200).json({ userPayment });
        });
    }
    catch (error) {
        console.log(`userPaymentController getAllPayments: ${error}`);
        return res.status(404).json({
            position: "userPaymentController getAllPayments",
            message: error.message
        });
    }
};


// Get all user's payment between "start and end"
const getAllPaymentsByMonth = async (req, res) => {
    const msgLog = "userPaymentController - getAllPaymentsByMonth";
    try {
        const { userId, userName, userBirth } = jwt.decode(req.cookies['user-login']);
        const { month } = req.body;

        await UserPayment.getAllPaymentsByMonth(userId, month, function (err, userPayment) {
            if (err) {
                console.log(colors.bgGreen.black(`${msgLog}: ${err}`));
                throw new Error(`${msgLog} Error: ${err}`);
            }
            else return res.status(200).json({ userPayment });
        });
    }
    catch (error) {
        console.log(colors.bgGreen.black(`${msgLog}: ${err}`));
        return res.status(404).json({
            position: msgLog,
            message: error.message
        });
    }
};


// Target User id's sum of total payments [ Usam 필드 합계 ]
const getSumOfAllPayments = async (req, res) => {
    const msgLog = "userPaymentController - getSumOfAllPayments";
    try {
        const { userId, userName, userBirth } = jwt.decode(req.cookies['user-login']);

        await UserPayment.getSumOfAllPayments(userId, function (err, sum) {
            console.log(colors.bgGreen.black(`${msgLog} Successfully`));
            if (err) throw new Error(`${msgLog} Error: ${err}`);
            else {
                const resultSum = { sum };
                return res.status(200).json(resultSum['sum'][0]['sum']);
            }
        });
    }
    catch (error) {
        console.log(`${msgLog}: ${error}`);
        return res.status(404).json({
            position: msgLog,
            message: error.message
        });
    }
}

// Target User id's sum of total payments [ Usam 필드 합계 ]
const getCountOfAllPaymentsCategory = async (req, res) => {
    const msgLog = "userPaymentController - getCountOfAllPaymentsCategory";
    try {
        const { userId, userName, userBirth } = jwt.decode(req.cookies['user-login']);
        const { category } = req.body;
        await UserPayment.getCountOfAllPaymentsCategory(category, userId, function (err, count) {
            console.log(colors.bgGreen.black(`${msgLog} Successfully`));
            if (err) throw new Error(`${msgLog} Error: ${err}`);
            else {
                const resultCount = { count };
                return res.status(200).json(resultCount['count'][0]['count']);
            }
        });
    }
    catch (error) {
        console.log(`${msgLog}: ${error}`);
        return res.status(404).json({
            position: msgLog,
            message: error.message
        });
    }
}

// History Tab에서 user가 특정 놈 눌러서 category 선택하면 일어날 인터렉션
// target id 찾아 그 내용 기반으로 payment 로 옮기고 => 모두 완료되면 그때 remove 실행
const updatePayHistory = async (req, res) => {
    try {
        const { id, category } = req.body;
        // const { userId, userName, userBirth } = jwt.decode(headers['x-access-token']);
        const { userId, userName, userBirth } = jwt.decode(req.cookies['user-login']);

        let targetPayHistory = await UserPayment.findHistoryById(id);
        if (!targetPayHistory) {
            return res.status(400).json({
                position: "userPaymentController updatePayHistory",
                message: '찾을 수 없는 id 값 입니다.'
            });
        }
        else {
            // Main 
            targetPayHistory['id'] = Number(id) + Number(139798); // 얘를 고유하게 바꿔주는게 좋다! 
            targetPayHistory['category'] = category // category value input for real payment DB
            let newUserPayment = new UserPayment(targetPayHistory, false); // not a history

            await UserPayment.creatUserPayment(newUserPayment, function (err, userPayment) {
                // console.log('userPaymentController - creatUserPayment in updatePayHistory');
                if (err) throw new Error(`userPaymentController creatUserPayment Error: ${err}`);
                else {
                    console.log(userPayment);
                    UserPayment.removeHistoryById(id, function (err, result) {
                        if (err) throw new Error(`userPaymentController removeHistoryById Error: ${err}`);
                        console.log(colors.bgGreen.black("userPaymentController removeHistoryById and Update payment Success!!"));
                        return res.status(201).json({ result });
                    });
                }
            });
        }

        // end of await, 아래 영역 진입! 
        console.log('\u001b[1m', "End of userPaymentController updatePayHistory API");
    }
    catch (error) {
        console.log(colors.bold.bgRed.yellow(`userPaymentController updatePayHistory: ${error}`));
        return res.status(404).json({
            position: "userPaymentController updatePayHistory",
            message: error.message
        });
    }
};

// delete target pay history row
const removeHistoryById = async (req, res) => {
    const msgLog = "userPaymentController - removeHistoryById";
    try {
        const { id } = req.body;
        // const { userId, userName, userBirth } = jwt.decode(headers['x-access-token']);
        // const { userId, userName, userBirth } = jwt.decode(req.cookies['user-login']);

        await UserPayment.removeHistoryById(id, function (err, result) {
            if (err) {
                console.log(colors.bgGreen.black(`${msgLog}: ${err}`));
                throw new Error(`${msgLog} Error: ${err}`);
            }
            else return res.status(201).json({ result });
        });
    }
    catch (error) {
        console.log(colors.bold.bgRed.yellow(`${msgLog}: ${error}`));
        return res.status(404).json({
            position: msgLog,
            message: error.message
        });
    }
};


module.exports = {
    getAllPayments,
    getAllPaymentsByMonth,
    getAllPayHistory,
    getSumOfAllPayments,
    getCountOfAllPaymentsCategory,
    updatePayHistory,
    removeHistoryById
};