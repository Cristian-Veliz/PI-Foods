require("dotenv").config();

  const apiKeys = [
    process.env.API_KEY_001,
    process.env.API_KEY_003,
    process.env.API_KEY_005,
    process.env.API_KEY_002,
    process.env.API_KEY_004,
    process.env.API_KEY_011,

    process.env.API_KEY_28,
    process.env.API_KEY_30,
    process.env.API_KEY_29,
    process.env.API_KEY_31,
    process.env.API_KEY_26,
    process.env.API_KEY_18,
    process.env.API_KEY_15,
    process.env.API_KEY_16,
    process.env.API_KEY_17,
    process.env.API_KEY_6,
    process.env.API_KEY_24,
    process.env.API_KEY_19,
    process.env.API_KEY_1,
    process.env.API_KEY_7,
    process.env.API_KEY_4,
    process.env.API_KEY_0,
    process.env.API_KEY_5,
    

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
