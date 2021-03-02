//const UsuarioDAO = require('../dao/usuarioDAO.js').UsuarioDAO;
const { FormatType: Formato } = require('../infra/createResponse.js');
const { genRandomString, sha512 } = require('../infra/securityExtension');
const jwt = require('jsonwebtoken');

var UsuarioBusiness = class UsuarioBusiness {
    constructor({userDao, createResponse}) {
        this._userDao = userDao;
        this._createResponse = createResponse;
    }

    buscarPorId(usuarioId, format) {
        return new Promise((res, rej) => {
            this._userDao.buscarPorId(usuarioId)
                .then((data) => {
                    //Success
                    res(this._createResponse.Success(data, format));
                })
                .catch((err) => {
                    //Error
                    rej(this._createResponse.Erro("Erro ao Buscar Usuario!"));
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

        return new Promise(async (res, rej) => {

            const result = await Promise.all(
                            [
                                this.buscarPorNickName(usuario.nickName, Formato.RAW), 
                                this.buscarPorEmail(usuario.email, Formato.RAW)
                            ])

            if (result[0] || result[1])
                return rej(new CreateResponse().Erro("Usuário já cadastrado"));

            usuario.salt = genRandomString(10);
            usuario.senha = sha512(usuario.senha, usuario.salt);

            new UsuarioDAO(this._require.db).cadastrar(usuario)
                .then((data) => {
                    res(new CreateResponse().Success({ Id: data._id, NickName: data.nickName }, format));
                })
                .catch((err) => {
                    rej(new CreateResponse().Erro("Erro ao Cadastrar Usuário!"));
                });
        });
    }

    alterar(usuario, format) {
        return new Promise(async (res, rej) => {

            const usuarioExistente = await this.buscarPorId(usuario._id, Formato.RAW);

            if (!usuarioExistente)
                return rej(new CreateResponse().Erro("Usuário não encontrado!"));

            usuario.salt = genRandomString(10);
            usuario.senha = sha512(usuario.senha, usuario.salt);
            usuario.nickName = usuarioExistente.nickName;

            new UsuarioDAO(this._require.db).alterar(usuario)
                .then((data) => {
                    res(new CreateResponse().Success("Sucesso ao Alterar Usuário!", format));
                })
                .catch((err) => {
                    rej(new CreateResponse().Erro("Erro ao Alterar Usuário!"));
                });
        });
    }

    deletar(usuarioId, format) {
        return new Promise(async (res, rej) => {

            var usuarioExistente = await this.buscarPorId(usuarioId, Formato.RAW);

            if (!usuarioExistente)
                return rej(new CreateResponse().Erro("Usuário não encontrado!"));

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

                    if (!usuario) return res(new CreateResponse().AuthErro());

                    var hashreq = sha512(senha, usuario.salt);

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