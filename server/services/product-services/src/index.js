const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/productdb');
const Product = require('./models/productModel')
const Category = require('./models/categoryModel')
const Orders = require('../../order-services/src/models/orderModel')

const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

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
// app.use((req, res, next) => {
//     console.log(req.body); // Log the request body
//     console.log(req.files); // Log the uploaded files
//     next();
// });

// product routes
app.use("/product", productRoutes)
app.use("/category", categoryRoutes)

// Define associations
Product.belongsTo(Category, { foreignKey: 'category_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Category.hasMany(Product, { foreignKey: 'category_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Product.hasMany(Orders, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Orders.belongsTo(Product, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

app.listen(PORT, () => {
    console.log(`Products server is running on http://localhost:${PORT}`);
})