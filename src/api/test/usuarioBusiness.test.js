// Requiring module 
const assert = require('assert'); 
const UsuarioBusiness = require('../business/usuarioBusiness.js').UsuarioBusiness;
const Usuario = require('../models/usuario').Usuario;
  
// We can group similar tests inside a describe block 
describe("Simple Calculations", () => { 

  var require = {};
  var userBussiness;

  before(() => { 
    
  }); 
  
  after(() => { 
    console.log( "This part executes once after all tests" ); 
  }); 
      
  // We can add nested blocks for different tests 
  describe( "Test1", () => { 
    beforeEach(() => { 
      var userBussiness = new UsuarioBusiness(require);
    }); 
      
    it("Is returning 5 when adding 2 + 3", () => { 
      assert.equal(2 + 3, 5); 
    }); 
  
    it("Is returning 6 when multiplying 2 * 3", () => { 
      assert.equal(2*3, 6); 
    }); 
  }); 
  
  describe("Test2", () => { 
    beforeEach(() => { 
      console.log( "executes before every test" ); 
    }); 
      
    it("Is returning 4 when adding 2 + 3", () => { 
      assert.equal(2 + 3, 4); 
    }); 
  
    it("Is returning 8 when multiplying 2 * 4", () => { 
      assert.equal(2*4, 8); 
    }); 
  }); 
});