const IngredienteBusiness = require('../business/IngredienteBusiness.js').IngredienteBusiness;
const UsuarioBusiness = require('../business/UsuarioBusiness.js').UsuarioBusiness;
const ReceitaBusiness = require('../business/ReceitaBusiness.js').ReceitaBusiness;
const CardapioBusiness = require('../business/CardapioBusiness.js').CardapioBusiness;
const ListaCompraBusiness = require('../business/ListaCompraBusiness.js').ListaCompraBusiness;
const path = require('path');
const dotenvsafe = require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const security = require('../infra/SecurityExtension');

module.exports = function (application) {

    application.get("/hc", (req, resp) => {
        resp.status(200).json({ "status": "RUNNING" });
    });

    application.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/../index.html'));
    });

    //#region Autenticação

    application.post('/login', (req, res) => {
        
        if (req.body.user === 'teste' && req.body.password === '123') {
            //auth ok
            const id = 1; //esse id virá do banco de dados

            const expiresIn = '86400s';// expires in 24horas
            
            const token = jwt.sign({ id }, process.env.SECRET, {
                expiresIn: expiresIn 
            });

            return res.json({ success: true, accessToken: token, expiresIn: expiresIn, tokenType: 'Bearer' });
        }

        res.status(500).json({ success: false, message: 'Login inválido!' });
    })

    //#endregion Autenticação


    //#region Ingredientes

    application.get('/ingrediente/:id', security.verifyJWT, (req, resp) => {
        new IngredienteBusiness(req).buscarPorId(req.params.id)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.get('/ingredientes/:descricao', security.verifyJWT, (req, resp) => {
        new IngredienteBusiness(req).buscar(req.params.descricao)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.get('/ingredientes', security.verifyJWT, (req, resp) => {
        new IngredienteBusiness(req).listar(req.body)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.post('/ingrediente', security.verifyJWT, (req, resp) => {

        try {
            new IngredienteBusiness(req).cadastrar(req.body)
                .then(data => {
                    resp.status(data.status).json(data);
                })
                .catch(err => {
                    console.log(err.message);
                    //resp.status(err.status).json(err);
                });
        }
        catch (err) {
            console.log(err.message);
        }

    })

    application.put('/ingrediente', security.verifyJWT, (req, resp) => {
        new IngredienteBusiness(req).alterar(req.body)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.delete('/ingrediente', security.verifyJWT, (req, resp) => {
        new IngredienteBusiness(req).deletar(req.body.ingredienteId)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    //#endregion Ingredientes

    //#region Usuarios

    application.get('/usuario/:id', security.verifyJWT, (req, resp) => {
        new UsuarioBusiness(req).buscarPorId(req.body.usuarioId)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.get('/usuario/:email', security.verifyJWT, (req, resp) => {
        new UsuarioBusiness(req).buscarPorEmail(req.body.email)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.get('/usuario/:nickname', security.verifyJWT, (req, resp) => {
        new UsuarioBusiness(req).buscarPorNickName(req.body.nickname)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.get('/usuarios/:nickname', security.verifyJWT, (req, resp) => {
        new UsuarioBusiness(req).listarPorNickName(req.body.nickname)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.post('/usuario/', security.verifyJWT, (req, resp) => {
        new UsuarioBusiness(req).cadastrar(req.body)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.put('/usuario/', security.verifyJWT, (req, resp) => {
        new UsuarioBusiness(req).alterar(req.body)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.delete('/usuario', security.verifyJWT, (req, resp) => {
        new UsuarioBusiness(req).deletar(req.body.usuarioId)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })


    //#endregion Usuarios

    //#region Receitas

    application.get('/receita/:id', security.verifyJWT, (req, resp) => {
        new ReceitaBusiness(req).buscarPorId(req.body.receitaId)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.post('/receita', security.verifyJWT, (req, resp) => {
        new ReceitaBusiness(req).cadastrar(req.body)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.post('/receitas/', security.verifyJWT, (req, resp) => {
        new ReceitaBusiness(req).filtrar(req.body)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    //#endregion Receitas

    //region Social - Receita

    application.post('/social/receita/avaliar', security.verifyJWT, (req, resp) => {
        //TODO implementar avaliacao de receita
    });

    application.post('/social/receita/comentar', security.verifyJWT, (req, resp) => {
        //TODO implementar cadastro de comentario em receita
    });

    application.post('/social/receita/compartilharResultado', security.verifyJWT, (req, resp) => {
        //TODO implementar cadastro de resultado de receita (texto, img e/ou vídeo do resultado de fazer a receita)
    });

    //#endregion Social - Receita

    //#region Cardapios

    application.post('/cardapio/', security.verifyJWT, (req, resp) => {
        new CardapioBusiness(req).cadastrar(req.body)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    });

    application.post('/cardapios/', security.verifyJWT, (req, resp) => {
        new CardapioBusiness(req).filtrar(req.body)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    });

    //#endregion Cardapios

    //#region Listas de Compras

    application.post('/listaCompra/receita', security.verifyJWT, (req, resp) => {
        new ListaCompraBusiness(req).criarPorReceita(req.body)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    });

    application.post('/listaCompra/cardapio', security.verifyJWT, (req, resp) => {
        new ListaCompraBusiness(req).criarPorCardapio(req.body)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    });

    //#endregion Listas de Compras
}