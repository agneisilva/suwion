const { verifyJWT } = require('../infra/securityExtension');
const IngredienteBusiness = require('../business/ingredienteBusiness.js').IngredienteBusiness;


var IngredienteController = class IngredienteController {
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

        this._application.post('/ingrediente', verifyJWT, (req, resp) => {

            try {
                new IngredienteBusiness(req).cadastrar(req.body)
                    .then(data => {
                        resp.status(data.status).json(data);
                    })
                    .catch(err => {
                        console.log(err.message);
                        //resp.status(err.status).json(err);
                    });
            }
            catch (err) {
                console.log(err.message);
            }

        })

        this._application.put('/ingrediente', verifyJWT, (req, resp) => {
            new IngredienteBusiness(req).alterar(req.body)
                .then(data => {
                    resp.status(data.status).json(data);
                })
                .catch(err => {
                    resp.status(err.status).json(err);
                });
        })

        this._application.delete('/ingrediente', verifyJWT, (req, resp) => {
            new IngredienteBusiness(req).deletar(req.body.ingredienteId)
                .then(data => {
                    resp.status(data.status).json(data);
                })
                .catch(err => {
                    resp.status(err.status).json(err);
                });
        })

        //#endregion Ingredientes

    }

}


exports.IngredienteController = IngredienteController;