'use strict';

const { check, validationResult } = require('express-validator');

const validateUserUpdatePayHistory = [
    check('id')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Payment history id can not be empty!')
        .bail(),
    check('category')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Payment history category can not be empty!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        next();
    },
];

module.exports = {
    validateUserUpdatePayHistory
};