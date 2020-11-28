'use strict';

const User = require('../services/userService');
const expressVaildator = require('express-validator'); // 유효성 검사 

// Get A User
const getAUser = async (req, res) => {
    try {
        await User.getAUser(req.params.id, function (err, user) {
            console.log('userController - getAUser')
            if (err) {
                res.send(err);
                console.log('res a user', user);
            }
            res.status(200).send(user)
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

// Creat A User
const creatUser = async (req, res) => {
    try {
        // newUser 값에 대한 값 보증 필요 
        let newUser = new User(req.body);
        if (!newUser.name) res.status(400).send({ error: true, message: 'Please provide name' });

        await User.creatUser(newUser, function (err, user) {
            console.log('userController - creatUser')
            if (err) res.send(err);
            res.status(201).json({ user })
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
    removeById
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