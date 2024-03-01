const router = require("express").Router();
const Product = require("../models/Product");
const {convertToObjectId} = require("../utils/Util");

// get all products
router.post("/", async (req, res) => {
    try {
        // optional list of ids in the request body
        const ids = req.body.ids;
        if (ids) {
            const convertedIds = convertToObjectId(ids);
            const products = await Product.find({ _id: { $in: convertedIds } });
            res.json(products);
            return;
        }
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.json({ message: err });
    }
});

const removeProductsHandler = async (req, res) => {
    try {
        const ids = req.body.ids;
        const convertedIds = convertToObjectId(ids);

        const removedProducts = await Product.deleteMany({ _id: { $in: convertedIds } });

        res.json(removedProducts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { router, removeProductsHandler };