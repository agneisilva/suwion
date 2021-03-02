const { body } = require('express-validator');
const { validate } = require('./baseValidacao')

const criarUsuarioRules = () => 
{
    return [
        //Não pode ter esses campos
        body('id').isEmpty().withMessage('não pode definir um id'),
        body('salt').isEmpty().withMessage('não pode definir um valor para salt'),

        //tem que ter esses campos
        body('nome').exists().withMessage('não pode ser vazio'), 
        body('email').exists().isEmail().withMessage('não pode ser vazio ou invalido'), 
        body('nickName').exists().withMessage('não pode ser vazio'), 
        body('senha').isLength({ min: 6}).withMessage('não pode ser vazio')
    ]
}

const alterarUsuarioRules = () => 
{
    return [
        //Não pode ter esses campos
        body('salt').isEmpty().withMessage('não pode definir um valor para salt'),
        body('nickName').exists().withMessage('não pode alterar o nickname'), 

        //tem que ter esses campos
        body('id').exists().withMessage('id não pode ser vazio'),
        body('nome').exists().withMessage('não pode ser vazio'), 
        body('email').exists().isEmail().withMessage('não pode ser vazio ou invalido'), 
        body('senha').isLength({ min: 6}).withMessage('não pode ser vazio')

    ]
}

const deletarUsuarioRules = () => 
{
    return [
        body('usuarioId').exists().withMessage('não pode ser vazio'), 
    ]
}

const logarUsuarioRules = () => {
    return [
        body('login').exists().withMessage('não pode ser vazio'), 
        body('senha').exists().withMessage('não pode ser vazio ou inválido') 
    ]
}

module.exports = {
    criarUsuarioRules, 
    logarUsuarioRules, 
    alterarUsuarioRules,
    deletarUsuarioRules,
    validate
}