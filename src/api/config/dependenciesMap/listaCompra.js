const ListaCompraDAO = require('../../dao/listaCompraDAO.js').ListaCompraDAO;
const ListaCompraBusiness = require('../../business/listaCompraBusiness.js').ListaCompraBusiness;
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
            entity: ListaCompraDAO
        })
        .register({
            name: "_business",
            entity: ListaCompraBusiness
        })
        .addDependencyTree("_business.dao.connection")

    return builder.getMap();
}