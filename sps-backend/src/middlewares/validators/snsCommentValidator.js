'use strict';

const { check, validationResult } = require('express-validator');

const validateSnsCommentCreate = [
    check('board_id')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('SnsBoard Comment board_id can not be empty!')
        .bail()
        .isNumeric()
        .withMessage('SnsBoard Comment board_id only can be number!')
        .bail(),
    check('content')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('SnsBoard Comment content can not be empty!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        next();
    },
];

const validateSnsCommentUpdate = [
    check('id')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('SnsBoard Comment id can not be empty!')
        .bail()
        .isNumeric()
        .withMessage('SnsBoard Comment id only can be number!')
        .bail(),
    check('content')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('SnsBoard Comment content can not be empty!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        next();
    },
];


const validateSnsCommentDelete = [
    check('id')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('SnsBoard Comment id can not be empty!')
        .bail()
        .isNumeric()
        .withMessage('SnsBoard Comment id only can be number!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        next();
    },
];

module.exports = {
    validateSnsCommentCreate,
    validateSnsCommentUpdate,
    validateSnsCommentDelete
};