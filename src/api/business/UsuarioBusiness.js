const UsuarioDAO = require('../dao/UsuarioDAO.js').UsuarioDAO;
const { CreateResponse, FormatType: Formato } = require('../infra/CreateResponse.js');
const { genRandomString, sha512 } = require('../infra/SecurityExtension');

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
                    rej(new CreateResponse().Erro("Erro ao Buscar Usuario!"));
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
                    rej(new CreateResponse().Erro("Erro ao Localizar Usuarios!"));
                });
        });
    }

    cadastrar(usuario, format) {

        return new Promise((res, rej) => {

            usuario.salt = genRandomString(1);
            usuario.senha = sha512(usuario.senha, usuario.salt);

            new UsuarioDAO(this._require.db).cadastrar(usuario)
                .then((data) => {
                    //Success
                    res(new CreateResponse().Success(data, format));
                })
                .catch((err) => {
                    //Error
                    rej(new CreateResponse().Erro("Erro ao Cadastrar Usuário!"));
                });
        });
    }

    alterar(usuario, format) {
        return new Promise((res, rej) => {
            new UsuarioDAO(this._require.db).alterar(usuario)
                .then((data) => {
                    //Success
                    res(new CreateResponse().Success("Sucesso ao Alterar Ingrediente!", format));
                })
                .catch((err) => {
                    //Error
                    rej(new CreateResponse().Erro("Erro ao Alterar Ingrediente!"));
                });
        });
    }

    deletar(usuarioId, format) {
        return new Promise((res, rej) => {
            new UsuarioDAO(this._require.db).deletar(usuarioId)
                .then((data) => {
                    //Success
                    res(new CreateResponse().Success("Sucesso ao Deletar Ingrediente!", format));
                })
                .catch((err) => {
                    //Error
                    rej(new CreateResponse().Erro("Erro ao Deletar Ingrediente!"));
                });
        });
    }

    autenticar({ login, senha }) {
        return new Promise((res, rej) => {
            this.buscarPorNickName(login, Formato.RAW)
                .then(usuario => {
                    var salt = usuario.salt;

                    var hashbanco = sha512(usuario.senha, salt);
                    var hashreq = sha512(senha, salt);

                    if (hashbanco === hashreq) {
                        const token = jwt.sign({ id }, process.env.SECRET, {
                            expiresIn: process.env.SUWION_JWT_EXPIRESIN || '86400s' //24horas
                        });

                        res(new CreateResponse().AuthSucsess(token));
                    }
                    else{
                        res(new CreateResponse().AuthErro());
                    }
                });
        });



        if (req.body.login === 'teste' && req.body.senha === '123') {

            //auth ok
            const id = 1; //esse id virá do banco de dados



            const token = jwt.sign({ id }, process.env.SECRET, {
                expiresIn: expiresIn
            });

            return res.json({ success: true, accessToken: token, expiresIn: expiresIn, tokenType: 'Bearer' });
        }

        res.status(500).json({ success: false, message: 'Login inválido!' });

    }
}

exports.UsuarioBusiness = UsuarioBusiness;