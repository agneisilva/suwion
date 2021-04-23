const { body } = require('express-validator');
const { validate } = require('./baseValidacao');

const criarReceitaRules = ()=>{
    return [
        
        //Não pode ter esses campos
        body('id').isEmpty().withMessage('não pode definir um id'),
        
         //tem que ter esses campos
         body('nome').exists().withMessage('não pode ser vazio'),
         body('nome').isLength({ min: 3}).withMessage('tamanho mínimo de 3 caracteres'),
         body('ingredientes').exists().withMessage('não pode ser vazio')

    ];
}

module.exports = {
    criarReceitaRules,
    validate
}