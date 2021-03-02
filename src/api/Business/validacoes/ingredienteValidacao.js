const { body } = require('express-validator');
const { validate } = require('./baseValidacao')

const criarIngredienteRules = () => 
{
    return [
        //Não pode ter esses campos
        body('id').isEmpty().withMessage('não pode definir um id'),
        
        //tem que ter esses campos
        body('descricao').exists().withMessage('não pode ser vazio'), 
    ]
}

const alterarIngredienteRules = () => 
{
    return [
        //tem que ter esses campos
        body('id').exists().withMessage('id não pode ser vazio'),
        body('descricao').exists().withMessage('não pode ser vazio'), 
    ]
}

const deletarIngredienteRules = () => 
{
    return [
        body('ingredienteId').exists().withMessage('não pode ser vazio'), 
    ]
}


module.exports = {
    criarIngredienteRules, 
    alterarIngredienteRules,
    deletarIngredienteRules,
    validate
}