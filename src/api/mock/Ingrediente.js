const Ingrediente = require("../models/Ingrediente.js").Ingrediente;

exports.IngredienteMock = {
    Single: new Ingrediente(1, "Sal"),
    Multiple: [
        new Ingrediente(1, "Sal"),
        new Ingrediente(2, "Açucar"),
        new Ingrediente(3, "Pimenta do Reino")
    ]
}