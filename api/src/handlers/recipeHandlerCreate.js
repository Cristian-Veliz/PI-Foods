const { createRecipe } = require('../controllers/postRecipeCreate');

async function createRecipeHandler(req, res) {
    try {
        await createRecipe(req, res);
    } catch (error) {
        console.error('Error in createRecipeHandler:', error.message);
        res.status(500).json({ message: 'Error creating recipe' });
    }
}

module.exports = {
    createRecipeHandler,
};
