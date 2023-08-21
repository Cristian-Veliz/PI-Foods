const express = require('express');
const router = express.Router();
const {getDietsApiHandler, getDietDbHandler} = require('../handlers/dietsHandlers')

// Ruta para obtener las dietas
router.get('/diets', getDietsApiHandler);
router.get('/diets/:dietName', getDietDbHandler);

module.exports = router;