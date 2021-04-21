const { logarUsuarioRules, validate } = require('../business/validacoes/usuarioValidacao');
const dependencies = require('../infra/dependencyInjection.js').LoadDependencies;
const { responseHandle } = require('../infra/createResponse.js');

var AutenticacaoRoutes = class AutenticacaoRoutes {
    constructor(application) {
        this._application = application;
    }

    registrarRotas() {

        this._application.post('/login', logarUsuarioRules(), validate, dependencies(this), (req, res) => {
            responseHandle(resp, this._userBusiness.autenticar(req.body));
        });
    }
}


exports.AutenticacaoRoutes = AutenticacaoRoutes;