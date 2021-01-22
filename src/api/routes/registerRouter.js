const IngredienteBusiness = require('../business/IngredienteBusiness.js').IngredienteBusiness;
const UsuarioBusiness = require('../business/UsuarioBusiness.js').UsuarioBusiness;
const ReceitaBusiness = require('../business/ReceitaBusiness.js').ReceitaBusiness;
const CardapioBusiness = require('../business/CardapioBusiness.js').CardapioBusiness;
const ListaCompraBusiness = require('../business/ListaCompraBusiness.js').ListaCompraBusiness;
const path = require('path');

module.exports = function (application) {
    application.get("/hc", (req, resp) => {
        resp.status(200).json({ "status": "RUNNING" });
    });

    application.get('/', function(req, res) {
        res.sendFile(path.join(__dirname + '/../index.html'));
    });

    //#region Autenticação

    application.post('/token/', (req, resp) => {
        //TODO: implementar geração de token
        resp.status(200).json({token: "abc1234"});
    })
    //#endregion Autenticação


    //#region Ingredientes

    application.get('/ingrediente/:id', (req, resp) => {
        new IngredienteBusiness(req).buscarPorId(req.params.id)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.get('/ingredientes/:descricao', (req, resp) => {
        new IngredienteBusiness(req).buscar(req.params.descricao)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.get('/ingredientes', (req, resp) => {
        new IngredienteBusiness(req).listar(req.body)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.post('/ingrediente', (req, resp) => {

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

    application.put('/ingrediente', (req, resp) => {
        new IngredienteBusiness(req).alterar(req.body)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.delete('/ingrediente', (req, resp) => {
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

    application.get('/usuario/:id', (req, resp) => {
        new UsuarioBusiness(req).buscarPorId(req.body.usuarioId)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.get('/usuario/:email', (req, resp) => {
        new UsuarioBusiness(req).buscarPorEmail(req.body.email)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.get('/usuario/:nickname', (req, resp) => {
        new UsuarioBusiness(req).buscarPorNickName(req.body.nickname)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.get('/usuarios/:nickname', (req, resp) => {
        new UsuarioBusiness(req).listarPorNickName(req.body.nickname)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.post('/usuario/', (req, resp) => {
        new UsuarioBusiness(req).cadastrar(req.body)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.put('/usuario/', (req, resp) => {
        new UsuarioBusiness(req).alterar(req.body)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.delete('/usuario', (req, resp) => {
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

    application.get('/receita/:id', (req, resp) => {
        new ReceitaBusiness(req).buscarPorId(req.body.receitaId)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.post('/receita', (req, resp) => {
        new ReceitaBusiness(req).cadastrar(req.body)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.post('/receitas/', (req, resp) => {
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

    application.post('/social/receita/avaliar', (req, resp) => {
        //TODO implementar avaliacao de receita
    })

    application.post('/social/receita/comentar', (req, resp) => {
        //TODO implementar cadastro de comentario em receita
    })

    application.post('/social/receita/compartilharResultado', (req, resp) => {
        //TODO implementar cadastro de resultado de receita (texto, img e/ou vídeo do resultado de fazer a receita)
    })

    //#endregion Social - Receita

    //#region Cardapios

    application.post('/cardapio/', (req, resp) => {
        new CardapioBusiness(req).cadastrar(req.body)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.post('/cardapios/', (req, resp) => {
        new CardapioBusiness(req).filtrar(req.body)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    //#endregion Cardapios

    //#region Listas de Compras

    application.post('/listaCompra/receita', (req, resp) => {
        new ListaCompraBusiness(req).criarPorReceita(req.body)
        .then(data => {
            resp.status(data.status).json(data);
        })
        .catch(err => {
            resp.status(err.status).json(err);
        });
    })

    application.post('/listaCompra/cardapio', (req, resp) => {
        new ListaCompraBusiness(req).criarPorCardapio(req.body)
        .then(data => {
            resp.status(data.status).json(data);
        })
        .catch(err => {
            resp.status(err.status).json(err);
        });
    })

    //#endregion Listas de Compras
}