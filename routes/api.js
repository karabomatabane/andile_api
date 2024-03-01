const router = require('express').Router();
const authRoute = require("./auth");
const productRoute = require("./product");
const productsRoute = require("./products");
const customerRoute = require("./customer");
const orderRoute = require("./order");
const ordersRoute = require("./orders");
const cartRoute = require("./cart");
const {removeProductsHandler} = require("./products");

router.use("/auth", authRoute);
router.use("/product", productRoute);
router.use("/products", productsRoute.router);
router.post("/remove-products", removeProductsHandler);
router.use("/customer", customerRoute);
router.use("/order", orderRoute);
router.use("/orders", ordersRoute);
router.use("/cart", cartRoute);

module.exports = router;
