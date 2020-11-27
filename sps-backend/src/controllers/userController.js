'use strict';

const User = require('../services/userService');

// Get A User
const getAUser = async (req, res) => {
    try {
        await User.getAUser(req.params.id, function (err, user) {
            console.log('userController - getAUser')
            if (err) {
                res.send(err);
                console.log('res a user', user);
            }
            res.status(201).send(user)
            // res.send(user);
        });
    }
    catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

// Get All User
const getAllUser = async (req, res) => {
    try {
        await User.getAllUser(function (err, user) {
            console.log('userController - getAllUser')
            if (err) {
                res.send(err);
                console.log('res', user);
            }
            res.status(201).json({ user })
            // res.send(user);
        });
    }
    catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

// Creat A User
const creatUser = async (req, res) => {
    try {
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
}

module.exports = {
    getAUser,
    getAllUser,
    creatUser
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