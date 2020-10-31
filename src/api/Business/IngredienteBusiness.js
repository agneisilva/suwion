const IngredienteDAO = require('../dao/ingredienteDAO.js').IngredienteDAO;
const CreateResponse = require('../infra/CreateResponse.js').CreateResponse;

var IngredienteBusiness = class IngredienteBusiness {
    constructor(require, application) {
        this._require = require;
        this._application = application;
    }

    listarIngrediente(conn, filtro, callback){
        new IngredienteDAO(conn, this._application).listarIngrediente(filtro)
        .then((data)=>{
            //Success
            callback(undefined, new CreateResponse().Success(data));
        })
        .catch((err)=>{
            //Error
            callback(new CreateResponse().Erro("Erro ao listar Ingredientes!"));
        });
    }

    buscarIngredientePorId(conn, ingredienteId, callback){
        new IngredienteDAO(conn, this._application).buscarIngredientePorId(ingredienteId)
        .then((data)=>{
            //Success
            callback(undefined, new CreateResponse().Success(data));
        })
        .catch((err)=>{
            //Error
            callback(new CreateResponse().Erro("Erro ao buscar Ingredientes!"));
        });
    }

    cadastrarIngrediente(conn, ingrediente, callback){
        new IngredienteDAO(conn, this._application).cadastrarIngrediente(ingrediente)
        .then((data)=>{
            //Success
            callback(undefined, new CreateResponse().Success(data));
        })
        .catch((err)=>{
            //Error
            callback(new CreateResponse().Erro("Erro ao Cadastrar Ingrediente!"));
        });
    }

    alterarIngrediente(conn, ingrediente, callback){
        new IngredienteDAO(conn, this._application).alterarIngrediente(ingrediente)
        .then((data)=>{
            //Success
            callback(undefined, new CreateResponse().Success(data));
        })
        .catch((err)=>{
            //Error
            callback(new CreateResponse().Erro("Erro ao Alterar Ingrediente!"));
        });
    }

    deletarIngrediente(conn, ingredienteId, callback){
        new IngredienteDAO(conn, this._application).deletarIngrediente(ingredienteId)
        .then((data)=>{
            //Success
            callback(undefined, new CreateResponse().Success(data));
        })
        .catch((err)=>{
            //Error
            callback(new CreateResponse().Erro("Erro ao Cadastrar Deletado!"));
        });
    }
}

exports.IngredienteBusiness = IngredienteBusiness;