const IngredienteBusiness = require('../business/IngredienteBusiness.js').IngredienteBusiness;

module.exports = function(application) {
    application.get("/hc", (req, resp) => {
        resp.status(200).json({"data": "hello world"});
    });

    //#region Ingredientes

    application.get('/ingredientes/:id', (req, res) => {
        new IngredienteBusiness(req, application).buscarIngredientePorId(db,req.params.id, (err, data)=>{
            if(!!err) resp.status(err.status).json(err.message);
            else resp.status(data.status).json(data);
        })
    })

    application.get('/ingredientes', (req, res) => {
        new IngredienteBusiness(req, application).listarIngrediente(db, req.body, (err, data)=>{
            if(!!err) resp.status(500).json(err.message);
            else resp.status(200).json(data);
        })
    })

    application.post('/ingrediente', (req, resp) => {
        new IngredienteBusiness(req, application).cadastrarIngrediente(db, req.body, (err, data)=>{
            if(!!err) resp.status(500).json(err.message);
            else resp.status(200).json(data);
        })
    })

    application.put('/ingrediente', (req, resp) => {
        new IngredienteBusiness(req, application).alterarIngrediente(db, req.body, (err, data)=>{
            if(!!err) resp.status(500).json(err.message);
            else resp.status(200).json(data);
        })
    })

    application.delete('/ingrediente', (req, resp) => {
        new IngredienteBusiness(req, application).deletarIngrediente(db, req.body, (err, data)=>{
            if(!!err) resp.status(500).json(err.message);
            else resp.status(200).json(data);
        })
    })

    //#endregion Ingredientes

    //#region Usuarios

    //#endregion Usuarios
}
