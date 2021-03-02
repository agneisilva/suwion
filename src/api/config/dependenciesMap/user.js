const UsuarioDAO = require('../../dao/usuarioDAO.js').UsuarioDAO;
const UsuarioBusiness = require('../../business/usuarioBusiness.js').UsuarioBusiness;
const CreateResponse = require('../../infra/createResponse.js').CreateResponse;
const { DependencyBuilder } = require('../../infra/dependencyInjection.js');

module.exports = (app) => {
    let builder = new DependencyBuilder();

    // builder
    //     .register({
    //         name: "connection",
    //         value: "$$db"
    //     })
    //     .register({
    //         name: "_userDao",
    //         entity: UsuarioDAO
    //     })
    //     .addDependency("connection")
    //     .register({
    //         name: "_createResponse",
    //         entity: CreateResponse,
    //     })
    //     .register({
    //         name: "_userBusiness",
    //         entity: UsuarioBusiness
    //     })
    //     .addDependency("_userDao")
    //     .addDependency("_createResponse")
    //     .register({
    //         name: "_application",
    //         value: app
    //     });


    builder
    .register({
        name: "connection",
        value: "$$db"
    })
    .register({
        name: "_userDao",
        entity: UsuarioDAO
    })
    .register({
        name: "_createResponse",
        entity: CreateResponse,
    })
    .register({
        name: "_userBusiness",
        entity: UsuarioBusiness
    })
    .register({
        name: "_application",
        value: app
    })
    .addDependencyTree("_userBusiness._userDao.connection")
    .addDependencyTree("_userBusiness._createResponse");

    return builder.getMap();

    // return [
    //     new DependenceStructure("_userBusiness",
    //         UsuarioBusiness,
    //         [new DependenceStructure("_userDao",
    //             UsuarioDAO,
    //             [new DependenceStructure("connection",
    //                 null,
    //                 "$$db")]),
    //         new DependenceStructure("_createResponse",
    //             CreateResponse
    //         )]
    //     ),
    //     new DependenceStructure("_application",
    //         null,
    //         app)
    // ];
}