'use strict';

/**
 * @desc    - user body값 유효성 검사 조지기
 * @target  - UsersDTO
 */
const { check, validationResult } = require('express-validator');

exports.validateUser = [
    check('name')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('User name can not be empty!')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Minimum 3 characters required!')
        .bail(),
    check('id')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Invalid email address!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        next();
    },
];