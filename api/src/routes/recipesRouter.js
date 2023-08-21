const express = require('express');
const router = express.Router();
const { getRecipesApiHandler } = require('../handlers/recipesHandlers.js');
const { getRecipeByIdHandler } = require('../handlers/recipesHandlersById.js');
const { createRecipeHandler } = require('../handlers/recipeHandlerCreate.js');

// Ruta para obtener todas las recetas
router.get('/recipes', getRecipesApiHandler);

// Ruta para obtener receta por Id
router.get('/recipes/:id', getRecipeByIdHandler);

// Ruta para crear una receta
router.post('/recipes', createRecipeHandler);

module.exports = router;
