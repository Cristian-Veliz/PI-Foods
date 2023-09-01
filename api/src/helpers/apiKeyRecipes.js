require("dotenv").config();

  const apiKeys = [
    process.env.API_KEY_16,
    process.env.API_KEY_17,
    process.env.API_KEY_18,
    process.env.API_KEY_15,
    process.env.API_KEY_19,
    process.env.API_KEY_7,
    process.env.API_KEY_6,
    process.env.API_KEY_4,
    process.env.API_KEY_1,
    process.env.API_KEY_5,
    process.env.API_KEY_0,
    //process.env.API_KEY_24,


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
