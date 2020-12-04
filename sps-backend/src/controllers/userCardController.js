'use strict';

const UserCard = require('../services/userCardService');
const UserCardPayment = require('../services/userPaymentService');
const jwt = require('jsonwebtoken'); // User Login JWT Create
const { response } = require('express');
const colors = require('colors'); // for log color :) 

// Creat a user card
// "카드 번호를 입력" 받고 -> NH API를 통해 핀카드 발급 번호 발급 받고
// -> NH API를 통해 발급 확인을 받고 -> "핀카드 번호"를 DB에 입력해야함 
const creatUserCard = async (req, res) => {
    try {
        // const tokenDecoded = req.cookies['user-login'].decoded;
        const { cardno } = req.body;
        const { headers } = req;
        const { userId, userName, userBirth } = jwt.decode(headers['x-access-token']);

        // Check OpenFinCardDirect / axios를 promise 로 바꿔쓰든지 해야 callback 지옥에서 벗어날 수 있을 듯,, 체이닝이 안되 ㅠㅠ  
        await UserCard.OpenFinCardDirect(userBirth, cardno, function (err, response) {
            if (err) throw new Error(`userCardController OpenFinCardDirect Error: ${err}`);

            // No error and Check the other value
            const { Header: { Rsms }, Rgno } = response; // Rsms가 등록 번호
            if (!Rgno) throw new Error(`이미 발급된 핀카드 또는 내부 데이터 에러: ${Rsms}`);
            else {
                // 등록 번호 기반으로 실제 핀 카드 받아야 함! 
                UserCard.CheckOpenFinCardDirect(userBirth, Rgno, function (err, response) {
                    if (err) throw new Error(`userCardController CheckOpenFinCardDirect Error: ${err}`);
                    const { Fincard, Rsms } = response; // 드디어 발급된 핀 카드 번호 

                    // Create A UserCard 
                    // Check FinCard Number 중복
                    // const isNew = await UserCard.findByFinCard(Fincard);
                    // if (isNew) {
                    //     return res.status(400).json({
                    //         position: "userCardController creatUserCard",
                    //         message: '이미 등록된 카드 번호 입니다!'
                    //     });
                    // }
                    // Create Main Function
                    const temp_ = { // make a new UserCard Obj
                        id: req.body.id,
                        user_id: userId,
                        name: req.body.name,
                        fin_card: Fincard
                    };
                    const newUserCard = new UserCard(temp_);
                    UserCard.creatUserCard(newUserCard, function (err, user) {
                        console.log('userCardController creatUserCard Successfully!');
                        if (err) throw new Error(`userCardController creatUserCard Error: ${Rsms} And ${err}`);
                        return res.status(201).json({ user });
                    });
                }); // FinCard발급하기
            }
        }); // FinCard발급을 위한 발급 번호받기 ~ and of await

        // end of await, 아래 영역 진입! 
        console.log('\u001b[1m', "End of userCardController creatUserCard API");
    }
    catch (error) {
        console.log(`userCardController creatUserCard: ${error}`);
        return res.status(404).json({
            position: "userCardController creatUserCard",
            message: error.message
        });
    }
};


// 개인 카드 승인 내역 조회 API
// 얘는 일단 api자체가 비완성형임, 그래서 test-server api 끌어다가 돌리든지 해야할 듯 
// 승인내역 조회 -> card pay history (Temp db for 분류화된 payments db) create
const creatUserCardPayHistory = async (req, res) => {
    try {
        const { headers } = req;
        const { userId, userName, userBirth } = jwt.decode(headers['x-access-token']);

        // get target UserCard by token's userId
        const targetCard = await UserCard.findByUserId(userId);
        if (!targetCard) {
            return res.status(400).json({
                position: "userCardController creatUserCardPayHistory",
                message: '유저 ID에 맞는 카드가 등록되어 있지 않습니다. 또는 유저아이디와 다른 판키드 넘버입니다.'
            });
        }
        else {
            const reqInfo = {
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                pageNo: req.body.pageNo,
                cnt: req.body.cnt
            }
            await UserCard.InquireCreditCardAuthorizationHistory(targetCard.fin_card, reqInfo, function (err, response) {
                if (err) throw new Error(`userCardController InquireCreditCardAuthorizationHistory Error: ${err}`);
                else {
                    const { REC } = response; // cnt 만큼 per page Number 리스트업 
                    console.log(REC);
                    // 중요한건 여기서 userCard payment (history) table update -> 유저가 카테고리 고를 수 있게 
                    UserCardPayment.creatUserCardPayHistory(userId, targetCard.id, REC, function (err, insertIdCounter) {
                        if(err) throw new Error(`userCardController creatUserCardPayHistory Error: ${err}`);
                        else {
                            console.log(colors.yellow.bgRed.bold("userCardController creatUserCardPayHistory ${insertIdCounter} rows was added successfully"));
                            return res.status(201).json({
                                position: "userCardController creatUserCardPayHistory",
                                message: `${insertIdCounter} rows was added!`
                            });
                        }
                    });

                }
            });
            // await InquireCreditCardAuthorizationHistory 끝 
        }
    }
    catch (error) {
        console.log(`userCardController creatUserCardPayHistory: ${error}`);
        return res.status(404).json({
            position: "userCardController creatUserCardPayHistory",
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
    creatUserCard,
    creatUserCardPayHistory
    // getAUser,
    // getAllUser,
    // creatUser,
    // updateById,
    // removeById,
    // logInUser,
    // userCheck
};