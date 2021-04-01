const ReceitaDAO = require('../../dao/receitaDAO.js').ReceitaDAO;
const ReceitaBusiness = require('../../business/receitaBusiness.js').ReceitaBusiness;
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
            entity: ReceitaDAO
        })
        .register({
            name: "_business",
            entity: ReceitaBusiness
        })
        .addDependencyTree("_business.dao.connection")

    return builder.getMap();
}