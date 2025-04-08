const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require("./config/userdb");
const User = require('./models/userModel');
const Address = require('./models/addressModel');

const userRoutes = require('./routes/userRoutes');
const addressRoutes = require('./routes/addressRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

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

// user routes
app.use("/user", userRoutes);
app.use("/user/address", addressRoutes);

// auth routes
app.use("/auth", authRoutes);

// Define associations
User.hasMany(Address, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Address.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

app.listen(PORT, () => {
    console.log(`Users server is running on http://localhost:${PORT}`);
});