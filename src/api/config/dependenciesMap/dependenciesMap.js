const userDenpendencies = require('./user.js');
const ingredienteDependencies = require('./ingrediente.js');

module.exports = (app) => {
    return {
        UsuarioRoutes: userDenpendencies(app),
        IngredienteRoutes: ingredienteDependencies(app)
    }
}