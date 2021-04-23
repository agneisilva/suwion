
var Receita = class Receita {
    constructor(args) {
        this._id = args.id || args._id;
        this.nome = args.nome;
        this.ingredientes = args.ingredientes;
        this.preparo = args.preparo;
        this.rendimento = args.rendimento; //Quantas porções serve
        this.autor = args.autor; //Usuário que criou a receita
        this.tags = args.tags;
        this.nota = args.nota;
        this.tempo = args.tempo; //Tempo de preparo (minutos)
        this.dificuldade = args.dificuldade;
    }
}

exports.Receita = Receita;