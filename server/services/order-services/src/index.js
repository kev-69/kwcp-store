const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const sequelize = require('./configs/ordersdb')

const Orders = require('./models/orderModel')
const OrderItems = require('./models/orderItemsModel')

// call routes
const orderRoutes = require('./routes/orderRoutes')
// const cartRoutes = require('./routes/cartRoutes')

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
// app.use("/cart", cartRoutes)

// Define associations
OrderItems.belongsTo(Orders, { foreignKey: 'order_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Orders.hasMany(OrderItems, { foreignKey: 'order_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

app.listen(PORT, () => {
    console.log(`Orders server is running on http://localhost:${PORT}`);
})