'use strict';

const UserPayment = require('../services/userPaymentService');
const jwt = require('jsonwebtoken'); // User Login JWT Create
const { response } = require('express');
const colors = require('colors'); // for log color :) -> success "colors.bgGreen.black"

// 매번 API 호출하는 건 부담임, get payment history를 통해 생성된 payment history들 불러와야함
const getAllPayHistory = async (req, res) => {
    try {
        const { headers } = req;
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
}

// MayBe for making a Graph about target user
const getAllPayments = async (req, res) => {
    try {
        const { headers } = req;
        // const { userId, userName, userBirth } = jwt.decode(headers['x-access-token']);
        const { userId, userName, userBirth } = jwt.decode(req.cookies['user-login']);

        await UserPayment.getAllPayments(userId, function (err, userPayment) {
            console.log(colors.bgGreen.black('userPaymentController - getAllPayments Successfully'));
            if (err) {
                if (err) throw new Error(`userPaymentController getAllPayments Error: ${err}`);                
            }
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
}

// History Tab에서 user가 특정 놈 눌러서 category 선택하면 일어날 인터렉션
// target id 찾아 그 내용 기반으로 payment 로 옮기고 => 모두 완료되면 그때 remove 실행
const updatePayHistory = async (req, res) => {
    try {
        const { id, category } = req.body;
        const { headers } = req;
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
            targetPayHistory['id'] = id; // 얘를 고유하게 바꿔주는게 좋다! 
            targetPayHistory['category'] = category // category value input for real payment DB
            let newUserPayment = new UserPayment(targetPayHistory, false); // not a history

            await UserPayment.creatUserPayment(newUserPayment, function (err, userPayment) {
                // console.log('userPaymentController - creatUserPayment in updatePayHistory');
                if (err) throw new Error(`userPaymentController creatUserPayment Error: ${err}`);
                else {
                    UserPayment.removeHistoryById(id, function (err, result) {
                        if (err) throw new Error(`userPaymentController removeHistoryById Error: ${err}`);
                        else {
                            console.log(colors.bgGreen.black("userPaymentController removeHistoryById and Update payment Success!!"));
                            return res.status(201).json({ result });
                        }
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

/*
// Get A User
const getAUser = async (req, res) => {
    try {
        // req.body (id value) 값에 대한 값 보증 필요 and Vaildatation
        if (!req.body.id) res.status(400).send({ error: true, message: 'Please provide id' });

        await User.getAUser(req.body.id, function (err, user) {
            console.log('userController - getAUser')
            if (err) {
                res.send(err);
                console.log('res a user', user);
            }
            return res.status(200).json(user)
            // res.send(user);
        });
    }
    catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

// Get All User
const getAllUser = async (req, res) => {
    try {
        await User.getAllUser(function (err, user) {
            console.log('userController - getAllUser')
            if (err) {
                res.send(err);
                console.log('res', user);
            }
            res.status(200).json({ user })
            // res.send(user);
        });
    }
    catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

const updateById = async (req, res) => {

    const updateUser = new User(req.body, true);
    try {
        await User.updateByid(updateUser, function (err, result) {
            console.log('userController - updateByid')
            if (err) res.send(err);
            res.status(201).send(result);
        });
    }
    catch (error) {
        console.log('userController - updateByid' + error);
        throw new Error(error);
    }
};

const removeById = async (req, res) => {

    try {
        await User.removeById(req.body.id, function (err, result) {
            console.log('userController - removeById')
            if (err) {
                res.send(err);
                console.log('res a user', result);
            }
            res.status(201).send(result)
            // res.send(user);
        });
    }
    catch (error) {
        console.log(error);
        throw new Error(error);
    }
}
*/

module.exports = {
    getAllPayments,
    getAllPayHistory,
    updatePayHistory
};