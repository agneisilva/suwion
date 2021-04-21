var CustomRoutes = class CustomRoutes{
    constructor(app){
        this._application = app;
    }

    registrarRotas(){

        this._application.get('/', function (req, res) {
            res.sendFile(path.join(__dirname + '/../index.html'));
        });

        this._application.get('/*', this.pageNotFound);
        this._application.post('/*', this.pageNotFound);
        this._application.put('/*', this.pageNotFound);
        this._application.delete('/*', this.pageNotFound);
    }

    pageNotFound(req, res, next){
        res.sendFile(path.join(__dirname + '/../customPages/404.html'));
    }
}

exports.CustomRoutes = CustomRoutes;