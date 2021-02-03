const { verifyJWT } = require('../infra/securityExtension');


var AutenticacaoController = class AutenticacaoController {
    constructor(application) {
        this._application = application;
    }

    registrarRotas() {

        //#region Autenticação

        this._application.post('/login', (req, res) => {
            new UsuarioBusiness(req).autenticar(req.body)
                .then(data => {
                    res.status(data.status).json(data);
                })
                .catch(err => {
                    res.status(err.status).json(err);
                });
        })

        //#endregion Autenticação
    }

}


exports.AutenticacaoController = AutenticacaoController;