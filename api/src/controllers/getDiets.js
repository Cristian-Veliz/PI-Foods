const axios = require('axios');
const { Diets } = require("../db");
const { Op } = require('sequelize');
require('dotenv').config();
const { API_KEY_3 } = process.env;

const diets = [
  "Gluten Free",
  "Ketogenic",
  "Vegetarian",
  "Lacto-Vegetarian",
  "Ovo-Vegetarian",
  "Vegan",
  "Pescetarian",
  "Paleo",
  "Primal",
  "Whole30",
];


async function getDietsApi() {
  try {
    const dietsWithRecipes = [];

    for (const dietName of diets) {
      const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY_3}&diet=${encodeURIComponent(dietName)}`;
      const response = await axios.get(url);

      const recipes = response.data.results.map(recipe => ({
        id: recipe.id,
        name: recipe.title,
        image: recipe.image,
      }));

      dietsWithRecipes.push({
        name: dietName,
        recipes: recipes,
      });
    }

    return dietsWithRecipes;
  } catch (error) {
    console.error(`Error al obtener recetas para la dieta "${dietName}":`, error.message);
    return [];
  }
}

async function getDietDb(dietName) {
  try {
    const dietNameLowerCase = dietName.toLowerCase();

    const matchingDiets = diets.filter(diet => diet.toLowerCase().includes(dietNameLowerCase));

    if (matchingDiets.length > 0) {
      const existingDiet = await Diets.findOne({ 
        where: {
          name: {
            [Op.iLike]: `%${dietNameLowerCase}%`
          }
        }
      });

      if (existingDiet) {
        return existingDiet.toJSON();
      } else {
        const newDiet = await Diets.create({ name: matchingDiets[0] });
        return newDiet.toJSON();
      }
    } else {
      throw new Error(`Diet "${dietName}" is not valid`);
    }
  } catch (error) {
    console.error(`Error al buscar o crear la dieta "${dietName}":`, error);
    throw error;
  }
}

module.exports = {
  getDietsApi,
  getDietDb,
};

