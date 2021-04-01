const CardapioDAO = require('../../dao/cardapioDAO.js').CardapioDAO;
const CardapioBusiness = require('../../business/cardapioBusiness.js').CardapioBusiness;
const DependencyBuilder = require('../../infra/dependencyInjection.js').DependencyBuilder;

module.exports = (app) => {
    let builder = new DependencyBuilder();

    builder
        .register({
            name: "connection",
            value: "$$db"
        })
        .register({
            name: "dao",
            entity: CardapioDAO
        })
        .register({
            name: "_business",
            entity: CardapioBusiness
        })
        .addDependencyTree("_business.dao.connection")

    return builder.getMap();
}