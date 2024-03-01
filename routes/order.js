const router = require("express").Router();
const { verifyToken } = require("../middleware/verifyToken");
const Order = require("../models/Order");

// get all orders
router.get("/", verifyToken, async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders.map(order => order.toJSON()));
    } catch (err) {
        res.json({ message: err });
    }
});

// get a specific order
router.get("/:orderId", verifyToken, async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        res.json(order.toJSON());
    } catch (err) {
        res.json({ message: err });
    }
});

// create an order
router.post("/", verifyToken, async (req, res) => {
    const order = new Order({
        paid: req.body.paid,
        customer_id: req.body.customer_id,
        products: req.body.products,
        total: req.body.total
    });

    try {
        const savedOrder = await order.save();
        res.json(savedOrder.toJSON());
    } catch (err) {
        res.json({ message: err });
    }
});

// update an order
router.put("/:orderId", verifyToken, async (req, res) => {
    try {
        const updatedOrder = await Order.updateOne(
            { _id: req.params.orderId },
            {
                $set: {
                    paid: req.body.paid,
                    customerId: req.body.customerId,
                    products: req.body.products,
                    total: req.body.total
                }
            }
        );
        res.json(updatedOrder.toJSON());
    } catch (err) {
        res.json({ message: err });
    }
});

// delete an order
router.delete("/:orderId", verifyToken, async (req, res) => {
    try {
        const removedOrder = await Order.findByIdAndDelete(req.params.orderId);
        res.json(removedOrder.toJSON());
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router; // export the router