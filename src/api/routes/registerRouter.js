const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb://root:MongoDB2019!@localhost:27017/?authSource=admin";

MongoClient.connect(uri, (err, client) => {
    if (err) return console.log(err)
    db = client.db('suwion') // coloque o nome do seu DB
})

module.exports = function(application) {
    application.get("/hc", (req, resp) => {
        resp.status(200).json({"data": "hello world"});
    });

    application.get('/ingredientes', (req, res) => {
        db.collection('ingredientes').find().toArray((err, results) => {
            if (err) return console.log(err)
            res.status(200).json({ data: results });  
        })
    })

    application.post('/ingredientes', (req, resp) => {
        // db.collection('ingredientes').save(req.body, (err, result) => {
        //     if (err) return console.log(err)
    
        //     console.log('Salvo no Banco de Dados')
        //     resp.status(200).json(req.body);
        // })

        

        console.log(req.body);
        resp.status(200).json();
    })
}
