const { selectExact, selectById, updateById } = require('../infra/mongoQueryHelper.js');
const Collection = "ingrediente";

var IngredienteDAO = class IngredienteDAO {
    constructor({ connection }) {
        this._connection = connection;
        this.collection = this._connection.collection(Collection);
    }

    listar(filtro) {
        return new Promise((res, rej) => {
            this.collection.find(filtro || {}).toArray((err, result) => {
                if (err) rej(err);

                res(result);
            });
        });
    }

    buscarPorId(ingredienteId) {
        //const query = { _id: new mongo.ObjectID(ingredienteId) };

        return new Promise((res, rej) => {
            this.collection.findOne(selectById(ingredienteId), (err, result) => {
                if (err) rej(err);

                res(result);
            });
        });
    }

    buscar(descricao) {
        return new Promise((res, rej) => {
            this.collection.findOne(selectExact("descricao", descricao), (err, result) => {
                if (err) rej(err);

                res(result);
            });
        });
    }

    cadastrar(ingrediente) {
        return new Promise((res, rej) => {
            this.collection.insertOne(ingrediente, (err, result) => {
                if (err) rej(err);

                res(ingrediente);
            });
        });
    }

    alterar(ingrediente) {
        let query = updateById(ingrediente);

        return new Promise((res, rej) => {
            this.collection.updateOne(query[0], query[1], (err, result) => {
                if (err) rej(err);

                res(result);
            });
        });
    }

    deletar(ingredienteId) {
        return new Promise((res, rej) => {
            this.collection.deleteOne(selectById(ingredienteId), (err, result) => {
                if (err) rej(err);

                res(result);
            });
        });
    }
}

exports.IngredienteDAO = IngredienteDAO;