require("dotenv").config();

  const apiKeys = [
    process.env.API_KEY_20,
    process.env.API_KEY_22,
    process.env.API_KEY_13,
    process.env.API_KEY_10,
    process.env.API_KEY_12,
    process.env.API_KEY_21,
    //process.env.API_KEY_23,
    
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
