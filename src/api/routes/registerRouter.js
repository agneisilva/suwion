const IngredienteBusiness = require('../business/IngredienteBusiness.js').IngredienteBusiness;
const UsuarioBusiness = require('../business/UsuarioBusiness.js').UsuarioBusiness;
const ReceitaBusiness = require('../business/ReceitaBusiness.js').ReceitaBusiness;
const CardapioBusiness = require('../business/CardapioBusiness.js').CardapioBusiness;
const ListaCompraBusiness = require('../business/ListaCompraBusiness.js').ListaCompraBusiness;
const path = require('path');
const dotenvsafe = require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const { verifyJWT }  = require('../infra/SecurityExtension');

module.exports = function (application) {

    application.get("/hc", (req, resp) => {
        resp.status(200).json({ "status": "RUNNING" });
    });

    application.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/../index.html'));
    });

    //#region Autenticação

    application.post('/login', (req, res) => {
        new UsuarioBusiness().autenticar(req.body)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    //#endregion Autenticação


    //#region Ingredientes

    application.get('/ingrediente/:id', verifyJWT, (req, resp) => {
        new IngredienteBusiness(req).buscarPorId(req.params.id)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.get('/ingredientes/:descricao', verifyJWT, (req, resp) => {
        new IngredienteBusiness(req).buscar(req.params.descricao)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.get('/ingredientes', verifyJWT, (req, resp) => {
        new IngredienteBusiness(req).listar(req.body)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.post('/ingrediente', verifyJWT, (req, resp) => {

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

    application.put('/ingrediente', verifyJWT, (req, resp) => {
        new IngredienteBusiness(req).alterar(req.body)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.delete('/ingrediente', verifyJWT, (req, resp) => {
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

    application.get('/usuario/:id', verifyJWT, (req, resp) => {
        new UsuarioBusiness(req).buscarPorId(req.body.usuarioId)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.get('/usuario/:email', verifyJWT, (req, resp) => {
        new UsuarioBusiness(req).buscarPorEmail(req.body.email)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.get('/usuario/:nickname', verifyJWT, (req, resp) => {
        new UsuarioBusiness(req).buscarPorNickName(req.body.nickname)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.get('/usuarios/:nickname', verifyJWT, (req, resp) => {
        new UsuarioBusiness(req).listarPorNickName(req.body.nickname)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.post('/usuario/', verifyJWT, (req, resp) => {
        new UsuarioBusiness(req).cadastrar(req.body)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.put('/usuario/', verifyJWT, (req, resp) => {
        new UsuarioBusiness(req).alterar(req.body)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.delete('/usuario', verifyJWT, (req, resp) => {
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

    application.get('/receita/:id', verifyJWT, (req, resp) => {
        new ReceitaBusiness(req).buscarPorId(req.body.receitaId)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.post('/receita', verifyJWT, (req, resp) => {
        new ReceitaBusiness(req).cadastrar(req.body)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.post('/receitas/', verifyJWT, (req, resp) => {
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

    application.post('/social/receita/avaliar', verifyJWT, (req, resp) => {
        //TODO implementar avaliacao de receita
    });

    application.post('/social/receita/comentar', verifyJWT, (req, resp) => {
        //TODO implementar cadastro de comentario em receita
    });

    application.post('/social/receita/compartilharResultado', verifyJWT, (req, resp) => {
        //TODO implementar cadastro de resultado de receita (texto, img e/ou vídeo do resultado de fazer a receita)
    });

    //#endregion Social - Receita

    //#region Cardapios

    application.post('/cardapio/', verifyJWT, (req, resp) => {
        new CardapioBusiness(req).cadastrar(req.body)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    });

    application.post('/cardapios/', verifyJWT, (req, resp) => {
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

    application.post('/listaCompra/receita', verifyJWT, (req, resp) => {
        new ListaCompraBusiness(req).criarPorReceita(req.body)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    });

    application.post('/listaCompra/cardapio', verifyJWT, (req, resp) => {
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