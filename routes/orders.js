const router = require("express").Router();
const Order = require("../models/Order");
const { convertToObjectId } = require("../utils/Util");
const { ObjectId } = require('mongoose').Types;

// get all orders
router.post("/", async (req, res) => {
    try {
        const ids = req.body.ids;
        const customerId = req.body.customerId;

        // Build the filter conditions dynamically
        const filter = {};
        if (ids) {
            const convertedIds = convertToObjectId(ids);
            filter._id = { $in: convertedIds };
        }

        if (customerId) {
            filter.customer_id = new ObjectId(customerId);
        }
        const orders = await Order.find(filter);
        res.json(orders);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;