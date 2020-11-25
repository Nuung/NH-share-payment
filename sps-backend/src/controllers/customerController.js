'use strict';

const Customer = require('../services/customerService');

const getAllCustomer = async (req, res) => {
    try {
        await Customer.getAllCustomer(function (err, customer) {
            console.log('controller - getAllCustomer')
            if (err) {
                res.send(err);
                console.log('res', customer);
            }
            res.status(201).json({ customer })
            // res.send(customer);
        });
    }
    catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const creatCustomer = async (req, res) => {
    try {
        let newCustomer = new Customer(req.body);
        if (!newCustomer.name) res.status(400).send({ error: true, message: 'Please provide name' });
        // else if (!newCustomer.phonenum) res.status(400).send({ error: true, message: 'Please provide phonenum' });

        await Customer.creatCustomer(newCustomer, function (err, customer) {
            console.log('controller - creatCustomer')
            if (err) res.send(err);
            res.status(201).json({ customer })
            // res.send(customer);
        });
    }
    catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

module.exports = {
    creatCustomer,
    getAllCustomer
}

/*
exports.read_a_customer = function (req, res) {
  Customer.getACustomer(req.params.id, function (err, customer) {
    console.log('controller - getACustomer')
    if (err) {
      res.send(err);
      console.log('res a customer', customer);
    }
    res.send(customer);
  });
};

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