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
            resp.status(200).json(new CreateResponse().Success(data));
        })
        .catch(err => {
            resp.status(500).json(new CreateResponse().Erro(err));
        });
}

const FormatType = {
    RAW: 0,
};

exports.CreateResponse = CreateResponse;
exports.responseHandle = responseHandle;
exports.FormatType = FormatType;