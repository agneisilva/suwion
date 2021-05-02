const {
    ToObjectID,
    selectConteins,
    selectExact,
    selectById,
    updateById,
    getCompleteDoc
} = require('../infra/mongoQueryHelper.js');

const Collection = "receita";

var ReceitaDAO = class ReceitaDAO {
    constructor({connection}) {
        this._connection = connection;
        this.collection = this._connection.collection(Collection);
    }

    buscarPorId(id){
        let query = getCompleteDoc(id, "autor", "usuario", "_id");
        return new Promise((res, rejec) => {
            this.collection.aggregate(query, (err, result) => {
                if (err) rejec(err);

                result.toArray().then(
                    receitas=>{
                        if(receitas.length == 1) res(receitas[0]);
                        else rejec(new Error("Erro ao localizar a receita!"));
                    }
                ).catch(err=>{
                    rejec(err);
                });
            });
        });
    }

    cadastrar(receita){
        receita.autor = ToObjectID(receita.autor);
        return new Promise((res, rejec) => {
            this.collection.insertOne(receita, (err, result) => {
                if (err) rejec(err);

                res(receita);
            });
        });
    }

    filtrar(filtros){
        //TODO
        return new Promise((res, rejec) => {
            res("DAO NÃO IMPLEMENTADO");
        });
    }
}

exports.ReceitaDAO = ReceitaDAO;