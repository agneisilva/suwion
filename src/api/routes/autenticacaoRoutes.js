const { logarUsuarioRules, validate } = require('../business/validacoes/usuarioValidacao');

var AutenticacaoRoutes = class AutenticacaoRoutes {
    constructor(application) {
        this._application = application;
    }

    registrarRotas() {

        //#region Autenticação

        this._application.post('/login', logarUsuarioRules(), validate, (req, res) => {
            new UsuarioBusiness(req).autenticar(req.body)
                .then(data => {
                    res.status(data.status).json(data);
                })
                .catch(err => {
                    res.status(err.status).json(err);
                });
        })

        return this;

        //#endregion Autenticação
    }

}


exports.AutenticacaoRoutes = AutenticacaoRoutes;