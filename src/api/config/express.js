const express = require("express");
const load = require("consign");
const cors = require("cors");
const bodyParser = require("body-parser"); 
const mongoMiddleware = require("../middleware/mongoMiddleware.js");

const mongoProperty = "db";

module.exports = function () {
    var application = express();

    application.use(bodyParser());
    application.use(cors());
    application.use(mongoMiddleware(mongoProperty));


    load()
        .include("business")
        .then("models")
        .then("services")
        .then("infra")
        .then("business")
        .then("dao")
        .then("routes")
        .into(application);

    return application;
};