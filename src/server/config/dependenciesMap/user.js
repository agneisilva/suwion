const UsuarioDAO = require('../../dao/usuarioDAO.js').UsuarioDAO;
const UsuarioBusiness = require('../../business/usuarioBusiness.js').UsuarioBusiness;
const DependencyBuilder = require('../../infra/dependencyInjection.js').DependencyBuilder;

module.exports = (app) => {
    let builder = new DependencyBuilder();

    builder
        .register({
            name: "connection",
            value: "$$db"
        })
        .register({
            name: "userDao",
            entity: UsuarioDAO
        })
        .register({
            name: "_userBusiness",
            entity: UsuarioBusiness
        })
        .addDependencyTree("_userBusiness.userDao.connection")

    return builder.getMap();
}