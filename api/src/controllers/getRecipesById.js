const axios = require('axios');
const { Recipes, Diets } = require("../db");
const { getApiKey } = require('../helpers/apikeyRecipesId');
// require('dotenv').config();
// const { API_KEY_4 } = process.env;


async function getRecipesByid(idSearch) {
    try {
      const apiKey = getApiKey();
      if (idSearch) {
        const apiResponse = await axios.get(`https://api.spoonacular.com/recipes/${idSearch}/information?apiKey=${apiKey}&addRecipeInformation=true`);
        const data = apiResponse.data;
  
        if (data) {
          const response = {
            id: data.id,
            name: data.title,
            image: data.image,
            summary: data.summary,
            healthScore: data.healthScore,
            types: data.dishTypes?.map(element => element),
            diets: data.diets?.map(element => element),
            steps: (data.analyzedInstructions[0]?.steps || []).map(item => item.step).join("\n")
          };
  
          return response;
        } else {
          console.log('No se encontro el id.');
          return null;
        }
      } else {
        throw new Error('No se encontró el ID.');
      }
    } catch (error) {
      console.error('Error al obtener las recetas por ID:', error.message);
      throw new Error('Error al obtener las recetas por ID');
    }
  }
  
//busca en la base de datos
async function getRecipesDbById(idSearch) {
  try {
      const searchRecipes = await Recipes.findOne({
          where: {
              id: idSearch
          },
          include: {
              attributes: ["name"],
              model: Diets,
              through: {
                attributes: [],
              },
          },
      });

      if (!searchRecipes) {
          throw new Error('Recipe not found in the Db'); 
      }

      return searchRecipes;
  } catch (error) {
     throw error;
  }
}

module.exports = {
    getRecipesByid,
    getRecipesDbById,
};



