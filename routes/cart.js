const router = require('express').Router();
const Cart = require('../models/Cart');
const { verifyToken } = require('../middleware/verifyToken');
const { ObjectId } = require('mongoose').Types;

// get cart
router.get('/', verifyToken, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('products.product');
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// add to cart
router.post('/', verifyToken, async (req, res) => {
    //increment quantity if product already exists in cart
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        const product = req.body.product;
        const quantity = req.body.quantity;

        //if cart exists
        if (cart) {
            //check if product already exists
            const productInCart = cart.products.find(p => p.product == product);
            if (productInCart) {
                productInCart.quantity += quantity;
                await cart.save();
                return res.json(cart);
            } else {
                cart.products.push({product: new ObjectId(product.id), 
                    quantity: quantity });
                await cart.save();
                return res.json(cart);
            }
        } else {
            //if cart does not exist
            const newCart = new Cart({
                user: req.user._id,
                products: [{ product: new ObjectId(product.id), 
                    quantity: quantity }]
            });
            await newCart.save();
            return res.json(newCart);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// delete from cart
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        //find cart and remove product
        const cart = await Cart.findOne({ user: req.user._id });
        const itemIndex = cart.products.findIndex(p => p._id == req.params.id);
        if (itemIndex >= 0) {
            cart.products.splice(itemIndex, 1);
            await cart.save();
            return res.json(cart);
        } else {
            return res.status(404).json({ message: "Item not found in cart." });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// update cart
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        const itemIndex = cart.products.findIndex(p => p._id == req.params.id);
        if (itemIndex >= 0) {
            cart.products[itemIndex].quantity = req.body.quantity;
            await cart.save();
            return res.json(cart);
        } else {
            return res.status(404).json({ message: "Item not found in cart." });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// clear cart
router.delete('/', verifyToken, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        cart.products = [];
        await cart.save();
        return res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;