const UsuarioDAO = require('../dao/UsuarioDAO.js').UsuarioDAO;
const { CreateResponse, FormatType: Formato } = require('../infra/CreateResponse.js');
const { genRandomString, sha512 } = require('../infra/SecurityExtension');
const jwt = require('jsonwebtoken');

var UsuarioBusiness = class UsuarioBusiness {
    constructor(require) {
        this._require = require;
    }

    buscarPorId(usuarioId, format) {
        return new Promise((res, rej) => {
            new UsuarioDAO(this._require.db).buscarPorId(usuarioId)
                .then((data) => {
                    //Success
                    res(new CreateResponse().Success(data, format));
                })
                .catch((err) => {
                    //Error
                    rej(new CreateResponse().Erro("Erro ao Buscar Usuario!"));
                });
        });
    }

    buscarPorEmail(email, format) {
        return new Promise((res, rej) => {
            new UsuarioDAO(this._require.db).buscarPorEmail(email)
                .then((data) => {
                    //Success
                    res(new CreateResponse().Success(data, format));
                })
                .catch((err) => {
                    //Error
                    rej(new CreateResponse().Erro("Erro ao Buscar Usuário!"));
                });
        });
    }

    buscarPorNickName(nickName, format) {
        return new Promise((res, rej) => {
            new UsuarioDAO(this._require.db).buscarPorNickName(nickName)
                .then((data) => {
                    //Success
                    res(new CreateResponse().Success(data, format));
                })
                .catch((err) => {
                    //Error
                    rej(new CreateResponse().Erro("Erro ao Buscar Usuario!"));
                });
        });
    }

    listarPorNickName(nickName, format) {
        return new Promise((res, rej) => {
            new UsuarioDAO(this._require.db).listarPorNickName(nickName)
                .then((data) => {
                    //Success
                    res(new CreateResponse().Success(data, format));
                })
                .catch((err) => {
                    //Error
                    rej(new CreateResponse().Erro("Erro ao Buscar Usuarios!"));
                });
        });
    }

    cadastrar(usuario, format) {

        return new Promise((res, rej) => {

            usuario.salt = genRandomString(10);
            usuario.senha = sha512(usuario.senha, usuario.salt);

            new UsuarioDAO(this._require.db).cadastrar(usuario)
                .then((data) => {
                    //Success
                    res(new CreateResponse().Success({Id: data._id, nickName: data.nickName}, format));
                })
                .catch((err) => {
                    //Error
                    rej(new CreateResponse().Erro("Erro ao Cadastrar Usuário!"));
                });
        });
    }

    alterar(usuario, format) {
        return new Promise((res, rej) => {

            usuario.salt = genRandomString(10);
            usuario.senha = sha512(usuario.senha, usuario.salt);


            new UsuarioDAO(this._require.db).alterar(usuario)
                .then((data) => {
                    //Success
                    res(new CreateResponse().Success("Sucesso ao Alterar Usuário!", format));
                })
                .catch((err) => {
                    //Error
                    rej(new CreateResponse().Erro("Erro ao Alterar Usuário!"));
                });
        });
    }

    deletar(usuarioId, format) {
        return new Promise((res, rej) => {
            new UsuarioDAO(this._require.db).deletar(usuarioId)
                .then((data) => {
                    //Success
                    res(new CreateResponse().Success("Sucesso ao Deletar Usuário!", format));
                })
                .catch((err) => {
                    //Error
                    rej(new CreateResponse().Erro("Erro ao Deletar Usuário!"));
                });
        });
    }

    autenticar({ login, senha }) {
        return new Promise((res, rej) => {
            this.buscarPorNickName(login, Formato.RAW)
                .then(usuario => {

                    if(!usuario) return res(new CreateResponse().AuthErro());

                    var hashreq = sha512(senha,  usuario.salt);

                    if (usuario.senha === hashreq) {
                        const token = jwt.sign(
                            { usuarioId: usuario._id },
                            process.env.SECRET,
                            { expiresIn: process.env.SUWION_JWT_EXPIRESIN || '86400s' /*24horas*/ });

                        res(new CreateResponse().AuthSucsess(token));
                    }
                    else {
                        res(new CreateResponse().AuthErro());
                    }
                });
        });
    }
}

exports.UsuarioBusiness = UsuarioBusiness;