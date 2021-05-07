
var IngredienteBusiness = class IngredienteBusiness {
    constructor({ ingredienteDao }) {
        this._dao = ingredienteDao;
    }

    listar(filtro) {
        return new Promise((res, rej) => {
            this._dao.listar(filtro)
                .then((data) => {
                    res(data);
                })
                .catch((err) => {
                    rej("Erro ao Listar Ingredientes!");
                });
        });
    }

    buscarPorId(ingredienteId) {
        return new Promise((res, rej) => {
            this._dao.buscarPorId(ingredienteId)
                .then((data) => {
                    res(data);
                })
                .catch((err) => {
                    rej("Erro ao Buscar Ingredientes!");
                });
        });
    }

    buscar(descricao) {
        return new Promise((res, rej) => {
            this._dao.buscar(descricao)
                .then((data) => {
                    res(data);
                })
                .catch((err) => {
                    rej("Erro ao Buscar Ingredientes!");
                });
        });
    }

    buscarAutoComplete(descricao){
        return new Promise((res, rej)=>{
            const limite = 20;

            this._dao.buscarAutoComplete(descricao, limite)
                .then(ingredientes=>{
                    res(ingredientes);
                })
                .catch(err=>{
                    rej("Erro ao listar ingredientes!");
                });
        });
    }

    cadastrar(ingrediente) {
        return new Promise((res, rej) => {
            this._dao.cadastrar(ingrediente)
                .then((data) => {
                    res(data);
                })
                .catch((err) => {
                    rej("Erro ao Cadastrar Ingrediente!");
                });
        });
    }

    alterar(ingrediente) {
        return new Promise((res, rej) => {
            this._dao.alterar(ingrediente)
                .then((data) => {
                    res("Sucesso ao Alterar Ingrediente!");
                })
                .catch((err) => {
                    rej("Erro ao Alterar Ingrediente!");
                });
        });
    }

    deletar(ingredienteId) {
        return new Promise((res, rej) => {
            this._dao.deletar(ingredienteId)
                .then((data) => {
                    res("Sucesso ao Deletar Ingrediente!");
                })
                .catch((err) => {
                    rej("Erro ao Deletar Ingrediente!");
                });
        });
    }
}

exports.IngredienteBusiness = IngredienteBusiness;