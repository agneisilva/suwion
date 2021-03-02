const MongoClient = require('mongodb').MongoClient;
//const uri = process.env.SUWION_MONGO_CONN_STR || "mongodb://root:MongoDB2019!@localhost:27017/?authSource=admin";

//TODO: Refatorar a connection com o mongoDB
 const uri = "mongodb://admin:MongoDB789@ee3a0429-7374-4330-89b0-168a64809c93-0.0135ec03d5bf43b196433793c98e8bd5.databases.appdomain.cloud:31553,ee3a0429-7374-4330-89b0-168a64809c93-1.0135ec03d5bf43b196433793c98e8bd5.databases.appdomain.cloud:31553,ee3a0429-7374-4330-89b0-168a64809c93-2.0135ec03d5bf43b196433793c98e8bd5.databases.appdomain.cloud:31553/ibmclouddb?authSource=admin&replicaSet=replset&ssl=true";

const ca = `-----BEGIN CERTIFICATE-----
MIIDDzCCAfegAwIBAgIJANEH58y2/kzHMA0GCSqGSIb3DQEBCwUAMB4xHDAaBgNV
BAMME0lCTSBDbG91ZCBEYXRhYmFzZXMwHhcNMTgwNjI1MTQyOTAwWhcNMjgwNjIy
MTQyOTAwWjAeMRwwGgYDVQQDDBNJQk0gQ2xvdWQgRGF0YWJhc2VzMIIBIjANBgkq
hkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA8lpaQGzcFdGqeMlmqjffMPpIQhqpd8qJ
Pr3bIkrXJbTcJJ9uIckSUcCjw4Z/rSg8nnT13SCcOl+1to+7kdMiU8qOWKiceYZ5
y+yZYfCkGaiZVfazQBm45zBtFWv+AB/8hfCTdNF7VY4spaA3oBE2aS7OANNSRZSK
pwy24IUgUcILJW+mcvW80Vx+GXRfD9Ytt6PRJgBhYuUBpgzvngmCMGBn+l2KNiSf
weovYDCD6Vngl2+6W9QFAFtWXWgF3iDQD5nl/n4mripMSX6UG/n6657u7TDdgkvA
1eKI2FLzYKpoKBe5rcnrM7nHgNc/nCdEs5JecHb1dHv1QfPm6pzIxwIDAQABo1Aw
TjAdBgNVHQ4EFgQUK3+XZo1wyKs+DEoYXbHruwSpXjgwHwYDVR0jBBgwFoAUK3+X
Zo1wyKs+DEoYXbHruwSpXjgwDAYDVR0TBAUwAwEB/zANBgkqhkiG9w0BAQsFAAOC
AQEAJf5dvlzUpqaix26qJEuqFG0IP57QQI5TCRJ6Xt/supRHo63eDvKw8zR7tlWQ
lV5P0N2xwuSl9ZqAJt7/k/3ZeB+nYwPoyO3KvKvATunRvlPBn4FWVXeaPsG+7fhS
qsejmkyonYw77HRzGOzJH4Zg8UN6mfpbaWSsyaExvqknCp9SoTQP3D67AzWqb1zY
doqqgGIZ2nxCkp5/FXxF/TMb55vteTQwfgBy60jVVkbF7eVOWCv0KaNHPF5hrqbN
i+3XjJ7/peF3xMvTMoy35DcT3E2ZeSVjouZs15O90kI3k2daS2OHJABW0vSj4nLz
+PQzp/B9cQmOO8dCe049Q3oaUA==
-----END CERTIFICATE-----`;

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