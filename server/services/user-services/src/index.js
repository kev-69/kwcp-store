const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require("./config/userdb.js"); // Import the sequelize instance

const userRoutes = require('./routes/userRoutes');
// const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

sequelize.sync({ force: false }) 
    .then(() => {
        console.log("Database connected successfully!");
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
    });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
// app.use("/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});