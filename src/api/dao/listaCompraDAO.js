var mongo = require('mongodb');

const Collection = "lista_compra";

var ListaCompraDAO = class ListaCompraDAO {
    constructor({connection}) {
        this._connection = connection;
        this.collection = this._connection.collection(Collection);
    }

    criarPorReceita(listaCompra){
        //TODO
        return new Promise((res, rejec) => {
            res("DAO NÃO IMPLEMENTADO");
        });
    }

    criarPorCardapio(listaCompra){
        //TODO
        return new Promise((res, rejec) => {
            res("DAO NÃO IMPLEMENTADO");
        });
    }
}

exports.ListaCompraDAO = ListaCompraDAO;