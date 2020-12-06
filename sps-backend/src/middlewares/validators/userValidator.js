'use strict';

/**
 * @desc    - user body값 유효성 검사 조지기
 * @target  - UsersDTO
 */
const { check, validationResult } = require('express-validator');


const validateUserCreate = [
    check('name')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('User name can not be empty!')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Minimum 3 characters required in User name!')
        .bail(),
    check('id')
        .trim()
        .not()
        .isEmpty()
        .withMessage('User ID can not be empty!')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Minimum 3 characters required in User id!')
        .bail(),
    check('family')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('User Family Value can not be empty!')
        .bail()
        .isNumeric()
        .withMessage('User family must be number!')
        .bail(),
    check('budget')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('User budget can not be empty!')
        .bail()
        .isNumeric()
        .withMessage('User budget must be number')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        next();
    },
];

const validateUserLogin = [
    check('id')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('User name can not be empty!')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Minimum 3 characters required in User id!')
        .bail(),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('password can not be empty!')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Minimum 3 characters required in User id!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        next();
    },
];

module.exports = {
    validateUserCreate,
    validateUserLogin
};