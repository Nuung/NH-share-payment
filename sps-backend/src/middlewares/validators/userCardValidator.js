'use strict';

/**
 * @desc    - user body값 유효성 검사 조지기
 * @target  - UsersDTO
 */
const { check, validationResult } = require('express-validator');

const validateUserCardCreate = [
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


const validateUserCardApprove = [
    check('startDate')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Get approve list startDate can not be empty!')
        .bail()
        .isDate()
        .withMessage('startDate format would be matched with yyyy-mm-dd')
        .bail(),
    check('endDate')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Get approve list startDate can not be empty!')
        .bail()
        .isDate()
        .withMessage('startDate format would be matched with yyyy-mm-dd')
        .bail(),
    check('cnt')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Get approve list Cnt can not be empty!')
        .bail()
        .isInt({ gt: 0, lt: 16 })
        .withMessage('Get approve list Cnt could be greatter than 0 and little than 16 Int')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        next();
    },
];


module.exports = {
    validateUserCardCreate,
    validateUserCardApprove
};