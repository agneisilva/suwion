const UsuarioDAO = require('../dao/UsuarioDAO.js').UsuarioDAO;
const CreateResponse = require('../infra/CreateResponse.js').CreateResponse;

var UsuarioBusiness = class UsuarioBusiness {
    constructor(require) {
        this._require = require;
    }

    buscarPorId(usuarioId) {
        return new Promise((res, rej) => {
            new UsuarioDAO(this._require.db).buscarPorId(usuarioId)
                .then((data) => {
                    //Success
                    res(new CreateResponse().Success(data));
                })
                .catch((err) => {
                    //Error
                    rej(new CreateResponse().Erro("Erro ao Buscar Usuario!"));
                });
        });
    }

    buscarPorEmail(email) {
        return new Promise((res, rej) => {
            new UsuarioDAO(this._require.db).buscarPorEmail(email)
                .then((data) => {
                    //Success
                    res(new CreateResponse().Success(data));
                })
                .catch((err) => {
                    //Error
                    rej(new CreateResponse().Erro("Erro ao Buscar Usuario!"));
                });
        });
    }

    buscarPorNickName(nickName) {
        return new Promise((res, rej) => {
            new UsuarioDAO(this._require.db).buscarPorNickName(nickName)
                .then((data) => {
                    //Success
                    res(new CreateResponse().Success(data));
                })
                .catch((err) => {
                    //Error
                    rej(new CreateResponse().Erro("Erro ao Buscar Usuario!"));
                });
        });
    }

    listarPorNickName(nickName) {
        return new Promise((res, rej) => {
            new UsuarioDAO(this._require.db).listarPorNickName(nickName)
                .then((data) => {
                    //Success
                    res(new CreateResponse().Success(data));
                })
                .catch((err) => {
                    //Error
                    rej(new CreateResponse().Erro("Erro ao Localizar Usuarios!"));
                });
        });
    }

    cadastrar(user) {
        return new Promise((res, rej) => {
            new UsuarioDAO(this._require.db).cadastrar(user)
                .then((data) => {
                    //Success
                    res(new CreateResponse().Success(data));
                })
                .catch((err) => {
                    //Error
                    rej(new CreateResponse().Erro("Erro ao Cadastrar Usuarios!"));
                });
        });
    }
}

exports.UsuarioBusiness = UsuarioBusiness;