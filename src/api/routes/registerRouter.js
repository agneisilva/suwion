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

    application.get('/ingredientes', (req, res) => {
        db.collection('ingredientes').find().toArray((err, results) => {
            if (err) return console.log(err)
            res.status(200).json({ data: results });  
        })
    })

    application.post('/ingredientes', (req, resp) => {
        new IngredienteBusiness(req, application).cadastrarIngrediente(db,req.body, (err, data)=>{
            if(!!err) resp.status(500).json(err.message);
            else resp.status(200).json(data);
        })
    })

    //#endregion
}
