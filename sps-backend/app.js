const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
// const session = require('express-session');
const logger = require('morgan');
const cors = require('cors');
const escapeJSON = require('escape-json-node');

// env config ------
const appConfig = require('dotenv').config();

// API mapping ------
const userApi = require('./src/routes/userApi');
const userCardApi = require('./src/routes/userCardApi');
const userPaymentApi = require('./src/routes/userPaymentApi');
const snsBoardApi = require('./src/routes/snsBoardApi');
const snsCommentApi = require('./src/routes/snsCommentApi');

const app = express();

app.use(logger('dev'));
app.use(express.json()); // body-parser setting ~ express include body-parser from 4.X version
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser(appConfig.parsed.COOKIE_SECRET));
app.use(cookieParser());
// app.use(session({
//     resave: false,
//     saveUninitialized: false,
//     secret: appConfig.parsed.SESSION_SECRET
// }));
app.use(cors({  // CORS 설정
    origin: true,
    credentials: true
}));
app.set('jwt-secret', appConfig.parsed.JWT_SECRET); // set the secret key variable for jwt


// API 라우팅 ~ 선언부 ------
userApi(app);
userCardApi(app);
userPaymentApi(app);
snsBoardApi(app);
snsCommentApi(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
