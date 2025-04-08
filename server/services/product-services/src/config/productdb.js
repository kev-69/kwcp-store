const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
    process.env.PG_DATABASE, 
    process.env.PG_USER, 
    process.env.PG_PASSWORD, {
        host: process.env.PG_HOST,
        dialect: 'postgres',
        port: process.env.PG_PORT,
        logging: false, // Disable SQL query logging
    },
)

// Test the connection to the database
sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    }) 
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


module.exports = sequelize;