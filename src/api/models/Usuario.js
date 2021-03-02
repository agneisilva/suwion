
var Usuario = class Usuario {
    constructor(args) {
        this._id = args.id; 
        this.nome = args.nome;
        this.email = args.email;
        this.nickName = args.nickName;
        this.senha = args.senha;  
        this.salt = args.salt; 
    }
}

exports.Usuario = Usuario;