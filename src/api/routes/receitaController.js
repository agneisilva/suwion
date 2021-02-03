const { verifyJWT } = require('../infra/securityExtension');
const ReceitaBusiness = require('../business/receitaBusiness.js').ReceitaBusiness;


var ReceitaController = class ReceitaController {
    constructor(application) {
        this._application = application;
    }

    registrarRotas() {
        //#region Receitas

        this._application.get('/receita/:id', verifyJWT, (req, resp) => {
            new ReceitaBusiness(req).buscarPorId(req.body.receitaId)
                .then(data => {
                    resp.status(data.status).json(data);
                })
                .catch(err => {
                    resp.status(err.status).json(err);
                });
        })

        this._application.post('/receita', verifyJWT, (req, resp) => {
            new ReceitaBusiness(req).cadastrar(req.body)
                .then(data => {
                    resp.status(data.status).json(data);
                })
                .catch(err => {
                    resp.status(err.status).json(err);
                });
        })

        this._application.post('/receitas/', verifyJWT, (req, resp) => {
            new ReceitaBusiness(req).filtrar(req.body)
                .then(data => {
                    resp.status(data.status).json(data);
                })
                .catch(err => {
                    resp.status(err.status).json(err);
                });
        })

        //#endregion Receitas

    }

}


exports.ReceitaController = ReceitaController;