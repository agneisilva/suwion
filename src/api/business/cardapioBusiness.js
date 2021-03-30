const CardapioDAO = require('../dao/cardapioDAO.js').CardapioDAO;
const CreateResponse = require('../infra/createResponse.js').CreateResponse;

var CardapioBusiness = class CardapioBusiness {
    constructor(require) {
        this._require = require;
    }

    cadastrar(cardapio) {
        return new Promise((res, rej) => {
            new CardapioDAO(this._require.db).cadastrar(cardapio)
                .then((data) => {
                    //Success
                    res(new CreateResponse().Success(data));
                })
                .catch((err) => {
                    //Error
                    rej(new CreateResponse().Erro("Erro ao Cadastrar Cardápio!"));
                });
        });
    }

    filtrar(filtros) {
        //TODO implementar filtro avançado de cardapios
        return new Promise((res, rej) => {
            new CardapioDAO(this._require.db).filtrar(filtros)
                .then((data) => {
                    //Success
                    res(new CreateResponse().Success(data));
                })
                .catch((err) => {
                    //Error
                    rej(new CreateResponse().Erro("Erro ao Localizar os Cardápios!"));
                });
        });
    }
}

exports.CardapioBusiness = CardapioBusiness;