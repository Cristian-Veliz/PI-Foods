const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipes', {
    id: {
      type: DataTypes.INTEGER, 
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,

    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING, //resumen
      //allowNull: false,
    },
    healthScore: {    // nivel de comida saludable
      type: DataTypes.STRING,
      //allowNull: false
    },
    steps: {   // paso a paso
      type: DataTypes.TEXT,
      //allowNull:false
    },

  },{timestamps:false});
};
