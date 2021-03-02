const express = require("express");
const load = require("consign");
const cors = require("cors");
const bodyParser = require("body-parser"); 
const mongoMiddleware = require("../middleware/mongoMiddleware.js");
const ResolveDependencyInjection = require('../infra/dependencyInjection').ResolveDependencyInjection;
const allDependenciesMaps = require('./dependenciesMap/dependenciesMap.js');

module.exports = function () {
    var application = express();

    application.use(bodyParser());
    application.use(cors());
    application.use(mongoMiddleware());
    application.use(ResolveDependencyInjection(allDependenciesMaps(application)));

    load()
        .include("business")
        .then("models")
        .then("infra")
        .then("dao")
        .then("routes")
        .into(application);

    return application;
};