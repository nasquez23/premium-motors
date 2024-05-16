const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token){
            throw new Error('You are not authorized for this action.');
        }

        const decodedToken = jwt.verify(token, 'supersecret_dont_share');
        console.log(decodedToken);
        next();
    }
    catch (err) {
        const error = new HttpError('You are not authorized for this action.', 401);
        return next(error);
    }
};