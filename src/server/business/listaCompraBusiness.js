const ListaCompraDAO = require('../dao/listaCompraDAO.js').ListaCompraDAO;
const CreateResponse = require('../infra/createResponse.js').CreateResponse;

var ListaCompraBusiness = class ListaCompraBusiness {
    constructor(require) {
        this._require = require;
    }

    criarPorReceita(listaCompra){
        //TODO implementar cadastro de lista de compras baseado em uma receita e número de porções/pessoas
        return new Promise((res, rej) => {
            new ListaCompraDAO(this._require.db).criarPorReceita(listaCompra)
                .then((data) => {
                    //Success
                    res(new CreateResponse().Success(data));
                })
                .catch((err) => {
                    //Error
                    rej(new CreateResponse().Erro("Erro ao Criar Lista de Compra para a Receita!"));
                });
        });
    }

    criarPorCardapio(listaCompra){
        //TODO implementar cadastro de lista de compras baseado em um cardapio e número de porções/pessoas
        return new Promise((res, rej) => {
            new ListaCompraDAO(this._require.db).criarPorCardapio(listaCompra)
                .then((data) => {
                    //Success
                    res(new CreateResponse().Success(data));
                })
                .catch((err) => {
                    //Error
                    rej(new CreateResponse().Erro("Erro ao Criar Lista de Compra para o Cardápio!"));
                });
        });
    }
}

exports.ListaCompraBusiness = ListaCompraBusiness;