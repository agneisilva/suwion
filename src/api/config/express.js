const express = require("express");
const load = require("consign");
const cors = require("cors");
const bodyParser = require("body-parser"); 
const mongoMiddleware = require("../middleware/mongoMiddleware.js");
const LoadMaps = require('../infra/dependencyInjection').LoadMaps;
const allDependenciesMaps = require('./dependenciesMap/dependenciesMap.js');

module.exports = function () {
    var application = express();

    application.use(bodyParser());
    application.use(cors());
    application.use(mongoMiddleware());
    application.use(LoadMaps(allDependenciesMaps(application)));

    load()
        .include("business")
        .then("models")
        .then("infra")
        .then("dao")
        .then("routes")
        .into(application);
    
    application.use((error, req, res, next)=>{
        console.log("###ERRO###");
        console.log(error);
        res.status(500).json("ERRO");
    });

    

    return application;
};