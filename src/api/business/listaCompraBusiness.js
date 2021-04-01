
var ListaCompraBusiness = class ListaCompraBusiness {
    constructor({ dao }) {
        this._dao = dao;
    }

    criarPorReceita(listaCompra){
        //TODO implementar cadastro de lista de compras baseado em uma receita e número de porções/pessoas
        return new Promise((res, rej) => {
            this._dao.criarPorReceita(listaCompra)
                .then((data) => {
                    //Success
                    res(data);
                })
                .catch((err) => {
                    //Error
                    rej("Erro ao Criar Lista de Compra para a Receita!");
                });
        });
    }

    criarPorCardapio(listaCompra){
        //TODO implementar cadastro de lista de compras baseado em um cardapio e número de porções/pessoas
        return new Promise((res, rej) => {
            this._dao.criarPorCardapio(listaCompra)
                .then((data) => {
                    //Success
                    res(data);
                })
                .catch((err) => {
                    //Error
                    rej("Erro ao Criar Lista de Compra para o Cardápio!");
                });
        });
    }
}

exports.ListaCompraBusiness = ListaCompraBusiness;