const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {

    var token = req.headers['authorization'];
    
    token = token && token.split(' ')[1]

    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Invalid token.' });

        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        next();
    });
}


module.exports = { verifyJWT } 