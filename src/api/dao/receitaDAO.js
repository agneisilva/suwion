var mongo = require('mongodb');

const Collection = "receita";

var ReceitaDAO = class ReceitaDAO {
    constructor({connection}) {
        this._connection = connection;
        this.collection = this._connection.collection(Collection);
    }

    buscarPorId(id){
        //TODO
        return new Promise((res, rejec) => {
            res("DAO NÃO IMPLEMENTADO");
        });
    }

    cadastrar(receita){
        //TODO
        return new Promise((res, rejec) => {
            res("DAO NÃO IMPLEMENTADO");
        });
    }

    filtrar(filtros){
        //TODO
        return new Promise((res, rejec) => {
            res("DAO NÃO IMPLEMENTADO");
        });
    }
}

exports.ReceitaDAO = ReceitaDAO;