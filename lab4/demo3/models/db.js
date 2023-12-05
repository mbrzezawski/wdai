const { Sequelize, DataTypes } = require('sequelize');

// Inicjalizacja Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './data/database.sqlite',
  logging: false,
});

// Definicja modelu danych
const Person = sequelize.define('Person', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  surname: {
    type: DataTypes.STRING,
  },
  job: {
    type: DataTypes.STRING,
  },
});

// Eksportowanie obiektu sequelize i modelu Person
module.exports = { sequelize, Person };