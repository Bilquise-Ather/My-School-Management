const BadError = require('../error/baderror');
const EmailNotFound = require('../error/emailnotfound');
const UnauthorizedError = require('../error/unauthorized');


let onError = (err, req, res, next) => {
    //console.log('Inside error listener.',err);

    res.status(err.status);

    /**
     * Handle known errors first.
     */
    if (err instanceof BadError || err instanceof UnauthorizedError || err instanceof EmailNotFound) {
        res.json(err.json);

        return next();
    }


};

module.exports = {
    onError: onError
};