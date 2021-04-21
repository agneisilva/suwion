const userDenpendencies = require('./user.js');
const ingredienteDependencies = require('./ingrediente.js');
const cardapioDependencies = require('./cardapio.js');
const listaCompraDependencies = require('./listaCompra.js');
const receitaDependencies = require('./receita.js');

module.exports = (app) => {
    return {
        UsuarioRoutes: userDenpendencies(app),
        AutenticacaoRoutes: userDenpendencies(app),
        IngredienteRoutes: ingredienteDependencies(app),
        CardapioRoutes: cardapioDependencies(app),
        ListaCompraRoutes: listaCompraDependencies(app),
        ReceitaRoutes: receitaDependencies(app),
    }
}