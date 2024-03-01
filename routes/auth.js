const router = require("express").Router();
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require('../models/User');
const Customer = require('../models/Customer');
const { verifyTokenAndAdmin } = require('../middleware/verifyToken');

// register
router.post('/register', async (req, res) => {

    const newUser = new User({
        username: req.body.username,
        password: cryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
        role: 'customer'
    });

    try {
        const savedUser = await newUser.save();
        const newCustomer = new Customer({
            user: savedUser._id,
            name: req.body.name,
            email: req.body.email,
        });
        const savedCustomer = await newCustomer.save();
        if (!savedCustomer) {
            res.status(500).json("Error creating customer!");
            // delete user
            await User.findByIdAndDelete(savedUser._id);
            return;
        }

        // create token
        const accessToken = jwt.sign({
            _id: savedUser._id,
            role: savedUser.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "1d"});
        const { password, ...others} = savedUser.toJSON();
        res.status(201).json({...others, accessToken});
    } catch (error) {
        res.status(500).json(error);
    }
});

// login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user) {
            res.status(401).json("Wrong credentials!");
            return;
        }

        const hashedPass = cryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET);
        const originalPassword = hashedPass.toString(cryptoJS.enc.Utf8);
        if (originalPassword !== req.body.password) {
            res.status(401).json("Wrong credenetials!");
            return;
        }
        const accessToken = jwt.sign({
            _id: user._id,
            role: user.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "1d"});
        const { password, ...others} = user.toJSON();
        res.status(200).json({...others, accessToken});
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;