const path = require('path');
const AutenticacaoRoutes = require('./autenticacaoRoutes.js').AutenticacaoRoutes;
const CardapioRoutes = require('./cardapioRoutes.js').CardapioRoutes;
const IngredienteRoutes = require('./ingredienteRoutes.js').IngredienteRoutes;
const ReceitaRoutes = require('./receitaRoutes.js').ReceitaRoutes;
const SocialRoutes = require('./socialRoutes.js').SocialRoutes;
const ToolsRoutes = require('./toolsRoutes.js').ToolsRoutes;
const UsuarioRoutes = require('./usuarioRoutes.js').UsuarioRoutes;

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/../index.html'));
    });

    new AutenticacaoRoutes(app).registrarRotas();
    new CardapioRoutes(app).registrarRotas();
    new IngredienteRoutes(app).registrarRotas();
    new ReceitaRoutes(app).registrarRotas();
    new SocialRoutes(app).registrarRotas();
    new ToolsRoutes(app).registrarRotas();
    new UsuarioRoutes(userDenpendencies(app)).registrarRotas();

}



