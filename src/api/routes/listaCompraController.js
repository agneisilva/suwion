const { verifyJWT } = require('../infra/securityExtension');
const ListaCompraBusiness = require('../business/listaCompraBusiness.js').ListaCompraBusiness;


var ListaCompraController = class ListaCompraController {
    constructor(application) {
        this._application = application;
    }

    registrarRotas() {
        //#region Listas de Compras

        this._application.post('/listaCompra/receita', verifyJWT, (req, resp) => {
            new ListaCompraBusiness(req).criarPorReceita(req.body)
                .then(data => {
                    resp.status(data.status).json(data);
                })
                .catch(err => {
                    resp.status(err.status).json(err);
                });
        });

        this._application.post('/listaCompra/cardapio', verifyJWT, (req, resp) => {
            new ListaCompraBusiness(req).criarPorCardapio(req.body)
                .then(data => {
                    resp.status(data.status).json(data);
                })
                .catch(err => {
                    resp.status(err.status).json(err);
                });
        });

        //#endregion Listas de Compras

    }

}


exports.ListaCompraController = ListaCompraController;