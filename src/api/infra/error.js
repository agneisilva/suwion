var Error = class Error {
    constructor(args) {
        this.status = args.status; 
        this.tipo = args.tipo;
        this.msg = args.msg;
      
    }
}

var ErrorTipo = {
    Business: 0, 
    Authentication: 1
}

exports.Error = Error;
exports.ErrorTipo = ErrorTipo;