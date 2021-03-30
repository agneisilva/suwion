// Requiring module 
const assert = require('assert');
const UsuarioBusiness = require('../business/usuarioBusiness.js').UsuarioBusiness;
const Usuario = require('../models/usuario').Usuario;

describe("Usuário", () => {

  let user = {};
  let dependencies = {};
  let business = {};
  let usuarioId;
  let nickname;
  let userEmail;
  let userSalt;
  let userSenha;

  before(function () {
    process.env.SECRET = "secret@12321_test";
  })

  // runs before each test in this block
  beforeEach(function () {

    usuarioId = 123123;
    nickname = "casan";
    userSenha = "Casan@123";
    userSalt = "saltvalue123"
    userEmail = "carlinhos.santos@suwion.com";

    user = new Usuario({
      id: usuarioId,
      nome: "Carlos dos Santos",
      email: userEmail,
      nickName: nickname,
      senha: userSenha,
      salt: userSalt
    });

    dependencies = { userDao: {} };

    //Iniciando o teste instanciando o objeto a ser testado
    business = new UsuarioBusiness(dependencies);
  });


  //TESTES DE CADASTRO DE USUARIO
  describe("Cadastro de Usuário", () => {

    it("Cadastrar Usuario com email ja cadastrado", () => {

      dependencies.userDao.buscarPorEmail = (email) => {
        return new Promise((res, rej) => {
          res(user);
        });
      };

      dependencies.userDao.buscarPorNickName = (nickName) => {
        return new Promise((res, rej) => {
          res(null);
        });
      };

      //Testando assunto
      business.cadastrar(user).catch((err) => {
        assert(err.equals("Usuário já cadastrado"));
      });
    });

    it("Cadastrar Usuario com nickName ja cadastrado", () => {

      dependencies.userDao.buscarPorEmail = (email) => {
        return new Promise((res, rej) => {
          res(null);
        });
      };

      dependencies.userDao.buscarPorNickName = (nickName) => {
        return new Promise((res, rej) => {
          res(user);
        });
      };

      //Testando assunto
      business.cadastrar(user).catch((err) => {
        assert(err.equals("Usuário já cadastrado"));
      });
    });

    it("Cadastrar Usuario com erro ao gravar no banco de dados", () => {

      dependencies.userDao.buscarPorEmail = (email) => {
        return new Promise((res, rej) => {
          res(null);
        });
      };

      dependencies.userDao.buscarPorNickName = (nickName) => {
        return new Promise((res, rej) => {
          res(null);
        });
      };

      dependencies.userDao.cadastrar = (nickName) => {
        return new Promise((res, rej) => {
          rej("Erro ao acessar o banco de dados"); //Simular erro ao gravar no banco de dados
        });
      };

      //Testando assunto
      business.cadastrar(user).catch((err) => {
        assert(err.equals("Erro ao Cadastrar Usuário!"));
      });
    });

    it("Cadastrar Usuario com sucesso", () => {

      //Resultado esperado
      var result = { Id: "123", NickName: user.nickName };

      dependencies.userDao.buscarPorEmail = (email) => {
        return new Promise((res, rej) => {
          res(null);
        });
      };

      dependencies.userDao.buscarPorNickName = (nickName) => {
        return new Promise((res, rej) => {
          res(null);
        });
      };

      dependencies.userDao.cadastrar = (nickName) => {
        return new Promise((res, rej) => {
          res({ _id: "123", nickName: user.nickName }); //Simular erro ao gravar no banco de dados
        });
      };

      //Testando assunto
      business.cadastrar(user).then((res) => {
        assert(res.equals(result));
      });
    });
  });

  //TESTES DE BUSCA DE USUARIO
  describe("Busca de Usuário", () => {

    it("Buscar Usuario por ID com erro ao acessar o banco de dados", () => {

      dependencies.userDao.buscarPorId = (email) => {
        return new Promise((res, rej) => {
          rej("Erro ao acessar o banco de dados"); //Simular erro para acessar o banco de dados
        });
      };

      //Testando assunto
      business.buscarPorId(usuarioId).catch((err) => {
        assert(err.equals("Erro ao Buscar Usuário!"));
      });

    });

    it("Buscar Usuario por ID com sucesso", () => {

      dependencies.userDao.buscarPorId = (usuarioId) => {
        return new Promise((res, rej) => {
          res(user); //Simular retorno do usuário
        });
      };

      //Testando assunto
      business.buscarPorId(usuarioId).then((res) => {
        assert(res.equals(user));
      });
    });

    it("Buscar Usuario por Email com erro ao acessar o banco de dados", () => {

      dependencies.userDao.buscarPorEmail = (email) => {
        return new Promise((res, rej) => {
          rej("Erro ao acessar o banco de dados"); //Simular erro para acessar o banco de dados
        });
      };

      //Testando assunto
      business.buscarPorEmail(userEmail).catch((err) => {
        assert(err.equals("Erro ao Buscar Usuário!"));
      });
    });

    it("Buscar Usuario por Email com sucesso", () => {

      dependencies.userDao.buscarPorEmail = (emailUsuario) => {
        return new Promise((res, rej) => {
          res(user); //Simular retorno do usuário
        });
      };

      //Testando assunto
      business.buscarPorEmail(userEmail).then((res) => {
        assert(res.equals(user));
      });
    });

    it("Buscar Usuario por NickName com erro ao acessar o banco de dados", () => {

      dependencies.userDao.buscarPorNickName = (nickName) => {
        return new Promise((res, rej) => {
          rej("Erro ao acessar o banco de dados"); //Simular erro para acessar o banco de dados
        });
      };

      //Testando assunto
      business.buscarPorNickName(nickname).catch((err) => {
        assert(err.equals("Erro ao Buscar Usuário!"));
      });
    });

    it("Buscar Usuario por NickName com sucesso", () => {

      dependencies.userDao.buscarPorNickName = (nickName) => {
        return new Promise((res, rej) => {
          res(user); //Simular retorno do usuário
        });
      };

      //Testando assunto
      business.buscarPorNickName(nickname).then((res) => {
        assert(res.equals(user));
      });
    });
  });

  //TESTES DE LISTAGEM DE USUARIOS
  describe("Listagem de Usuários", () => {

    it("Listar Usuarios por NickName com erro ao acessar o banco de dados", () => {

      dependencies.userDao.listarPorNickName = (nikename) => {
        return new Promise((res, rej) => {
          rej("Erro ao Buscar Usuário!");
        });
      };

      //Testando assunto
      business.listarPorNickName(nickname).catch((err) => {
        assert(err.equals("Erro ao Buscar Usuário!"));
      });
    });

    it("Listar Usuarios por NickName com sucesso", () => {

      dependencies.userDao.listarPorNickName = (nikename) => {
        return new Promise((res, rej) => {
          res(user);
        });
      };

      //Testando assunto
      business.listarPorNickName(nickname).then((res) => {
        assert(res.equals(user));
      });
    });
  });

  //TESTES DE Alterar DE USUARIOS
  describe("Alterar usuário", () => {

    it("Alterar usuário não existente", async () => {

      business.buscarPorId = (usuarioId) => {
        return new Promise((res, rej) => {
          rej("Erro ao Buscar Usuário!"); //Simular retorno do usuário vazio
        });
      };

      //Testando assunto
      await business.alterar(user).catch((rej) => {
        assert(rej === "Erro ao Buscar Usuário!");
      });

    });

    it("Alterar usuário com erro de banco de dados", () => {

      business.buscarPorId = (usuarioId) => {
        return new Promise((res, rej) => {
          res(user);
        });
      };

      dependencies.userDao.alterar = (usuario) => {
        return new Promise((res, rej) => {
          rej(null);
        });
      };

      business.alterar(user).catch((rej) => {
        assert(rej.equals("Erro ao Alterar Usuário!"));
      });
    });

    it("Alterar usuário com sucesso", () => {

      business.buscarPorId = (usuarioId) => {
        return new Promise((res, rej) => {
          res(user);
        });
      };

      dependencies.userDao.alterar = (usuario) => {
        return new Promise((res, rej) => {
          res(null);
        });
      };

      business.alterar(user).then((rej) => {
        assert(rej === "Sucesso ao Alterar Usuário!");
      });
    });
  });


  //TESTES DE Alterar DE USUARIOS
  describe("Deletar usuário", () => {

    it("Deletar usuário não existente", () => {

      business.buscarPorId = (usuarioId) => {
        return new Promise((res, rej) => {
          res(null);
        });
      };

      business.deletar(usuarioId).catch((rej) => {
        assert(rej === "Usuário não encontrado!");
      });

    });

    it("Deletar usuário com erro de banco de dados", () => {

      business.buscarPorId = (usuarioId) => {
        return new Promise((res, rej) => {
          res(usuario);
        });
      };

      dependencies.userDao.deletar = (usuarioId) => {
        return new Promise((res, rej) => {
          rej(null);
        });
      };

      business.alterar(usuarioId).catch((rej) => {
        assert(rej === "Erro ao Deletar Usuário!");
      });
    });

    it("Deletar usuário com sucesso", () => {

      business.buscarPorId = (usuarioId) => {
        return new Promise((res, rej) => {
          res(user);
        });
      };

      dependencies.userDao.alterar = (usuario) => {
        return new Promise((res, rej) => {
          res(null);
        });
      };

      //Testando assunto
      business.alterar(user).then((rej) => {
        assert(rej === "Sucesso ao Deletar Usuário!");
      });
    });
  });


  //TESTES DE Alterar DE USUARIOS
  describe("Autenticar usuário", () => {

    it("Autenticar usuário com sucesso", () => {

      user.senha = "7300a7b656d692330f25accf83c947b2250a16a16b83c7386c629d83b5da98ee4d4f57dab91d6ae22daab8e96d87b282497802c89a80896487ce308490e6332e";

      dependencies.userDao.buscarPorNickName = (login) => {
        return new Promise((res, rej) => {
          res(user); //Simular retorno do usuário erro
        });
      };

      //Testando assunto
      business.autenticar(nickname, userSenha)
        .then((rej) => {
          assert(rej)
        });

    });

    it("Autenticar com falha ao buscar por nickname", () => {

      user.senha = "senha_hash_invalida";

      business.buscarPorNickName = (login) => {
        return new Promise((res, rej) => {
          rej(null);
        });
      };

      //Testando assunto
      business.autenticar(nickname, userSenha)
        .catch((rej) => {
          assert.ok();
        });

    });

    it("Autenticar com falha na validacao do token", () => {

      user.senha = "senha_hash_invalida";

      dependencies.userDao.buscarPorNickName = (login) => {
        return new Promise((res, rej) => {
          res(user); //Simular retorno do usuário erro
        });
      };

      //Testando assunto
      business.autenticar(nickname, userSenha)
        .catch((rej) => {
          assert.ok();
        });
    });
  });
});
