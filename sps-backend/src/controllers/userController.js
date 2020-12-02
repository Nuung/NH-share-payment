'use strict';

const User = require('../services/userService');
const expressVaildator = require('express-validator'); // 유효성 검사 
const jwt = require('jsonwebtoken'); // 

// Creat A User
const creatUser = async (req, res) => {
    try {
        // req.body 값에 대한 값 보증 필요 and Vaildatation
        if (!req.body.name) return res.status(400).send({ error: true, message: 'Please provide name' });

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
                console.log('userController - creatUser')
                if (err) return res.send(err);
                return res.status(201).json({ user });
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


// Login A User and Get a JWT(Token)
const logInUser = async (req, res) => {
    try {
        const { id, password } = req.body;
        const secret = req.app.get('jwt-secret');

        // Check 
        const check = (user) => {
            if (!user) {
                // user does not exist
                throw new Error('User Login failed: user does not exist')
            } else {
                if (User.verify(user, password)) { // user exists, check the password
                    // create a promise that generates jwt asynchronously
                    const p = new Promise((resolve, reject) => {
                        jwt.sign(
                            {
                                username: user.id
                            },
                            secret,
                            {
                                expiresIn: '7d',
                                issuer: 'velopert.com',
                                subject: 'userInfo'
                            }, (err, token) => {
                                if (err) reject(err)
                                resolve(token)
                            })
                    });
                    return p
                } else {
                    throw new Error('User Login failed: Wrong password cant be verified')
                }
            }
        };

        // respond the token 
        const respond = (token) => {
            res.json({
                message: 'logged in successfully',
                token
            })
        };

        User.findById(id)
            .then(check)
            .then(respond)
            .catch((err) => { throw new Error(err) });

    } catch (error) {
        console.log(`userController logInUser: ${error}`);
        return res.status(404).json({
            position: "userController creatUser",
            message: error.message
        });
    }
};


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
    logInUser
}

/*
exports.create_a_customer = function (req, res) {
  // newTask에 대한 검증이 필요함! -> 예외 상황엔 no insert  / newTask 노출 X -> 정규표현식 or / 모든 곳에 해당
  // -> 내부기능이 있을 수 있다 -> 시큐어 코딩 정보 확인하기!
  let new_customer = new Customer(req.body);

  //handles null error
  if (!new_customer.name) {
    res.status(400).send({ error: true, message: 'Please provide name' });
  }
  else if (!new_customer.phonenum) {
    res.status(400).send({ error: true, message: 'Please provide phonenum' });
  }
  else {
    Customer.createCustomer(new_customer, function (err, customer) {
      if (err)
        res.send(err);

      res.json(customer);
    });
  }
};
*/