const { verifyJWT } = require('../infra/securityExtension');
const dependencies = require('../infra/dependencyInjection.js').LoadDependencies;
const { responseHandle } = require('../infra/createResponse.js');

var ReceitaRoutes = class ReceitaRoutes {
    constructor(app) {
        this._application = app;
    }

    registrarRotas() {
        this._application.get('/receita/:id', verifyJWT, dependencies(this), (req, resp) => {
            responseHandle(resp, this._business.buscarPorId(req.params.id));
        })

        this._application.post('/receita', verifyJWT, dependencies(this), (req, resp) => {
            responseHandle(resp, this._business.cadastrar(req.body));
        })

        this._application.post('/receitas/', verifyJWT, dependencies(this), (req, resp) => {
            responseHandle(resp, this._business.filtrar(req.body));
        })
    }
}

exports.ReceitaRoutes = ReceitaRoutes;