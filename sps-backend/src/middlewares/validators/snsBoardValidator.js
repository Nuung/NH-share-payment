'use strict';

const { check, validationResult } = require('express-validator');

const validateSnsBoardCreate = [
    check('content')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('SnsBoard content can not be empty!')
        .bail(),
    check('tags')
        .trim()
        .escape()
        .not()
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        next();
    },
];

module.exports = {
    validateSnsBoardCreate
};