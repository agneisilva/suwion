const { verifyJWT } = require('../infra/securityExtension');
const UsuarioBusiness = require('../business/usuarioBusiness.js').UsuarioBusiness;


var UsuarioController = class UsuarioController {
    constructor(application) {
        this._application = application;
    }

    registrarRotas() {
        //#region Usuarios

        this._application.get('/usuario/:id', verifyJWT, (req, resp) => {
            new UsuarioBusiness(req).buscarPorId(req.body.usuarioId)
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

        this._application.post('/usuario/', (req, resp) => {
            new UsuarioBusiness(req).cadastrar(req.body)
                .then(data => {
                    resp.status(data.status).json(data);
                })
                .catch(err => {
                    resp.status(err.status).json(err);
                });
        })

        this._application.put('/usuario/', verifyJWT, (req, resp) => {
            new UsuarioBusiness(req).alterar(req.body)
                .then(data => {
                    resp.status(data.status).json(data);
                })
                .catch(err => {
                    resp.status(err.status).json(err);
                });
        })

        this._application.delete('/usuario', verifyJWT, (req, resp) => {
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


exports.UsuarioController = UsuarioController;