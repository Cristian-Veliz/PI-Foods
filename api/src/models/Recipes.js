const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipes', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      //defaultValue: 'https://b3fe.short.gy/htGQ8u'
    },
    summary: {
      type: DataTypes.TEXT, //resumen
      allowNull: false,
    },
    healthScore: {    // nivel de comida saludable
      type: DataTypes.STRING,
      //allowNull: false
    },
    steps: {   // paso a paso
      type: DataTypes.TEXT,
      //allowNull:false
    },
    createInDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,  
    }

  },{timestamps:false});
};
