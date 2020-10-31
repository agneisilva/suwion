const IngredienteBusiness = require('../business/IngredienteBusiness.js').IngredienteBusiness;

module.exports = function (application) {
    application.get("/hc", (req, resp) => {
        resp.status(200).json({ "data": "hello world" });
    });

    //#region Ingredientes

    application.get('/ingredientes/:id', (req, res) => {
        new IngredienteBusiness(req).buscarIngredientePorId(req.params.id)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.get('/ingredientes', (req, res) => {
        new IngredienteBusiness(req).listarIngrediente(req.body)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
    })

    application.post('/ingrediente', (req, resp) => {
        new IngredienteBusiness(req).cadastrarIngrediente(req.body)
            .then(data => {
                resp.status(data.status).json(data);
            })
            .catch(err => {
                resp.status(err.status).json(err);
            });
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

    //#endregion Usuarios
}
