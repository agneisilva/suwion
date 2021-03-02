const IngredienteDAO = require('../dao/ingredienteDAO.js').IngredienteDAO;
const { CreateResponse, FormatType: Formato } = require('../infra/createResponse.js');


var IngredienteBusiness = class IngredienteBusiness {
    constructor(require) {
        this._require = require;
    }

    listar(filtro, format) {
        return new Promise((res, rej) => {
            new IngredienteDAO(this._require.db).listar(filtro)
                .then((data) => {
                    
                    res(new CreateResponse().Success(data, format));
                })
                .catch((err) => {
                    
                    rej(new CreateResponse().Erro("Erro ao Listar Ingredientes!"));
                });
        });
    }

    buscarPorId(ingredienteId, format) {
        return new Promise((res, rej) => {
            new IngredienteDAO(this._require.db).buscarPorId(ingredienteId)
                .then((data) => {
                    
                    res(new CreateResponse().Success(data, format));
                })
                .catch((err) => {
                    
                    rej(new CreateResponse().Erro("Erro ao Buscar Ingredientes!"));
                });
        });
    }

    buscar(descricao, format) {
        return new Promise((res, rej) => {
            new IngredienteDAO(this._require.db).buscar(descricao)
                .then((data) => {

                    res(new CreateResponse().Success(data, format));
                })
                .catch((err) => {

                    rej(new CreateResponse().Erro("Erro ao Buscar Ingredientes!"));
                });
        });
    }

    cadastrar(ingrediente) {
        return new Promise((res, rej) => {
            
            new IngredienteDAO(this._require.db).cadastrar(ingrediente)
                .then((data) => {
                    
                    res(new CreateResponse().Success(data));
                })
                .catch((err) => {
                    
                    rej(new CreateResponse().Erro("Erro ao Cadastrar Ingrediente!"));
                });
        });
    }

    alterar(ingrediente) {
        return new Promise((res, rej) => {

            //var ingredienteExistente = await this.buscarPorId(ingrediente._id, Formato.RAW);

           // if(!ingredienteExistente)
                // return rej(new CreateResponse().Erro("Ingrediente já existe!"));

            new IngredienteDAO(this._require.db).alterar(ingrediente)
                .then((data) => {
                    
                    res(new CreateResponse().Success("Sucesso ao Alterar Ingrediente!"));
                })
                .catch((err) => {
                    
                    rej(new CreateResponse().Erro("Erro ao Alterar Ingrediente!"));
                });
        });
    }

    deletar(ingredienteId) {
        return new Promise((res, rej) => {
            new IngredienteDAO(this._require.db).deletar(ingredienteId)
                .then((data) => {
                    
                    res(new CreateResponse().Success("Sucesso ao Deletar Ingrediente!"));
                })
                .catch((err) => {
                    
                    rej(new CreateResponse().Erro("Erro ao Deletar Ingrediente!"));
                });
        });
    }
}

exports.IngredienteBusiness = IngredienteBusiness;