const Ingrediente = require("../models/Ingrediente.js").Ingrediente;
const IngredienteMock = require("../mock/Ingrediente.js").IngredienteMock;

var IngredienteDAO = class IngredienteDAO {
    constructor(connection, application) {
        this._connection = connection;
        this._application = application;
    }

    listarIngrediente(filtro){
        //TODO retirar o mock e implementar o mongo
        return new Promise((res, rej)=>{
            res(IngredienteMock.Multiple);
        });
    }

    buscarIngredientePorId(ingredienteId){
        //TODO retirar o mock e implementar o mongo
        return new Promise((res, rej)=>{
            res(IngredienteMock.Single);
        });
    }

    cadastrarIngrediente(ingrediente){
        //TODO retirar o mock e implementar o mongo
        return new Promise((res, rej)=>{
            res(null);
        });
    }

    alterarIngrediente(ingrediente){
        //TODO retirar o mock e implementar o mongo
        return new Promise((res, rej)=>{
            res(null);
        });
    }

    deletarIngrediente(ingredienteId){
        //TODO retirar o mock e implementar o mongo
        return new Promise((res, rej)=>{
            res(null);
        });
    }

}

exports.IngredienteDAO = IngredienteDAO;