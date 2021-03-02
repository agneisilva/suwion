const { Ingrediente } = require('../../models/ingrediente.js');
const userDenpendencies = require('../config/dependenciesMap/user.js');

module.exports = (app) => {
    return [{
        user: {
            route: "/usuario/*",
            functionMap: userDenpendencies(app)
        },
        ingrediente: {
            route: "/ingrediente/*",
            functionMap: userDenpendencies(app) //TODO
        }
    }]
}