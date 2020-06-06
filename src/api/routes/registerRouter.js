var cors = require("cors");

var corsOptions = () => {
    return {
        origin: function(origin, callback) {
            callback(null, true); 
        }, 
        methods: "GET,PUT,POST,DELETE,PATCH", 
        optionSuccessStatus: 200
    }
};

module.exports = function(application) {
    application.get("/hc", (req, resp) => {
        resp.status(200).json({"data": "hello world"});
    });
}
