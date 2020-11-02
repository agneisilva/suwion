const Ingrediente = require("../models/Ingrediente.js").Ingrediente;
const IngredienteMock = require("../mock/Ingrediente.js").IngredienteMock;
var mongo = require('mongodb');
const registerRouter = require("../routes/registerRouter.js");

const Collection = "ingrediente";

var IngredienteDAO = class IngredienteDAO {
    constructor(connection) {
        this._connection = connection;
        this.collection = this._connection.collection(Collection);
    }

    listarIngrediente(filtro) {
        //TODO retirar o mock e implementar o mongo
        return new Promise((res, rej) => {
            this.collection.find(filtro || {}).toArray((err, result) => {
                if (err) rej(err);

                res(result);
            });
            //res(IngredienteMock.Multiple);
        });
    }

    buscarIngredientePorId(ingredienteId) {
        //TODO retirar o mock e implementar o mongo
        const query = { _id: new mongo.ObjectID(ingredienteId) };

        return new Promise((res, rej) => {
            this.collection.findOne(query, (err, result) => {
                if (err) rej(err);

                res(result);
            });
            //res(IngredienteMock.Single);
        });
    }

    buscarIngredientes(descricao) {
        //TODO retirar o mock e implementar o mongo

        const query = { descricao: {'$regex': descricao, '$options': 'i' } };

        return new Promise((res, rej) => {
            this.collection.find(query).toArray((err, result) => {
                if (err) rej(err);

                res(result);
            });
            //res(IngredienteMock.Single);
        });
    }

    cadastrarIngrediente(ingrediente) {
        //TODO retirar o mock e implementar o mongo
        return new Promise((res, rej) => {
            this.collection.insertOne(ingrediente, (err, result) => {
                if (err) rej(err);

                res(ingrediente);
                console.log("1 document inserted");
            });
        });
    }

    alterarIngrediente(ingrediente) {
        //TODO retirar o mock e implementar o mongo
        return new Promise((res, rej) => {
            res(null);
        });
    }

    deletarIngrediente(ingredienteId) {
        //TODO retirar o mock e implementar o mongo
        return new Promise((res, rej) => {
            res(null);
        });
    }

}

exports.IngredienteDAO = IngredienteDAO;