const IngredienteDAO = require('../dao/IngredienteDAO.js').IngredienteDAO;
const CreateResponse = require('../infra/CreateResponse.js').CreateResponse;
const { v4:uuid } = require('uuid');

var IngredienteBusiness = class IngredienteBusiness {
    constructor(require) {
        this._require = require;
    }

    listar(filtro) {
        return new Promise((res, rej) => {
            new IngredienteDAO(this._require.db).listar(filtro)
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

    buscarPorId(ingredienteId) {
        return new Promise((res, rej) => {
            new IngredienteDAO(this._require.db).buscarPorId(ingredienteId)
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

    buscar(descricao) {
        return new Promise((res, rej) => {
            new IngredienteDAO(this._require.db).buscar(descricao)
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

    cadastrar(ingrediente) {
        return new Promise((res, rej) => {
            
            new IngredienteDAO(this._require.db).cadastrar(ingrediente)
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

    alterar(ingrediente) {
        return new Promise((res, rej) => {
            new IngredienteDAO(this._require.db).alterar(ingrediente)
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

    deletar(ingredienteId) {
        return new Promise((res, rej) => {
            new IngredienteDAO(this._require.db).deletar(ingredienteId)
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