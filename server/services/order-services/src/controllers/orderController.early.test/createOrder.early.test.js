


const { createOrder } = require('../orderController');
const Order = require('../../models/orderModel');
const OrderItems = require('../../models/OrderItemsModel');


// Import necessary modules and functions
// Mock the database models
jest.mock("../../models/OrderModel");
jest.mock("../../models/OrderItemsModel");

describe('createOrder() createOrder method', () => {
    let req, res, orderData, orderItemsData;

    beforeEach(() => {
        // Set up mock request and response objects
        req = {
            body: {
                user_id: 1,
                cart_items: [
                    { product_id: 101, quantity: 2, price: 10 },
                    { product_id: 102, quantity: 1, price: 20 }
                ],
                total_amount: 40
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Set up mock data for Order and OrderItems
        orderData = { id: 1, user_id: 1, total_amount: 40, status: 'pending' };
        orderItemsData = [
            { order_id: 1, product_id: 101, quantity: 2, price: 10 },
            { order_id: 1, product_id: 102, quantity: 1, price: 20 }
        ];
    });

    describe('Happy Paths', () => {
        it('should create an order and return a success message', async () => {
            // Mock the Order and OrderItems model methods
            Order.create.mockResolvedValue(orderData);
            OrderItems.bulkCreate.mockResolvedValue(orderItemsData);

            // Call the createOrder function
            await createOrder(req, res);

            // Assert the response
            expect(Order.create).toHaveBeenCalledWith({
                user_id: 1,
                total_amount: 40,
                status: 'pending'
            });
            expect(OrderItems.bulkCreate).toHaveBeenCalledWith(orderItemsData);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Order created successfully',
                order: orderData
            });
        });
    });

    describe('Edge Cases', () => {
        it('should handle database errors gracefully', async () => {
            // Mock the Order model to throw an error
            Order.create.mockRejectedValue(new Error('Database error'));

            // Call the createOrder function
            await createOrder(req, res);

            // Assert the response
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                error: 'Database error'
            });
        });

        it('should handle empty cart_items gracefully', async () => {
            // Set cart_items to an empty array
            req.body.cart_items = [];

            // Mock the Order model methods
            Order.create.mockResolvedValue(orderData);
            OrderItems.bulkCreate.mockResolvedValue([]);

            // Call the createOrder function
            await createOrder(req, res);

            // Assert the response
            expect(Order.create).toHaveBeenCalledWith({
                user_id: 1,
                total_amount: 40,
                status: 'pending'
            });
            expect(OrderItems.bulkCreate).toHaveBeenCalledWith([]);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Order created successfully',
                order: orderData
            });
        });

        it('should handle missing user_id in request body', async () => {
            // Remove user_id from request body
            delete req.body.user_id;

            // Call the createOrder function
            await createOrder(req, res);

            // Assert the response
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                error: expect.any(String)
            });
        });
    });
});