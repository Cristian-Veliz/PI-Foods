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
            // Crear la receta en la base de datos
            const createdRecipe = await Recipes.create({
                name,
                image,
                summary,
                healthScore,
                steps
            });

            // Buscar o crear las dietas y relacionarlas con la receta
            const validDiets = await Promise.all(
                diets.map(async (diet) => {
                    const existingDiet = await Diets.findOne({
                        where: {
                            name: diet
                        }
                    });

                    if (existingDiet) {
                        return existingDiet;
                    } else {
                        const newDiet = await Diets.create({ name: diet });
                        return newDiet;
                    }
                })
            );

            // Establecer la relación entre la receta y las dietas
            await createdRecipe.addDiets(validDiets);

            // Responder con la receta creada y las dietas relacionadas
            res.status(201).json({
                success: true,
                message: 'Receta creada exitosamente',
                data: {
                    ...createdRecipe.toJSON(),
                    diets: validDiets
                }
            });
        } else {
            return res.status(400).json({ message: 'Faltan datos requeridos' });
        }
    } catch (error) {
        console.error('Error al crear la receta:', error.message);
        res.status(500).json({ message: 'Error al crear la receta' });
    }
}

module.exports = {
    createRecipe,
};
