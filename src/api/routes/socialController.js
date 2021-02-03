const { verifyJWT }  = require('../infra/securityExtension');

var SocialController = class SocialController {
    constructor(application) {
        this._application = application;
    }

    registrarRotas() {
        //region Social - Receita

        this._application.post('/social/receita/avaliar', verifyJWT, (req, resp) => {
            //TODO implementar avaliacao de receita
        });
    
        this._application.post('/social/receita/comentar', verifyJWT, (req, resp) => {
            //TODO implementar cadastro de comentario em receita
        });
    
        this._application.post('/social/receita/compartilharResultado', verifyJWT, (req, resp) => {
            //TODO implementar cadastro de resultado de receita (texto, img e/ou vídeo do resultado de fazer a receita)
        });
    
        //#endregion Social - Receita
    }
}


exports.SocialController = SocialController;