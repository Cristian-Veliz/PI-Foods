require("dotenv").config();

  const apiKeys = [
    process.env.API_KEY_009,
    process.env.API_KEY_006,
    process.env.API_KEY_008,
    process.env.API_KEY_007,
    //process.env.API_KEY_010,


    
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
