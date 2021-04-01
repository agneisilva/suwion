const { verifyJWT } = require('../infra/securityExtension');
const dependencies = require('../infra/dependencyInjection.js').LoadDependencies;
const { responseHandle } = require('../infra/createResponse.js');

var ListaCompraRoutes = class ListaCompraRoutes {
    constructor(application) {
        this._application = application;
    }

    registrarRotas() {
        this._application.post('/listaCompra/receita', verifyJWT, dependencies(this), (req, resp) => {
            responseHandle(resp, this._business.criarPorReceita(req.body));
        });

        this._application.post('/listaCompra/cardapio', verifyJWT, dependencies(this), (req, resp) => {
            responseHandle(resp, this._business.criarPorCardapio(req.body));
        });
    }
}


exports.ListaCompraRoutes = ListaCompraRoutes;