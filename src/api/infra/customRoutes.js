const path = require('path');

var CustomRoutes = class CustomRoutes{
    constructor(app){
        this._application = app;
    }

    registrarRotas(){

        this._application.get('/', (req, res, next) => {
            res.sendFile(path.join(__dirname + '/../index.html'));
        });

        this._application.get(/\/(?!favicon\.ico).*$/, this.pageNotFound);
        this._application.post('/*', this.pageNotFound);
        this._application.put('/*', this.pageNotFound);
        this._application.delete('/*', this.pageNotFound);
    }

    pageNotFound(req, res, next){
        res.status(404).sendFile(path.join(__dirname + '/../customPages/404.html'));
    }
}

exports.CustomRoutes = CustomRoutes;