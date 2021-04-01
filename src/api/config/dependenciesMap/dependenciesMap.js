const userDenpendencies = require('./user.js');
const ingredienteDependencies = require('./ingrediente.js');
const cardapioDependencies = require('./cardapio.js');
const listaCompraDependencies = require('./listaCompra.js');
const receitaDependencies = require('./receita.js');

module.exports = (app) => {
    return {
        usuarioRoutes: userDenpendencies(app),
        ingredienteRoutes: ingredienteDependencies(app),
        cardapioRoutes: cardapioDependencies(app),
        usuarioRoutes: userDenpendencies(app),
        usuarioRoutes: userDenpendencies(app),
    }
}