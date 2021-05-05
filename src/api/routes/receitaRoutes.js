const { verifyJWT } = require('../infra/securityExtension');
const dependencies = require('../infra/dependencyInjection.js').LoadDependencies;
const { responseHandle } = require('../infra/createResponse.js');
const {
    criarReceitaRules,
    validate
} = require('../business/validacoes/receitaValidacao.js');

var ReceitaRoutes = class ReceitaRoutes {
    constructor(app) {
        this._application = app;
    }

    registrarRotas() {
        this._application.get('/receita/:id', dependencies(this), (req, resp) => {
            responseHandle(resp, this._receitaBusiness.buscarPorId(req.params.id));
        })

        this._application.post('/receita', criarReceitaRules(), validate, verifyJWT, dependencies(this), (req, resp) => {
            responseHandle(resp, this._receitaBusiness.cadastrar(req.body, req.usuarioId));
        })

        this._application.post('/receitas/', dependencies(this), (req, resp) => {
            responseHandle(resp, this._receitaBusiness.filtrar(req.body));
        })
    }
}

exports.ReceitaRoutes = ReceitaRoutes;