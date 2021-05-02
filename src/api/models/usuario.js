
var Usuario = class Usuario {
    constructor(args) {
        this._id = args?.id || args?._id; 
        this.nome = args?.nome;
        this.email = args?.email;
        this.nickName = args?.nickName;
        this.senha = args?.senha;  
        this.salt = args?.salt; 
    }

    getClean(){
        let limpo = Object.assign(this, {});
        delete limpo?.senha; 
        delete limpo?.salt;
        
        return limpo; 
    }
}

exports.Usuario = Usuario;