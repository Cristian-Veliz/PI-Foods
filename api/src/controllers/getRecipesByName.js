const axios = require('axios');
 const { Recipes, Diets } = require("../db");
//  require('dotenv').config();
//  const {API_KEY_2, API_KEY_3} = process.env;
const { getApiKey } = require('../helpers/apiKeyRecipesName')
const number = 100; //máximo de 100 resultados


async function getRecipesApiName(nameQuery) {
    try {
    const apiKey = getApiKey();
      if (typeof nameQuery === 'string' && nameQuery.trim()) {
        const apiResponse = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&query=${nameQuery.toLowerCase()}&number=${number}`);
        const filteredRecipes = apiResponse.data.results.filter(recipe => {
          return recipe.title.toLowerCase().includes(nameQuery.toLowerCase());
        });
  
        if (filteredRecipes.length > 0) {
          return filteredRecipes.map(processRecipe);
        } else {
          throw new Error('No se encontraron recetas por nombre.');
        }
      } else {
        return 'Debe ingresar un título de consulta válido.';
      }
  
    } catch (error) {
      console.error('Error al obtener las recetas:', error.message);
      return null;
    }
  }

  function processRecipe(result) {
    return {
      id: result.id, 
      name: result.title,
      image: result.image, 
      summary: result.summary, 
      healthScore: result.healthScore,
      types: result.dishTypes?.map(element => element),  
      diets: result.diets?.map(element => element), 
      steps: (result.analyzedInstructions[0]?.steps || []).map(item => item.step).join("\n")
    };
  }
  

module.exports = { 
  getRecipesApiName,
};
