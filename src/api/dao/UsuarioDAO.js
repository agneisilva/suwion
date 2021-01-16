var mongo = require('mongodb');

const Collection = "usuario";

var UsuarioDAO = class UsuarioDAO {
    constructor(connection) {
        this._connection = connection;
        this.collection = this._connection.collection(Collection);
    }

    buscarPorId(id){
        //TODO
        return new Promise((res, rejec) => {
            res("DAO NÃO IMPLEMENTADO");
        });
    }

    buscarPorEmail(email){
        //TODO
        return new Promise((res, rejec) => {
            res("DAO NÃO IMPLEMENTADO");
        });
    }

    buscarPorNickName(nickName){
        //TODO
        return new Promise((res, rejec) => {
            res("DAO NÃO IMPLEMENTADO");
        });
    }

    listarPorNickName(nickName){
        //TODO
        return new Promise((res, rejec) => {
            res("DAO NÃO IMPLEMENTADO");
        });
    }

    cadastrar(user){
        //TODO
        return new Promise((res, rejec) => {
            res("DAO NÃO IMPLEMENTADO");
        });
    }
}

exports.UsuarioDAO = UsuarioDAO;