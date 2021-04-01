
var CardapioBusiness = class CardapioBusiness {
    constructor({ dao }) {
        this._dao = dao;
    }

    cadastrar(cardapio) {
        return new Promise((res, rej) => {
            this._dao.cadastrar(cardapio)
                .then((data) => {
                    //Success
                    res(data);
                })
                .catch((err) => {
                    //Error
                    rej("Erro ao Cadastrar Cardápio!");
                });
        });
    }

    filtrar(filtros) {
        //TODO implementar filtro avançado de cardapios
        return new Promise((res, rej) => {
            this._dao.filtrar(filtros)
                .then((data) => {
                    //Success
                    res(data);
                })
                .catch((err) => {
                    //Error
                    rej("Erro ao Localizar os Cardápios!");
                });
        });
    }
}

exports.CardapioBusiness = CardapioBusiness;