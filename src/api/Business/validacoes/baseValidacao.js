const { validationResult } = require('express-validator');
const CreateResponse = require('../../infra/createResponse.js').CreateResponse;

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if(errors.isEmpty()){
        return next();
    }

    const extractedErrors = [];

    errors.array().map(err => extractedErrors.push({
        [err.param]: err.msg
    }));

    var err = new CreateResponse().Erro(extractedErrors, 422);

    return res.status(err.status).json(err);
}


module.exports = {
    validate
}