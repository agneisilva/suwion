const path = require('path');
const AutenticacaoController = require('./autenticacaoController.js').AutenticacaoController;
const CardapioController = require('./cardapioController.js').CardapioController;
const IngredienteController = require('./ingredienteController.js').IngredienteController;
const ReceitaController = require('./receitaController.js').ReceitaController;
const SocialController = require('./socialController.js').SocialController;
const ToolsController = require('./toolsController.js').ToolsController;
const UsuarioController = require('./usuarioController.js').UsuarioController;



module.exports = function (app) {

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/../index.html'));
    });

    new AutenticacaoController(app).registrarRotas();
    new CardapioController(app).registrarRotas();
    new IngredienteController(app).registrarRotas();
    new ReceitaController(app).registrarRotas();
    new SocialController(app).registrarRotas();
    new ToolsController(app).registrarRotas();
    new UsuarioController(app).registrarRotas();
    
}