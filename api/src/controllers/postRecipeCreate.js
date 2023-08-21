const { Recipes, Diets } = require("../db");

async function createRecipe(req, res) {
    const {
        name,
        summary,
        image,
        healthScore,
        steps,
        diets
    } = req.body;

    try {
        if (name && summary && image && healthScore && steps && diets) {
            const createdRecipe = await Recipes.create({
                name,
                image,
                summary,
                healthScore,
                steps
            });

            const foundDiets = await Diets.findAll({
                where: {
                    name: diets
                }
            });

            if (foundDiets.length === 0) {
                return res.status(400).json({ message: 'Diets not found' });
            }

            await createdRecipe.addDiets(foundDiets);

            res.status(201).json(createdRecipe);
        } else {
            return res.status(400).json({ message: 'Missing required data' });
        }
    } catch (error) {
        console.error('Error creating recipe:', error.message);
        res.status(500).json({ message: 'Error creating recipe' });
    }
}

module.exports = {
    createRecipe,
};
