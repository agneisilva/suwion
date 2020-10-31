var CreateResponse = class CreateResponse {
    Erro(msg, status = 500){
        return data = {
            message: "Erro", 
            status: status, 
            dateTime: new DateTime().dateTimeNow(), 
            success: false, 
            content: msg || "" 
        };
    }

    Success(content){
        return data = {
            message: "Sucesso", 
            status: 200, 
            dateTime: new DateTime().dateTimeNow(), 
            success: true, 
            content: content || "" 
        };
    }
}

exports.CreateResponse = CreateResponse;