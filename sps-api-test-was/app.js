const createError = require('http-errors');
const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const session = require("express-session");
// const flash = require("connect-flash");
// const passport = require("passport");
const indexRouter = require('./routes/index');
// const setUpPassport = require("./setuppassport");

//-------------------------------------------------------------------------------------------//
// specific router
const simplepayRouter = require('./routes/simplepay');

//-------------------------------------------------------------------------------------------//

const app = express();

// setUpPassport(); ~ for auth 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use(flash());
// app.use(cookieParser());
// app.use(session({
//     secret: "TKRvOIJs=HyqrvagQ#&!f!%V]Ww/4KiVs$s,<<MX", //임의의 문자
//     resave: true,
//     saveUninitialized: true
// }));
/*
secret : 각 세션이 클라이언트에서 암호화되도록함. 쿠키해킹방지
resave : 미들웨어 옵션, true하면 세션이 수정되지 않은 경우에도 세션 업데이트
saveUninitialized : 미들웨어 옵션, 초기화되지 않은 세션 재설정
*/

// app.use(passport.initialize());
// app.use(passport.session());

//-------------------------------------------------------------------------------------------//
// Routing Area
app.use('/', indexRouter);
app.use('/simple', simplepayRouter);

//-------------------------------------------------------------------------------------------//
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;