const IngredienteBusiness = require('../business/IngredienteBusiness.js').IngredienteBusiness;

module.exports = function (application) {
    application.get("/hc", (req, resp) => {
        resp.status(200).json({ "data": "hello world" });
    });

    //#region Ingredientes

    application.get('/ingrediente/:id', (req, resp) => {
        new IngredienteBusiness(req).buscarIngredientePorId(req.params.id)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.get('/ingredientes/:descricao', (req, resp) => {
        new IngredienteBusiness(req).buscarIngredientes(req.params.descricao)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.get('/ingredientes', (req, resp) => {
        new IngredienteBusiness(req).listarIngrediente(req.body)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.post('/ingrediente', (req, resp) => {

        try {
            new IngredienteBusiness(req).cadastrarIngrediente(req.body)
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
        new IngredienteBusiness(req).alterarIngrediente(req.body)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.delete('/ingrediente', (req, resp) => {
        new IngredienteBusiness(req).deletarIngrediente(req.body)
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
        //TODO implementar busca de usuario por id
    })

    application.get('/usuario/:email', (req, resp) => {
        //TODO implementar busca de usuario por email
    })

    application.get('/usuario/:nickname', (req, resp) => {
        //TODO implementar busca de usuario por nickname
    })

    application.get('/usuarios/:nickname', (req, resp) => {
        //TODO implementar pesquisa de usuarios por nickname
    })

    application.post('/usuario/', (req, resp) => {
        //TODO implementar registro de usuario
    })

    application.put('/usuario/', (req, resp) => {
        //TODO implementar atualizacao de dados do usuario
    })

    //#endregion Usuarios

    //#region Receitas

    application.get('/receita/:id', (req, resp) => {
        //TODO implementar busca de receita por id
    })

    application.post('/receita', (req, resp) => {
        //TODO implementar cadastro de receita
    })

    application.post('/receitas/', (req, resp) => {
        //TODO implementar filtros avancados de receitas
        /*
            nome,
            tag,
            autor,
            nota,
            (pensar em mais filtros)
        */
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
        //TODO implementar cadastro de cardapio
        /*
            Receitas por tempo
        */
    })

    //#endregion Cardapios

    //#region Listas de Compras

    //#endregion Listas de Compras
}