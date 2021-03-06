const IngredienteDAO = require('../../dao/ingredienteDAO.js').IngredienteDAO;
const IngredienteBusiness = require('../../business/ingredienteBusiness.js').IngredienteBusiness;
const DependencyBuilder = require('../../infra/dependencyInjection.js').DependencyBuilder;

module.exports = (app) => {
    let builder = new DependencyBuilder();

    builder
        .register({
            name: "connection",
            value: "$$db"
        })
        .register({
            name: "ingredienteDao",
            entity: IngredienteDAO
        })
        .register({
            name: "_ingredienteBusiness",
            entity: IngredienteBusiness
        })
        .addDependencyTree("_ingredienteBusiness.ingredienteDao.connection");

    return builder.getMap();
}