// endpoints
const router = require("express").Router();
const Product = require("../models/Product");

// get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products.map(product => product.toJSON()));
    } catch (err) {
        res.json({ message: err });
    }
});

// get a specific product
router.get("/:productId", async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        res.json(product.toJSON());
    } catch (err) {
        res.json({ message: err });
    }
});

// create a product
router.post("/", async (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });

    try {
        const savedProduct = await product.save();
        res.json(savedProduct.toJSON());
    } catch (err) {
        res.status(400).json({ message: err });
    }
});


//update a product
router.put("/:productId", async (req, res) => {
    try {
        const updatedProduct = await Product.updateOne(
            { _id: req.params.productId },
            {
                $set: {
                    name: req.body.name,
                    description: req.body.description,
                    price: req.body.price
                }
            }
        );
        res.json(updatedProduct.toJSON());
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router; //export the router