const MongoClient = require('mongodb').MongoClient;

const IngredienteBusiness = require('../business/IngredienteBusiness.js').IngredienteBusiness;

const uri = "mongodb://root:MongoDB2019!@localhost:27017/?authSource=admin";

MongoClient.connect(uri, (err, client) => {
    if (err) return console.log(err)
    db = client.db('suwion') // coloque o nome do seu DB
})

module.exports = function(application) {
    application.get("/hc", (req, resp) => {
        resp.status(200).json({"data": "hello world"});
    });

    //#region Ingredientes

    application.get('/ingredientes/:id', (req, res) => {
        new IngredienteBusiness(req, application).buscarIngredientePorId(db,req.params.id, (err, data)=>{
            if(!!err) resp.status(500).json(err.message);
            else resp.status(200).json(data);
        })
    })

    application.post('/ingredientes', (req, res) => {
        new IngredienteBusiness(req, application).listarIngrediente(db,req.body, (err, data)=>{
            if(!!err) resp.status(500).json(err.message);
            else resp.status(200).json(data);
        })
    })

    application.post('/ingredientes', (req, resp) => {
        new IngredienteBusiness(req, application).cadastrarIngrediente(db,req.body, (err, data)=>{
            if(!!err) resp.status(500).json(err.message);
            else resp.status(200).json(data);
        })
    })

    application.put('/ingredientes', (req, resp) => {
        new IngredienteBusiness(req, application).alterarIngrediente(db,req.body, (err, data)=>{
            if(!!err) resp.status(500).json(err.message);
            else resp.status(200).json(data);
        })
    })

    application.delete('/ingredientes', (req, resp) => {
        new IngredienteBusiness(req, application).deletarIngrediente(db,req.body, (err, data)=>{
            if(!!err) resp.status(500).json(err.message);
            else resp.status(200).json(data);
        })
    })

    //#endregion Ingredientes
}
