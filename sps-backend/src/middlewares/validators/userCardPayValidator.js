'use strict';
/**
 * @desc    - user body값 유효성 검사 조지기
 * @target  - Users Card Payment Request
 */
const { check, validationResult } = require('express-validator');

exports.validateUserCardPay = [
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