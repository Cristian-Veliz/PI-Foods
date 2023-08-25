require("dotenv").config();

const apiKeys = [
  process.env.API_KEY_3,
  // process.env.API_KEY_2,
];

  let apiKeyIndex = 0;
  
  function getApiKey() {
    // Obtener la API key actual
    const apiKey = apiKeys[apiKeyIndex];
    // Cambiar al siguiente índice (circular si llega al final del arreglo)
    apiKeyIndex = (apiKeyIndex + 1) % apiKeys.length;

    return apiKey;
  }

module.exports = {
  getApiKey,
};
