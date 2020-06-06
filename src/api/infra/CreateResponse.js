var CreateResponse = class CreateResponse {
    createErroResponse(msg, status){
        return data = {
            message: "Erro", 
            status: status, 
            dateTime: new DateTime().dateTimeNow(), 
            success: false, 
            content: msg || "" 
        };
    }

    createSuccessResponse(content){
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