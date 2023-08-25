require("dotenv").config();

  const apiKeys = [
  process.env.API_KEY_0,
  process.env.API_KEY_4,
  process.env.API_KEY_1,
  ];

  let apiKeyIndex = 0;
  
  function getApiKey() {
    // La API key actual
    const apiKey = apiKeys[apiKeyIndex];
    // Cambia al siguiente índice (circular si llega al final del arreglo)
    apiKeyIndex = (apiKeyIndex + 1) % apiKeys.length;

    return apiKey;
  }

module.exports = {
  getApiKey,
};
