const { verifyJWT } = require('../infra/securityExtension');
const Usuario = require('../models/usuario').Usuario;
const dependencies = require('../infra/dependencyInjection.js').LoadDependencies;
const { responseHandle } = require('../infra/createResponse.js');
const {
    criarUsuarioRules,
    alterarUsuarioRules,
    deletarUsuarioRules,
    validate
} = require('../business/validacoes/usuarioValidacao');

var UsuarioRoutes = class UsuarioRoutes {
    constructor(app) {
        this._application = app;
    }

    registrarRotas() {
        this._application.get('/usuario/:id', verifyJWT, dependencies(this), (req, resp) => {
            responseHandle(resp, this._userBusiness.buscarPorId(req.params.id));
        })

        this._application.get('/usuario/email/:email', verifyJWT, dependencies(this), (req, resp) => {
            responseHandle(resp, this._userBusiness.buscarPorEmail(req.params.email));
        })

        this._application.get('/usuario/nickname/:nickname', verifyJWT, dependencies(this), (req, resp) => {
            responseHandle(resp, this._userBusiness.buscarPorNickName(req.params.nickname));
        })

        this._application.get('/usuarios/nickname/:nickname', verifyJWT, dependencies(this), (req, resp) => {
            responseHandle(resp, this._userBusiness.listarPorNickName(req.params.nickname));
        })

        this._application.post('/usuario/', criarUsuarioRules(), validate, dependencies(this), (req, resp) => {
            responseHandle(resp, this._userBusiness.cadastrar(new Usuario(req.body)));
        })

        this._application.put('/usuario/', alterarUsuarioRules(), validate, verifyJWT, dependencies(this), (req, resp) => {
            responseHandle(resp, this._userBusiness.alterar(new Usuario(req.body)));
        })

        this._application.delete('/usuario', verifyJWT, dependencies(this), (req, resp) => {
            responseHandle(resp, this._userBusiness.deletar(req.usuarioId));
        });
    }
}

exports.UsuarioRoutes = UsuarioRoutes;