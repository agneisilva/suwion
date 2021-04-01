const { verifyJWT } = require('../infra/securityExtension');
const dependencies = require('../infra/dependencyInjection.js').LoadDependencies;
const { responseHandle } = require('../infra/createResponse.js');


var CardapioRoutes = class CardapioRoutes {
    constructor(app) {
        this._application = app;
    }

    registrarRotas() {
        this._application.post('/cardapio/', verifyJWT, dependencies(this), (req, resp) => {
            responseHandle(resp, this._business.cadastrar(req.body));
        });

        this._application.post('/cardapios/', verifyJWT, dependencies(this), (req, resp) => {
            responseHandle(resp, this._business.filtrar(req.body));
        });
    }
}

exports.CardapioRoutes = CardapioRoutes;