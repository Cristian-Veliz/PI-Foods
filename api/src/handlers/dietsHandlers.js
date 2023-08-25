const { getDietsApi } = require('../controllers/getDiets');
const { getDietDb } = require('../controllers/getDiets');

async function getDietsApiHandler(req, res) {
  try {
    const diets = await getDietsApi();

    if (diets) {
      res.status(200).json(diets);
    } else {
      res.status(404).json({ message: 'No diets found' });
    }
  } catch (error) {
    console.error('Error al obtener las dietas:', error.message);
    res.status(500).json({ message: 'Diet not found' });
  }
}

async function getDietDbHandler(req, res) {
  const { dietName } = req.params;

  try {
    const diet = await getDietDb(dietName);

    if (diet) {
      res.status(200).json(diet);
    } else {
      res.status(404).json({ message: 'Diet not found' });
    }
  } catch (error) {
    console.error(`Error al buscar o crear la dieta "${dietName}":`, error.message);
    res.status(500).json({ message: 'Error when searching diets' });
  }
}

module.exports = {
  getDietsApiHandler,
  getDietDbHandler,
};
