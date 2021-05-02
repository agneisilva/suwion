const {ErrorTipo} = require('../infra/error.js');

var CreateResponse = class CreateResponse {
    Erro(msg, status = 500){
        return {
            message: "Erro", 
            status: status || 500, 
            dateTime: null, //TODO implpementar data, 
            success: false, 
            content: msg || "" 
        };
    }

    Success(content, format){
        return format == FormatType.RAW ? 
        content : 
        {
            message: "Sucesso", 
            status: 200, 
            dateTime: null, //TODO implpementar data, 
            success: true, 
            content: content || "" 
        };
    }

    AuthSucsess(content){
        return { 
            success: true,
            accessToken: content,
            expiresIn: process.env.SUWION_JWT_EXPIRESIN || '86400s',
            dateTime: null,
            tokenType: 'Bearer', 
            status: 202//Accepted
        };
    }

    AuthErro() {
        return { 
            success: false,
            message: "Não autorizado",
            status: 401
        };
    }
}

var responseHandle = (resp, promise) => {
    promise
        .then(data => {

            if(!!data && !!data.getClean) data = data.getClean();

            resp.status(200).json(new CreateResponse().Success(data));
        })
        .catch(err => {

            if(!!err && !!err.tipo)
            {
                switch (err.tipo) {
                    case ErrorTipo.Authentication:
                        let response = new CreateResponse().AuthErro();
                        resp.status(response.status).json(response);
                        break;
                    // case ErrorTipo.Business:
                    //     resp.status(500).json(new CreateResponse().Erro(err));
                    //     break;
                    default:
                        break;
                }

                return;
            }
            
            let status = 500, content = err;

            if((!!err && !!err.status)) status = err.status;
            if((!!err && !!err.msg)) content = err.msg;

            if(!status) status = 500;

            resp.status(status).json(new CreateResponse().Erro(content, status));
        });
}

const FormatType = {
    RAW: 0,
};

exports.CreateResponse = CreateResponse;
exports.responseHandle = responseHandle;
exports.FormatType = FormatType;