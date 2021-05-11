const { verifyJWT } = require('../infra/securityExtension');
const Ingrediente = require('../models/ingrediente').Ingrediente;
const dependencies = require('../infra/dependencyInjection.js').LoadDependencies;
const { responseHandle } = require('../infra/createResponse.js');
const {
    criarIngredienteRules,
    alterarIngredienteRules,
    deletarIngredienteRules,
    validate
} = require('../business/validacoes/ingredienteValidacao');

var IngredienteRoutes = class IngredienteRoutes {
    constructor(app) {
        this._application = app;
    }

    registrarRotas() {
        this._application.get('/ingrediente/:id', verifyJWT, dependencies(this), (req, resp) => {
            responseHandle(resp, this._ingredienteBusiness.buscarPorId(req.params.id));
        })

        this._application.get('/ingredientes/:descricao', verifyJWT, dependencies(this), (req, resp) => {
            responseHandle(resp, this._ingredienteBusiness.buscar(req.params.descricao));
        })

        this._application.post('/ingredientes', verifyJWT, dependencies(this), (req, resp) => {
            responseHandle(resp, this._ingredienteBusiness.listar(req.body));
        })

        this._application.post('/ingrediente', criarIngredienteRules(), validate, verifyJWT, dependencies(this), (req, resp) => {
            responseHandle(resp, this._ingredienteBusiness.cadastrar(new Ingrediente(req.body)));
        })

        this._application.post('/ingredientes/autocomplete', dependencies(this), (req, resp)=>{
            responseHandle(resp, this._ingredienteBusiness.buscarAutoComplete(req.body.descricao));
        })

        this._application.put('/ingrediente', alterarIngredienteRules(), validate, verifyJWT, dependencies(this), (req, resp) => {
            responseHandle(resp, this._ingredienteBusiness.alterar(new Ingrediente(req.body)));
        })

        this._application.delete('/ingrediente', deletarIngredienteRules(), validate, verifyJWT, dependencies(this), (req, resp) => {
            responseHandle(resp, this._ingredienteBusiness.deletar(req.body.ingredienteId));
        })
    }
}

exports.IngredienteRoutes = IngredienteRoutes;