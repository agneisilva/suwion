const ReceitaDAO = require('../dao/ReceitaDAO.js').ReceitaDAO;
const CreateResponse = require('../infra/CreateResponse.js').CreateResponse;

var ReceitaBusiness = class ReceitaBusiness {
    constructor(require) {
        this._require = require;
    }

    buscarPorId(id) {
        //TODO
        return new Promise((res, rej) => {
            new ReceitaDAO(this._require.db).buscarPorId(id)
                .then((data) => {
                    //Success
                    res(new CreateResponse().Success(data));
                })
                .catch((err) => {
                    //Error
                    rej(new CreateResponse().Erro("Erro ao Buscar Receita!"));
                });
        });
    }

    cadastrar(receita) {
        //TODO
        return new Promise((res, rej) => {
            new ReceitaDAO(this._require.db).cadastrar(receita)
                .then((data) => {
                    //Success
                    res(new CreateResponse().Success(data));
                })
                .catch((err) => {
                    //Error
                    rej(new CreateResponse().Erro("Erro ao Cadastrar Receita!"));
                });
        });
    }

    filtrar(filtros) {
        //TODO implementar filtros avancados de receitas
        /*
            nome,
            tag,
            autor,
            nota,
            (pensar em mais filtros)
        */
        return new Promise((res, rej) => {
            new ReceitaDAO(this._require.db).filtrar(filtros)
                .then((data) => {
                    //Success
                    res(new CreateResponse().Success(data));
                })
                .catch((err) => {
                    //Error
                    rej(new CreateResponse().Erro("Erro ao Localizar Receitas!"));
                });
        });
    }
}

exports.ReceitaBusiness = ReceitaBusiness;