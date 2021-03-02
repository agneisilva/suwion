const { verifyJWT } = require('../infra/securityExtension');
const UsuarioBusiness = require('../business/usuarioBusiness.js').UsuarioBusiness;
const Usuario = require('../models/usuario').Usuario;
const {
    criarUsuarioRules,
    alterarUsuarioRules,
    deletarUsuarioRules,
    validate
} = require('../business/validacoes/usuarioValidacao');

var UsuarioRoutes = class UsuarioRoutes {
    constructor() { }

    registrarRotas() {
        //#region Usuarios

        this._application.get('/usuario/:id', verifyJWT, (req, resp) => {

            this._userBusiness.buscarPorId(req.body.usuarioId)
                .then(data => {
                    resp.status(data.status).json(data);
                })
                .catch(err => {
                    resp.status(err.status).json(err);
                });
        })

        this._application.get('/usuario/:email', verifyJWT, (req, resp) => {
            new UsuarioBusiness(req).buscarPorEmail(req.body.email)
                .then(data => {
                    resp.status(data.status).json(data);
                })
                .catch(err => {
                    resp.status(err.status).json(err);
                });
        })

        this._application.get('/usuario/:nickname', verifyJWT, (req, resp) => {
            new UsuarioBusiness(req).buscarPorNickName(req.body.nickname)
                .then(data => {
                    resp.status(data.status).json(data);
                })
                .catch(err => {
                    resp.status(err.status).json(err);
                });
        })

        this._application.get('/usuarios/:nickname', verifyJWT, (req, resp) => {
            new UsuarioBusiness(req).listarPorNickName(req.body.nickname)
                .then(data => {
                    resp.status(data.status).json(data);
                })
                .catch(err => {
                    resp.status(err.status).json(err);
                });
        })

        this._application.post('/usuario/', criarUsuarioRules(), validate, (req, resp) => {
            new UsuarioBusiness(req).cadastrar(new Usuario(req.body))
                .then(data => {
                    resp.status(data.status).json(data);
                })
                .catch(err => {
                    resp.status(err.status).json(err);
                });
        })

        this._application.put('/usuario/', alterarUsuarioRules(), validate, verifyJWT, (req, resp) => {
            new UsuarioBusiness(req).alterar(new Usuario(req.body))
                .then(data => {
                    resp.status(data.status).json(data);
                })
                .catch(err => {
                    resp.status(err.status).json(err);
                });
        })

        this._application.delete('/usuario', deletarUsuarioRules(), validate, verifyJWT, (req, resp) => {
            new UsuarioBusiness(req).deletar(req.body.usuarioId)
                .then(data => {
                    resp.status(data.status).json(data);
                })
                .catch(err => {
                    resp.status(err.status).json(err);
                });
        })
    }

    //#endregion Usuarios
}


exports.UsuarioRoutes = UsuarioRoutes;