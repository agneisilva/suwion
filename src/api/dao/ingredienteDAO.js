const Ingrediente = require("../models/Ingrediente.js").Ingrediente;
const IngredienteMock = require("../mock/Ingrediente.js").IngredienteMock;

var IngredienteDAO = class IngredienteDAO {
    constructor(connection, application) {
        this._connection = connection;
        this._application = application;
    }

    listarIngrediente(filtro){
        //TODO
    }

    buscarIngredientePorId(ingredienteId){
        //TODO retirar o mock e implementar o mongo
        return new Promise((res, rej)=>{
            res(IngredienteMock.Single);
        });
    }

    cadastrarIngrediente(ingrediente){
        //TODO
    }

    alterarIngrediente(ingrediente){
        //TODO
    }

    deletarIngrediente(ingredienteId){
        //TODO
    }

}

exports.IngredienteDAO = IngredienteDAO;