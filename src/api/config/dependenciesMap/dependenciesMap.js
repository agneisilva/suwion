const { Ingrediente } = require('../../models/ingrediente.js');
const userDenpendencies = require('./user.js');

module.exports = (app) => {
    return {
        UsuarioRoutes: userDenpendencies(app)
    }
    
    /*[{
        user: {
            route: "/usuario/*",
            functionMap: userDenpendencies(app)
        },
        ingrediente: {
            route: "/ingrediente/*",
            functionMap: userDenpendencies(app) //TODO
        }
    }]*/
}