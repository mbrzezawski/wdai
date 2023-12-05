const express = require('express');
const { sequelize, Person } = require('./models/db');

const app = express();
const port = 3001;

// Definiowanie endpointa Hello World
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Endpoint do wyświetlania danych z tabeli Person
app.get('/persons', async (req, res) => {
  try {
    const persons = await Person.findAll(); // Pobierz wszystkie rekordy z tabeli Person
    res.json(persons); // Wyślij JSON z danymi
  } catch (error) {
    console.error('Error fetching persons:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Synchronizacja z bazą danych
sequelize.sync().then(async () => {
  console.log('Connected to the database');
  try {
    await Person.destroy({ where: {} });
    console.log('All previous persons deleted.');
  } catch (error) {
    console.error('Error deleting previous persons:', error);
  }
  // Dodanie rekordu do tabeli Person
  try {
    const existingPerson = await Person.findOne({ where: { name: 'John', surname: 'Doe', job: 'IT' } });

    if (!existingPerson) {
      const newPerson = await Person.create({
        name: 'John',
        surname: 'Doe',
        job: 'IT',
      });
      console.log('New person created:', newPerson.toJSON());
    } else {
      console.log('Person already exists:', existingPerson.toJSON());
    }
  } catch (error) {
    console.error('Error creating/fetching a person:', error);
  }

  // Start serwera po synchronizacji z bazą danych
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});
