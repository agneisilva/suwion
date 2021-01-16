var mongo = require('mongodb');

const Collection = "cardapio";

var CardapioDAO = class CardapioDAO {
    constructor(connection) {
        this._connection = connection;
        this.collection = this._connection.collection(Collection);
    }

    cadastrar(cardapio) {
        //TODO implementar cadastro de cardapio
        /*
            Receitas por dias/tempo
        */
        return new Promise((res, rejec) => {
            res("DAO NÃO IMPLEMENTADO");
        });
    }

    filtrar(filtros) {
        //TODO
        return new Promise((res, rejec) => {
            res("DAO NÃO IMPLEMENTADO");
        });
    }
}

exports.CardapioDAO = CardapioDAO;