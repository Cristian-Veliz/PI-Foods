const { getAllRecipes} = require('../controllers/getRecipes');
const { getRecipesApiName } = require('../controllers/getRecipesByName')

async function getRecipesApiHandler(req, res) {
  const titleQuery = req.query.title;

  try {
    let recipes = []; // Inicio como un array vacío para asegurarme que esta definido desde el principio

    if (titleQuery) {
      recipes = await getRecipesApiName(titleQuery);
      
      if (!recipes) {
        res.status(404).json({ "message": "Recipes not found" });
        return; // return para evitar ejecutar el bloque else
      }
    } else {
      recipes = await getAllRecipes();
    }

    if (recipes.length > 0) {
      res.status(200).json(recipes);
    } else {
      res.status(404).json({ "message": "Recipes not found" });
    }
  } catch (error) {
    console.error('Error al obtener las recetas por Name:', error.message);
    res.status(500).json({ message: 'Recipe not found' });
  }
}

module.exports = {
  getRecipesApiHandler,
};
