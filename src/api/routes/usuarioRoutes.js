const { verifyJWT } = require('../infra/securityExtension');
const Usuario = require('../models/usuario').Usuario;
const dependencies = require('../infra/dependencyInjection.js').LoadDependencies;
const { responseHandle } = require('../infra/CreateResponse.js');
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
            responseHandle(resp, this._userBusiness.buscarPorId(req.body.usuarioId));
        })

        this._application.get('/usuario/:email', verifyJWT, dependencies(this), (req, resp) => {
            responseHandle(resp, this._userBusiness.buscarPorEmail(req.body.email));
        })

        this._application.get('/usuario/:nickname', verifyJWT, dependencies(this), (req, resp) => {
            responseHandle(resp, this._userBusiness.buscarPorNickName(req.body.nickname));
        })

        this._application.get('/usuarios/:nickname', verifyJWT, dependencies(this), (req, resp) => {
            responseHandle(resp, this._userBusiness.listarPorNickName(req.body.nickname));
        })

        this._application.post('/usuario/', criarUsuarioRules(), validate, dependencies(this), (req, resp) => {
            responseHandle(resp, this._userBusiness.cadastrar(new Usuario(req.body)));
        })

        this._application.put('/usuario/', alterarUsuarioRules(), validate, verifyJWT, dependencies(this), (req, resp) => {
            responseHandle(resp, this._userBusiness.alterar(new Usuario(req.body)));
        })

        this._application.delete('/usuario', deletarUsuarioRules(), validate, verifyJWT, dependencies(this), (req, resp) => {
            responseHandle(resp, this._userBusiness.deletar(req.body.usuarioId));
        });
    }
}

exports.UsuarioRoutes = UsuarioRoutes;