'use strict';

/**
 * @desc    - user body값 유효성 검사 조지기
 * @target  - UsersDTO
 */
const { check, validationResult } = require('express-validator');

exports.validateUserCard = [
    check('name')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('User Card name can not be empty!')
        .bail()
        .isLength({ min: 2 })
        .withMessage('Minimum 2 characters required!')
        .bail(),
    check('cardno')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('User Card number can not be empty!')
        .bail()
        .isLength({ min: 16 })
        .withMessage('User Card number length Minimum 16 characters required!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        next();
    },
];