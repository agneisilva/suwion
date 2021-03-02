const { verifyJWT } = require('../infra/securityExtension');
const IngredienteBusiness = require('../business/ingredienteBusiness.js').IngredienteBusiness;
const { criarIngredienteRules, alterarIngredienteRules, deletarIngredienteRules, validate } = require('../business/validacoes/ingredienteValidacao');
const Ingrediente = require('../models/ingrediente').Ingrediente;

var IngredienteRoutes = class IngredienteRoutes {
    constructor(application) {
        this._application = application;
    }

    registrarRotas() {
        //#region Ingredientes

        this._application.get('/ingrediente/:id', verifyJWT, (req, resp) => {
            new IngredienteBusiness(req).buscarPorId(req.params.id)
                .then(data => {
                    resp.status(data.status).json(data);
                })
                .catch(err => {
                    resp.status(err.status).json(err);
                });
        })

        this._application.get('/ingredientes/:descricao', verifyJWT, (req, resp) => {
            new IngredienteBusiness(req).buscar(req.params.descricao)
                .then(data => {
                    resp.status(data.status).json(data);
                })
                .catch(err => {
                    resp.status(err.status).json(err);
                });
        })

        this._application.get('/ingredientes', verifyJWT, (req, resp) => {
            new IngredienteBusiness(req).listar(req.body)
                .then(data => {
                    resp.status(data.status).json(data);
                })
                .catch(err => {
                    resp.status(err.status).json(err);
                });
        })

        this._application.post('/ingrediente', criarIngredienteRules(), validate, verifyJWT, (req, resp) => {
            new IngredienteBusiness(req).cadastrar(new Ingrediente(req.body))
                .then(data => {
                    resp.status(data.status).json(data);
                })
                .catch(err => {
                    console.log(err.message);
                    //resp.status(err.status).json(err);
                });

        })

        this._application.put('/ingrediente', alterarIngredienteRules(), validate, verifyJWT, (req, resp) => {
            new IngredienteBusiness(req).alterar(new Ingrediente(req.body))
                .then(data => {
                    resp.status(data.status).json(data);
                })
                .catch(err => {
                    resp.status(err.status).json(err);
                });
        })

        this._application.delete('/ingrediente', deletarIngredienteRules(), validate, verifyJWT, (req, resp) => {
            new IngredienteBusiness(req).deletar(req.body.ingredienteId)
                .then(data => {
                    resp.status(data.status).json(data);
                })
                .catch(err => {
                    resp.status(err.status).json(err);
                });
        })

        //#endregion Ingredientes
        return this;
    }

}


exports.IngredienteRoutes = IngredienteRoutes;