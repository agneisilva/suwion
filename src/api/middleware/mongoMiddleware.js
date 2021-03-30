const MongoClient = require('mongodb').MongoClient;
const uri = process.env.SUWION_MONGO_CONN_STR || "mongodb://root:MongoDB2019!@localhost:27017/?authSource=admin";


module.exports = () => {
    var connection;
    const property = "db";

    return (req, res, next) => {
        if (!connection)
            connection = MongoClient.connect(uri, {
                sslValidate: true,
                sslCA: ca
            });

        //connection = MongoClient.connect(uri);
        
        connection
            .then(client => {
                console.log('Mongo connected');
                req[property] = client.db(process.env.SUWION_MONGO_DB_NAME || 'suwion');
                next();
            })
            .catch(err => {
                connection = undefined;
                next(err);
            });
    }
};