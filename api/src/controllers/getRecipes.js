const axios = require('axios');
const { Recipes, Diets } = require("../db");
// require('dotenv').config();
// const {API_KEY_1, API_KEY_4,} = process.env;
const { getApiKey } = require('../helpers/apiKeyRecipes')
const number = 9; //máximo de 100 resultados

async function getAllRecipesApi() {
  try {
    const apiKey = getApiKey();
    const apiResponse = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=${number}&offset=0`);
    const {results} = apiResponse.data
    
    if(results.length > 0){
    let response = await results?.map((result) => {

        return {
            id: result.id, 
            name: result.title,
            image: result.image, 
            summary:result.summary, 
            healthScore: result.healthScore,
            types: result.dishTypes?.map(element => element),  
            diets: result.diets?.map(element => element), 
            steps: (result.analyzedInstructions[0]?.steps || []).map(item => item.step).join("\n")

        }
    })
    return response;
    } else{
        console.log('No se encontraron recetas.');
        return [];
    }

    
  } catch (error) {
    console.error('Error al obtener las recetas:', error.message);
    throw error;
  }
}

//Busca todas las recetas de la DB y de la API
async function getAllRecipes() {
  try {
    const dbRecipes = await Recipes.findAll({
      include: {
        attributes: ["name"],
        model: Diets,
        through: {
          attributes: [],
        },
      },
    });
    const apiRecipes = await getAllRecipesApi();
    apiRecipes.sort((a, b) => a.id - b.id);
    const allRecipes = [...apiRecipes, ...dbRecipes]; // spreed operation
    console.log(allRecipes)
    return allRecipes;
  } catch (error) {
    return { error: 'Error al obtener las recetas' };
  }
};

  

module.exports = {
  getAllRecipes,  
};

