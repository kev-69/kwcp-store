const express = require('express');
const dotenv = require('dotenv');
const { createProxyMiddleware } = require('http-proxy-middleware');

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
});

// PROXY CONFIGURATION FOR MICROSERVICES
// Proxy for Admin Service
// app.use("/api", createProxyMiddleware({
//     target: process.env.ADMIN_SERVICE_URL,
//     changeOrigin: true,
//     pathRewrite: {
//         '^/api': '', // Remove /admin from the request path
//     },
// }));

// Proxy for User Service
app.use("/api/users", createProxyMiddleware({
    target: process.env.USER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api/users': '', // Remove /api/users from the request path
    },
}));
// USER SERVICE ENDPOINTS
// Address
// POST address/add
// PUT address/update/:id
// DELETE address/delete/:id
// Auth
// POST /create
// POST /login
// POST /logout
// User
// GET user/:id
// PUT user/update/:id
// DELETE user/delete/:id

// Proxy for Product Service
app.use("/api/products", createProxyMiddleware({
    target: process.env.PRODUCT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api/products': '', // Remove /api/product from the request path
    },
}));
// PRODUCT SERVICE ENDPOINTS
// Product
// POST product/add
// GET product/all
// GET product/:id
// PUT product/update/:id
// DELETE product/delete/:id
// Category
// POST category/add
// GET category/all
// GET category/:id
// PUT category/update/:id
// DELETE category/delete/:id

// Proxy for Order Service
app.use("/api/orders", createProxyMiddleware({
    target: process.env.ORDER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api': '', // Remove /api from the request path
    },
}));
// ORDER SERVICE ENDPOINTS
// POST order/add
// GET order/all
// GET order/:id
// UPDATE order/update/:id
// DELETE order/delete/:id

// Proxy for Payment Service
// app.use("/api", createProxyMiddleware({
//     target: process.env.PAYMENT_SERVICE_URL,
//     changeOrigin: true,
//     pathRewrite: {
//         '^/api': '', // Remove /api from the request path
//     },
// }));

// Proxy for Notification Service
// app.use("/api", createProxyMiddleware({
//     target: process.env.NOTIFICATION_SERVICE_URL,
//     changeOrigin: true,
//     pathRewrite: {
//         '^/api': '', // Remove /api from the request path
//     },
// }));

// Proxy for Payment Service
// app.use("/api", createProxyMiddleware({
//     target: process.env.PAYMENT_SERVICE_URL,
//     changeOrigin: true,
//     pathRewrite: {
//         '^/api': '', // Remove /api from the request path
//     },
// }));

// Proxy for Shipping Service
// app.use("/api", createProxyMiddleware({
//     target: process.env.SHIPPING_SERVICE_URL,
//     changeOrigin: true,
//     pathRewrite: {
//         '^/api': '', // Remove /api from the request path
//     },
// }));

// Start server
app.listen(PORT, () => {
    console.log(`API Gateway is running on port http://localhost:${PORT}`);
});