const { verifyJWT } = require('../infra/securityExtension');
const CardapioBusiness = require('../business/cardapioBusiness.js').CardapioBusiness;


var CardapioController = class CardapioController {
    constructor(application) {
        this._application = application;
    }
    registrarRotas() {

        //#region Cardapios

        this._application.post('/cardapio/', verifyJWT, (req, resp) => {
            new CardapioBusiness(req).cadastrar(req.body)
                .then(data => {
                    resp.status(data.status).json(data);
                })
                .catch(err => {
                    resp.status(err.status).json(err);
                });
        });

        this._application.post('/cardapios/', verifyJWT, (req, resp) => {
            new CardapioBusiness(req).filtrar(req.body)
                .then(data => {
                    resp.status(data.status).json(data);
                })
                .catch(err => {
                    resp.status(err.status).json(err);
                });
        });

        //#endregion Cardapios

    }

}

exports.CardapioController = CardapioController;