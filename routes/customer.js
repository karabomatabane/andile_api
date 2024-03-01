const router = require('express').Router();
const Customer = require('../models/Customer');
const { verifyToken, verifyTokenAndAdmin } = require('../middleware/verifyToken');

// get all customers
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers.map(customer => customer.toJSON()));
    } catch (err) {
        res.json({ message: err });
    }
});

// get a specific customer
router.get('/:customerId', verifyToken, async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.customerId);
        res.json(customer.toJSON());
    } catch (err) {
        res.json({ message: err });
    }
});

// create a customer
router.post('/', async (req, res) => {
    const customer = new Customer({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    });

    try {
        const savedCustomer = await customer.save();
        res.json(savedCustomer.toJSON());
    } catch (err) {
        res.json({ message: err });
    }
});

// update a customer
router.put('/:customerId', verifyToken, async (req, res) => {
    try {
        const updatedCustomer = await Customer.updateOne(
            { _id: req.params.customerId },
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone
                }
            }
        );
        res.json(updatedCustomer.toJSON());
    } catch (err) {
        res.json({ message: err });
    }
});

// delete specific customer
router.delete('/:customerId', verifyTokenAndAdmin, async (req, res) => {
    try {
        const removedCustomer = await Customer.findByIdAndDelete(req.params.customerId);
        res.json(removedCustomer.toJSON());
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router; // export the router