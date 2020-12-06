'use strict';

const User = require('../services/userService');
const jwt = require('jsonwebtoken'); // User Login JWT Create

/**
 * @desc    - create new User
 * @method  - POST
 * @apiDocs - Notion 
 */
const creatUser = async (req, res) => {
    try {
        // Check Id value
        const isNew = await User.findById(req.body.id);
        // console.log(`userController isNew vaule: ${isNew}`); // for check 

        if (isNew) {
            return res.status(400).json({
                position: "userController creatUser",
                message: '이미 가입 된 사용자 아이디 입니다.'
            });
        }
        else {
            // Main 
            let newUser = new User(req.body);
            await User.creatUser(newUser, function (err, user) {
                if (err) return res.send(err);
                else {
                    const secret = req.app.get('jwt-secret');
                    jwt.sign(
                        {
                            userId: user.id,
                            userName: user.name,
                            userBirth: user.birthday
                        },
                        secret,
                        {
                            expiresIn: '7d',
                            issuer: 'spsProject',
                            subject: 'userInfo'
                        }, (err, token) => {
                            if (err) throw new Error('CreateUser Jwt Token issue: ' + err);
                            else {
                                console.log(token);
                                return res.cookie("user-login", token)
                                    .status(201).json({ message: "회원가입에 성공했습니다." });
                            }
                        });
                }
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(404).json({
            position: "userController creatUser",
            message: error.message
        });
        // throw new Error(error);
    }
};
/**
 * @desc    - Login A User and Get a JWT(Token)
 * @method  - POST
 * @apiDocs - { id, password } ~ after validatation
 */
const logInUser = async (req, res) => {
    try {
        const { id, password } = req.body;
        const secret = req.app.get('jwt-secret');

        // Check 
        const check = (user) => {
            if (!user) {
                // user does not exist
                throw new Error('User Login failed: user does not exist');
            } else {
                if (User.verifyPassword(user, password)) { // user exists, check the password
                    // create a promise that generates jwt asynchronously
                    return new Promise((resolve, reject) => {
                        jwt.sign(
                            {
                                userId: user.id,
                                userName: user.name,
                                userBirth: user.birthday
                            },
                            secret,
                            {
                                expiresIn: '7d',
                                issuer: 'spsProject',
                                subject: 'userInfo'
                            }, (err, token) => {
                                if (err) reject(err);
                                resolve(token);
                            })
                    });
                }
                else throw new Error('Logged in Fail, wrong password cant be verified!');
            }
        };

        // respond the token 
        const respond = (token) => {
            res.cookie("user-login", token);
            res.status(201).json({
                message: 'logged in successfully',
                token
            })
        };

        // Main and Chainning (async await)
        await User.findById(id)
            .then(check)
            .then(respond)
            .catch((err) => { throw new Error(err) });

    } catch (error) {
        // console.log(`userController logInUser: ${error}`);
        return res.status(404).json({
            position: "userController logInUser",
            message: error.message
        });
    }
};


// 웹 토큰 단순 테스트를 위한 함수 하나 Check Login A User - JWT
const userCheck = (req, res) => {
    res.json({
        success: true,
        info: req.decoded
    });
}


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

module.exports = {
    getAUser,
    getAllUser,
    creatUser,
    updateById,
    removeById,
    logInUser,
    userCheck
}