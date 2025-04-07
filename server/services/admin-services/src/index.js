const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require("./configs/admindb");

const adminRoutes = require('./routes/adminRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3009;

// Sync database
sequelize.sync({ force: false }) // Set to true to drop and recreate tables
    .then(() => {
        console.log("Database connected successfully!");
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
    });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// admin routes
app.use("/admin", adminRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});