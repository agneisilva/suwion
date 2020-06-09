const IngredienteDAO = require('../dao/ingredienteDAO.js').IngredienteDAO;

var IngredienteBusiness = class IngredienteBusiness {
    constructor(require, application) {
        this._require = require;
        this._application = application;
    }

    cadastrarIngrediente(conn, ingrediente, callback){
        new IngredienteDAO(conn, this._application).cadastrarIngrediente(ingrediente)
        .then((data)=>{
            //Success
            callback(undefined, {success:true, content:"Ingrediente Cadastrado!"});
        })
        .catch((err)=>{
            //Error
            callback({success:false, message: "Erro ao Cadastrar Ingrediente!"});
        });
    }
}

exports.IngredienteBusiness = IngredienteBusiness;