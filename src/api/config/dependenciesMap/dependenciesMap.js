const userDenpendencies = require('./user.js');
const ingredienteDependencies = require('./ingrediente.js');
const cardapioDependencies = require('./cardapio.js');
const listaCompraDependencies = require('./listaCompra.js');
const receitaDependencies = require('./receita.js');

module.exports = (app) => {
    return {
        usuarioRoutes: userDenpendencies(app),
        autenticacaoRoutes: userDenpendencies(app),
        ingredienteRoutes: ingredienteDependencies(app),
        cardapioRoutes: cardapioDependencies(app),
        listaCompraRoutes: listaCompraDependencies(app),
        receitaRoutes: receitaDependencies(app),
    }
}