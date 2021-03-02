var mongo = require('mongodb');

const Collection = "usuario";

var UsuarioDAO = class UsuarioDAO {
    constructor({connection}) {
        this._connection = connection;
        this.collection = this._connection.collection(Collection);
    }

    buscarPorId(id){
        const query = { _id: new mongo.ObjectID(id) };

        return new Promise((res, rej) => {
            this.collection.findOne(query, (err, result) => {
                if (err) rej(err);

                res(result);
            });
        });
    }

    buscarPorEmail(email){
        //TODO
        const query = { email: email };

        return new Promise((res, rej) => {
            this.collection.findOne(query, (err, result) => {
                if (err) rej(err);

                res(result);
            });
        });
    }

    buscarPorNickName(nickName){
        const query = { nickName: nickName };

        return new Promise((res, rej) => {
            this.collection.findOne(query, (err, result) => {
                if (err) rej(err);

                res(result);
            });
        });
    }

    //Qual a diferenca entre listarPorNickName() e buscarPorNickName()???
    listarPorNickName(nickName){
        const query = { nickName: nickName };

        return new Promise((res, rej) => {
            this.collection.find(query).toArray((err, result) => {
                if (err) rej(err);

                res(result);
            });
        });
    }

    cadastrar(usuario){
        return new Promise((res, rej) => {
            this.collection.insertOne(usuario, (err, result) => {
                if (err) rej(err);

                res(usuario);
            });
        });
    }

    alterar(usuario) {
        //Criando query de busca para alteração
        const query = { _id: new mongo.ObjectID(usuario._id) };
        //Removendo propriedade Id do object para não permitir alterar o Id 
        delete usuario._id;
        //Criando novo objeto que será alterado 
        var newvalues = { $set: usuario };

        return new Promise((res, rej) => {
            this.collection.updateOne(query, newvalues, (err, result) => {
                if (err) rej(err);

                res(result);
            });
        });
    }

    deletar(usuarioId) {
        const query = { _id: new mongo.ObjectID(usuarioId) };

        return new Promise((res, rej) => {
            this.collection.deleteOne(query, (err, result) => {
                if (err) rej(err);

                res(result);
            });
        });
    }
}

exports.UsuarioDAO = UsuarioDAO;