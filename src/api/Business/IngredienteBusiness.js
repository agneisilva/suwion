const IngredienteDAO = require('../dao/ingredienteDAO.js').IngredienteDAO;
const CreateResponse = require('../infra/CreateResponse.js').CreateResponse;
const { v4:uuid } = require('uuid');

var IngredienteBusiness = class IngredienteBusiness {
    constructor(require) {
        this._require = require;
    }

    listarIngrediente(filtro) {
        return new Promise((res, rej) => {
            new IngredienteDAO(this._require.db).listarIngrediente(filtro)
                .then((data) => {
                    //Success
                    res(new CreateResponse().Success(data));
                })
                .catch((err) => {
                    //Error
                    rej(new CreateResponse().Erro("Erro ao Listar Ingredientes!"));
                });
        });
    }

    buscarIngredientePorId(ingredienteId) {
        return new Promise((res, rej) => {
            new IngredienteDAO(this._require.db).buscarIngredientePorId(ingredienteId)
                .then((data) => {
                    //Success
                    res(new CreateResponse().Success(data));
                })
                .catch((err) => {
                    //Error
                    rej(new CreateResponse().Erro("Erro ao Buscar Ingredientes!"));
                });
        });
    }

    buscarIngredientes(descricao) {
        return new Promise((res, rej) => {
            new IngredienteDAO(this._require.db).buscarIngredientes(descricao)
                .then((data) => {
                    //Success
                    res(new CreateResponse().Success(data));
                })
                .catch((err) => {
                    //Error
                    rej(new CreateResponse().Erro("Erro ao Buscar Ingredientes!"));
                });
        });
    }

    cadastrarIngrediente(ingrediente) {
        return new Promise((res, rej) => {
            
            new IngredienteDAO(this._require.db).cadastrarIngrediente(ingrediente)
                .then((data) => {
                    //Success
                    res(new CreateResponse().Success(data));
                })
                .catch((err) => {
                    //Error
                    rej(new CreateResponse().Erro("Erro ao Cadastrar Ingrediente!"));
                });
        });
    }

    alterarIngrediente(ingrediente) {
        return new Promise((res, rej) => {
            new IngredienteDAO(this._require.db).alterarIngrediente(ingrediente)
                .then((data) => {
                    //Success
                    res(new CreateResponse().Success("Sucesso ao Alterar Ingrediente!"));
                })
                .catch((err) => {
                    //Error
                    rej(new CreateResponse().Erro("Erro ao Alterar Ingrediente!"));
                });
        });
    }

    deletarIngrediente(ingredienteId) {
        return new Promise((res, rej) => {
            new IngredienteDAO(this._require.db).deletarIngrediente(ingredienteId)
                .then((data) => {
                    //Success
                    res(new CreateResponse().Success("Sucesso ao Deletar Ingrediente!"));
                })
                .catch((err) => {
                    //Error
                    rej(new CreateResponse().Erro("Erro ao Deletar Ingrediente!"));
                });
        });
    }
}

exports.IngredienteBusiness = IngredienteBusiness;