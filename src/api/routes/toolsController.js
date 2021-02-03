const { verifyJWT } = require('../infra/securityExtension');


var ToolsController = class ToolsController {
    constructor(application) {
        this._application = application;
    }
    registrarRotas() {

        this._application.get("/tools/hc", (req, resp) => {
            resp.status(200).json({ "status": "RUNNING" });
        });
   
    }

}

exports.ToolsController = ToolsController;