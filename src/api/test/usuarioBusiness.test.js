// Requiring module 
const assert = require('assert');
const UsuarioBusiness = require('../business/usuarioBusiness.js').UsuarioBusiness;
const Usuario = require('../models/usuario').Usuario;

//TESTES DE CADASTRO DE USUARIO
describe("Cadastro de Usuário", () => {

  it("Cadastrar Usuario com email ja cadastrado", () => {
    //Preparando modelo de teste
    var user = new Usuario({
      nome: "Carlos dos Santos",
      email: "carlinhos.santos@teste.com",
      nickName: "casan",
      senha: "123456"
    });

    //Preparando MOCKS
    var dependencies = { userDao: {} };

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

    //Iniciando o teste instanciando o objeto a ser testado
    business = new UsuarioBusiness(dependencies);

    //Testando assunto
    business.cadastrar(user).catch((err) => {
      assert(err, "Usuário já cadastrado");
    });
  });

  it("Cadastrar Usuario com nickName ja cadastrado", () => {
    //Preparando modelo de teste
    var user = new Usuario({
      nome: "Carlos dos Santos",
      email: "carlinhos.santos@teste.com",
      nickName: "casan",
      senha: "123456"
    });

    //Preparando MOCKS
    var dependencies = { userDao: {} };

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

    //Iniciando o teste instanciando o objeto a ser testado
    business = new UsuarioBusiness(dependencies);

    //Testando assunto
    business.cadastrar(user).catch((err) => {
      assert(err, "Usuário já cadastrado");
    });
  });

  it("Cadastrar Usuario com erro ao gravar no banco de dados", () => {
    //Preparando modelo de teste
    var user = new Usuario({
      nome: "Carlos dos Santos",
      email: "carlinhos.santos@teste.com",
      nickName: "casan",
      senha: "123456"
    });

    //Preparando MOCKS
    var dependencies = { userDao: {} };

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

    //Iniciando o teste instanciando o objeto a ser testado
    business = new UsuarioBusiness(dependencies);

    //Testando assunto
    business.cadastrar(user).catch((err) => {
      assert(err, "Erro ao Cadastrar Usuário!");
    });
  });

  it("Cadastrar Usuario com sucesso", () => {
    //Preparando modelo de teste
    var user = new Usuario({
      nome: "Carlos dos Santos",
      email: "carlinhos.santos@teste.com",
      nickName: "casan",
      senha: "123456"
    });

    //Resultado esperado
    var result = { Id: "123", NickName: user.nickName };

    //Preparando MOCKS
    var dependencies = { userDao: {} };

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

    //Iniciando o teste instanciando o objeto a ser testado
    business = new UsuarioBusiness(dependencies);

    //Testando assunto
    business.cadastrar(user).catch((err) => {
      assert(err, result);
    });
  });
});

//TESTES DE BUSCA DE USUARIO
describe("Busca de Usuário", ()=>{

  it("Buscar Usuario por ID com erro ao acessar o banco de dados", ()=>{
    assert.fail("Test not implemented!");
  });
  
  it("Buscar Usuario por ID com sucesso", ()=>{
    assert.fail("Test not implemented!");
  });
  
  it("Buscar Usuario por Email com erro ao acessar o banco de dados", ()=>{
    assert.fail("Test not implemented!");
  });
  
  it("Buscar Usuario por Email com sucesso", ()=>{
    assert.fail("Test not implemented!");
  });
  
  it("Buscar Usuario por NickName com erro ao acessar o banco de dados", ()=>{
    assert.fail("Test not implemented!");
  });
  
  it("Buscar Usuario por NickName com sucesso", ()=>{
    assert.fail("Test not implemented!");
  });
});

//TESTES DE LISTAGEM DE USUARIOS
describe("Listagem de Usuários", ()=>{
  
  it("Listar Usuarios por NickName com erro ao acessar o banco de dados", ()=>{
    assert.fail("Test not implemented!");
  });
  
  it("Listar Usuarios por NickName com sucesso", ()=>{
    assert.fail("Test not implemented!");
  });
});


// // We can group similar tests inside a describe block 
// describe("Simple Calculations", () => {

//   var require = {};
//   var userBussiness;

//   before(() => {

//   });

//   after(() => {
//     console.log("This part executes once after all tests");
//   });

//   // We can add nested blocks for different tests 
//   describe("Test1", () => {
//     beforeEach(() => {
//       var userBussiness = new UsuarioBusiness(require);
//     });

//     it("Is returning 5 when adding 2 + 3", () => {
//       assert.equal(2 + 3, 5);
//     });

//     it("Is returning 6 when multiplying 2 * 3", () => {
//       assert.equal(2 * 3, 6);
//     });
//   });

//   describe("Test2", () => {
//     beforeEach(() => {
//       console.log("executes before every test");
//     });

//     it("Is returning 4 when adding 2 + 3", () => {
//       assert.equal(2 + 3, 4);
//     });

//     it("Is returning 8 when multiplying 2 * 4", () => {
//       assert.equal(2 * 4, 8);
//     });
//   });
// });