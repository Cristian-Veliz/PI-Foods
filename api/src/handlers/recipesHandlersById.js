const { getRecipesByid, getRecipesDbById } = require('../controllers/getRecipesById');

async function getRecipeByIdHandler(req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        try {
            const recipesSearch = await getRecipesDbById(id); // Intentar buscar en la base de datos
            return res.status(200).json(recipesSearch);
        } catch (dbError) {
            console.error('Error en getRecipesDbById:', dbError.message);

            try {
                const recipesSearch = await getRecipesByid(id);

                if (recipesSearch && !recipesSearch.error) {
                    return res.status(200).json(recipesSearch);
                } else {
                    return res.status(404).json({ message: 'Recipe not found' });
                }
            } catch (apiError) {
                console.error('Error en getRecipesByid:', apiError.message);
                return res.status(404).json({ message: 'Recipe not found' });
            }
        }

    } catch (error) {
        console.error('Error global en getRecipeByIdHandler:', error.message);
        res.status(500).json({ message: 'Error al obtener la receta por ID' });
    }
}

module.exports = {
    getRecipeByIdHandler,
};
