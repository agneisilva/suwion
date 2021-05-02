// Requiring module 
const assert = require('assert');
const IngredienteBusiness = require('../business/ingredienteBusiness.js').IngredienteBusiness;
const Ingrediente = require('../models/ingrediente').Ingrediente;

describe("Ingredientes", () => {

  before(function () { });

  // runs before each test in this block
  beforeEach(function () {

    ingrediente = new Ingrediente({
      id: 123,
      descricao: "Sal"
    });

    dependencies = { dao: {} };

    //Iniciando o teste instanciando o objeto a ser testado
    business = new IngredienteBusiness(dependencies);
  });

  //TESTE DE CADASTRO DE INGREDIENTE
  describe("Cadastro de Ingrediente", () => {

    it("Cadastrar um ingrediente não cadastrado", () => {

      dependencies.dao.cadastrar = (ingrediente) => {
        return new Promise((res, rej) => {
          res({ _id: "123", descricao: ingrediente.descricao }); //Simular erro ao gravar no banco de dados
        });
      };

      //Testando assunto
      business.cadastrar(ingrediente).then((result) => {
        assert(ingrediente.equals(result));
      });

    });

    it("Cadastrar um ingrediente com erro banco de dados", () => {

      let erro = "Erro ao acessar o banco de dados";
      dependencies.dao.cadastrar = (ingrediente) => {
        return new Promise((res, rej) => {
          rej(erro);
        });
      };

      //Testando assunto
      business.cadastrar(ingrediente).catch((result) => {
        assert(result.equals(erro));
      });
    });

  });

  //TESTE DE BUSCA DE INGREDIENTE
  describe("Busca de Ingrediente", () => {

    it("Buscar um ingrediente por Id com erro banco de dados", () => {
      let erro = "Erro ao acessar o banco de dados";

      dependencies.dao.buscarPorId = (id) => {
        return new Promise((res, rej) => {
          rej(erro);
        });
      };

      //Testando assunto
      business.buscarPorId(undefined).catch((result) => {
        assert(result.equals(erro));
      });
    });

    it("Buscar um ingrediente por Id com sucesso", () => {

      dependencies.dao.buscarPorId = (id) => {
        return new Promise((res, rej) => {
          res(ingrediente);
        });
      };

      //Testando assunto
      business.buscarPorId(123).then((result) => {
        assert(result.equals(ingrediente));
      });
    });

  });

  //TESTE DE LISTAGEM DE INGREDIENTE
  describe("Listagem de Ingredientes", () => {
    it("Listar ingrediente com erro de banco de dados", () => {
      let erro = "Erro ao acessar o banco de dados";

      dependencies.dao.listar = (id) => {
        return new Promise((res, rej) => {
          rej(erro);
        });
      };

      //Testando assunto
      business.listar(undefined).catch((result) => {
        assert(result.equals(erro));
      });
    });

    it("Listar um ingredientes com sucesso", () => {

      dependencies.dao.listar = (filtro) => {
        return new Promise((res, rej) => {
          res([ingrediente]);
        });
      };

      //Testando assunto
      business.listar({}).then((result) => {
        assert(result.equals([ingrediente]));
      });
    });
  });

  //TESTE DE ALTERACAO DE INGREDIENTE
  describe("Alteração de Ingrediente", () => {
    it("alterar um ingrediente", () => {

      dependencies.dao.alterar = (ingrediente) => {
        return new Promise((res, rej) => {
          res({ _id: ingrediente.id, descricao: ingrediente.descricao }); //Simular erro ao gravar no banco de dados
        });
      };

      //Testando assunto
      business.alterar(ingrediente).then((result) => {
        assert(ingrediente.equals(result));
      });

    });

    it("alterar um ingrediente com erro banco de dados", () => {

      let erro = "Erro ao acessar o banco de dados";
      dependencies.dao.alterar = (ingrediente) => {
        return new Promise((res, rej) => {
          rej(erro);
        });
      };

      //Testando assunto
      business.alterar(ingrediente).catch((result) => {
        assert(result.equals(erro));
      });
    });
  });

  //TESTE DE EXCLUSAO DE INGREDIENTE
  describe("Exclusão de Ingrediente", () => {
    it("delete um ingrediente por id", () => {

      dependencies.dao.deletar = (ingredienteId) => {
        return new Promise((res, rej) => {
          res(true); //Simular erro ao gravar no banco de dados
        });
      };

      //Testando assunto
      business.deletar(ingrediente).then((result) => {
        assert("Sucesso ao Deletar Ingrediente!".equals(result));
      });

    });

    it("deletar um ingrediente com erro banco de dados", () => {

      let erro = "Erro ao acessar o banco de dados";
      dependencies.dao.deletar = (ingredienteId) => {
        return new Promise((res, rej) => {
          rej(erro);
        });
      };

      //Testando assunto
      business.deletar(undefined).catch((result) => {
        assert(result.equals(erro));
      });
    });
  });

});