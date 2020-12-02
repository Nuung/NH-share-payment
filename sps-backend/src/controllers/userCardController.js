'use strict';

const UserCard = require('../services/userCardService');
const { body } = require('express-validator'); // 유효성 검사 
const jwt = require('jsonwebtoken'); // User Login JWT Create

// Creat a user card
// 카드 번호를 입력 받고 -> NH API를 통해 핀카드 발급 받고
// -> NH API를 통해 발급 확인을 받고 -> 핀카드 번호를 입력해야함 

const creatUserCard = async (req, res) => {
    try {
        // req.body 값에 대한 값 보증 필요 and Vaildatation
        if (!req.body.name) return res.status(400).send({ error: true, message: 'Please provide name' });

        // Check Id value
        const isNew = await User.findById(req.body.id);
        if (isNew) {
            return res.status(400).json({
                position: "userCardController creatUserCard",
                message: '이미 등록된 카드 번호 입니다!'
            });
        }
        else {
            // Main 
            let newUser = new User(req.body);
            await User.creatUser(newUser, function (err, user) {
                console.log('userCardController creatUserCard')
                if (err) return res.send(err);
                return res.status(201).json({ user });
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(404).json({
            position: "userCardController creatUserCard",
            message: error.message
        });
        // throw new Error(error);
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
    test
    // getAUser,
    // getAllUser,
    // creatUser,
    // updateById,
    // removeById,
    // logInUser,
    // userCheck
};