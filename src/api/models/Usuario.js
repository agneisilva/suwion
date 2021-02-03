
var Usuario = class Usuario {
    constructor(id, nome, email, nickname) {
        this._id = id; 
        this.nome = nome;
        this.email = email;
        this.nickname = nickname;
        this.senha = senha;  
        this.salt = salt; 
    }
}

exports.Usuario = Usuario;