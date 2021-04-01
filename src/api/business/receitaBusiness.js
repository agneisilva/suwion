
var ReceitaBusiness = class ReceitaBusiness {
    constructor({ dao }) {
        this._dao = dao;
    }

    buscarPorId(id) {
        //TODO
        return new Promise((res, rej) => {
            this._dao.buscarPorId(id)
                .then((data) => {
                    //Success
                    res(data);
                })
                .catch((err) => {
                    //Error
                    rej("Erro ao Buscar Receita!");
                });
        });
    }

    cadastrar(receita) {
        //TODO
        return new Promise((res, rej) => {
            this._dao.cadastrar(receita)
                .then((data) => {
                    //Success
                    res(data);
                })
                .catch((err) => {
                    //Error
                    rej("Erro ao Cadastrar Receita!");
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
            this._dao.filtrar(filtros)
                .then((data) => {
                    //Success
                    res(data);
                })
                .catch((err) => {
                    //Error
                    rej("Erro ao Localizar Receitas!");
                });
        });
    }
}

exports.ReceitaBusiness = ReceitaBusiness;