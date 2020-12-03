const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // read the token from header or url or cookie['user-login']
    const token = req.headers['x-access-token'] || req.query.token || req.cookies['user-login'];

    // token does not exist
    if (!token || token === null || token === "") {
        return res.status(403).json({
            success: false,
            message: 'not logged in, access token check is needed!'
        });
    }

    // create a promise that decodes the token
    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
                if (err) reject(err);
                resolve(decoded);
            });
        }
    );

    // if it has failed to verify, it will return an error message
    const onError = (error) => {
        res.status(403).json({
            success: false,
            message: `Fail to verify : ${error.message}`
        });
    }

    // process the promise
    p.then((decoded) => {
        req.decoded = decoded;
        next();
    }).catch(onError);
};

module.exports = authMiddleware