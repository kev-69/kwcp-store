const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/productdb');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// sync database 
sequelize.sync({ force: false })
    .then(() => {
        console.log("Databse connected successfully");
    })
    .catch((error) => {
        console.log("Error connnecting to the database", error);
    })

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// product routes
// app.use("/product", productRoutes)


app.listen(PORT, () => {
    console.log(`Products server is running on http://localhost:${PORT}`);
    
})