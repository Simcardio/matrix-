const ApiError = require('../errors/ApiError');
const orderModel = require('../models/orderModel');

/**
 * Place a new order
 */
async function placeOrder(req, res, next) {
    try {
        const { customerId, items, deliveryAddress } = req.body;

        // Business logic will be extended here (like check inventory, validate customer)
        const order = await orderModel.create({ customerId, items, deliveryAddress });

        // To do: Async supplier selection and forwarding logic here

        res.status(201).json({
            message: 'Order received successfully',
            orderId: order.id,
            status: order.status,
            createdAt: order.createdAt,
        });
    } catch (err) {
        next(err);
    }
}

/**
 * Check order status by ID
 */
async function checkOrderStatus(req, res, next) {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            throw new ApiError(400, 'Invalid order ID');
        }

        const order = await orderModel.findById(id);

        if (!order) {
            throw new ApiError(404, 'Order not found');
        }

        res.json({
            orderId: order.id,
            status: order.status,
            updatedAt: order.updatedAt,
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    placeOrder,
    checkOrderStatus,
};