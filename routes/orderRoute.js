const express = require("express")
const authMiddlewere = require("../middleware/auth.js")
const { listOrders, placeOrder, upDateStatus, userOrder, verifyOrder } = require("../controllers/orderController.js")

const orderRouter = express.Router()

orderRouter.post("/place", authMiddlewere,placeOrder)
orderRouter.post("/verify", verifyOrder)
orderRouter.post("/userOrders",authMiddlewere, userOrder)
orderRouter.get("/list", listOrders)
orderRouter.post("/status", upDateStatus)

module.exports = orderRouter; 