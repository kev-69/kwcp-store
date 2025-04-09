const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const sequelize = require('./configs/ordersdb')
// const Order = require('./models/orderModel')
// const Cart = require('./models/cartModel')
// const Products = require('../../product-services/src/models/productModel')
// const User = require('../../user-services/src/models/userModel')

// call routes
const orderRoutes = require('./routes/orderRoutes')
const cartRoutes = require('./routes/cartRoutes')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3007

// sync database
sequelize.sync({ force: false }) // Set to true only for development to drop and recreate tables
    .then(() => {
        console.log("Database connected successfully");        
    })
    .catch((error) => {
        console.log("Error connecting to the database", error);
    })

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// define routes
app.use("/order", orderRoutes)
app.use("/cart", cartRoutes)

// Define associations
// Order.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
// User.hasMany(Order, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Order.belongsTo(Products, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
// Products.hasMany(Order, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Cart.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
// User.hasMany(Cart, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Cart.belongsTo(Products, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
// Products.hasMany(Cart, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });


app.listen(PORT, () => {
    console.log(`Orders server is running on http://localhost:${PORT}`);
})