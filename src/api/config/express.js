var express = require("express");
var load = require("consign");
var cors = require("cors");

module.exports = function () {
    var application = express();

    application.use(cors());

    load()
        .include("business")
        .then("models")
        .then("services")
        .then("infra")
        .then("routes")
        .into(application);

    return application;
};