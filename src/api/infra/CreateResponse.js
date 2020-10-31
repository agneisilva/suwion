var CreateResponse = class CreateResponse {
    Erro(msg, status = 500){
        return {
            message: "Erro", 
            status: status, 
            dateTime: null, //TODO implpementar data, 
            success: false, 
            content: msg || "" 
        };
    }

    Success(content){
        return {
            message: "Sucesso", 
            status: 200, 
            dateTime: null, //TODO implpementar data, 
            success: true, 
            content: content || "" 
        };
    }
}

exports.CreateResponse = CreateResponse;