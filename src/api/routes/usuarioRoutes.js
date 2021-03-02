const { verifyJWT } = require('../infra/securityExtension');
const UsuarioBusiness = require('../business/usuarioBusiness.js').UsuarioBusiness;
const Usuario = require('../models/usuario').Usuario;
const dependencies = require('../infra/dependencyInjection.js').LoadDependencies;
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
        //#region Usuarios

        this._application.get('/usuario/:id', verifyJWT, (req, resp) => {

            dependencies(this, req.dependencies)._userBusiness.buscarPorId(req.body.usuarioId)
                .then(data => {
                    resp.status(data.status).json(data);
                })
                .catch(err => {
                    resp.status(err.status).json(err);
                });
        })

        this._application.get('/usuario/:email', verifyJWT, (req, resp) => {
            dependencies(this, req.dependencies).buscarPorEmail(req.body.email)
                .then(data => {
                    resp.status(data.status).json(data);
                })
                .catch(err => {
                    resp.status(err.status).json(err);
                });
        })

        this._application.get('/usuario/:nickname', verifyJWT, (req, resp) => {
            dependencies(this, req.dependencies).buscarPorNickName(req.body.nickname)
                .then(data => {
                    resp.status(data.status).json(data);
                })
                .catch(err => {
                    resp.status(err.status).json(err);
                });
        })

        this._application.get('/usuarios/:nickname', verifyJWT, (req, resp) => {
            dependencies(this, req.dependencies).listarPorNickName(req.body.nickname)
                .then(data => {
                    resp.status(data.status).json(data);
                })
                .catch(err => {
                    resp.status(err.status).json(err);
                });
        })

        this._application.post('/usuario/', criarUsuarioRules(), validate, (req, resp) => {
            dependencies(this, req.dependencies).cadastrar(new Usuario(req.body))
                .then(data => {
                    resp.status(data.status).json(data);
                })
                .catch(err => {
                    resp.status(err.status).json(err);
                });
        })

        this._application.put('/usuario/', alterarUsuarioRules(), validate, verifyJWT, (req, resp) => {
            dependencies(this, req.dependencies).alterar(new Usuario(req.body))
                .then(data => {
                    resp.status(data.status).json(data);
                })
                .catch(err => {
                    resp.status(err.status).json(err);
                });
        })

        this._application.delete('/usuario', deletarUsuarioRules(), validate, verifyJWT, (req, resp) => {
            dependencies(this, req.dependencies).deletar(req.body.usuarioId)
                .then(data => {
                    resp.status(data.status).json(data);
                })
                .catch(err => {
                    resp.status(err.status).json(err);
                });
        });

        return this;
    }

    //#endregion Usuarios
}


exports.UsuarioRoutes = UsuarioRoutes;