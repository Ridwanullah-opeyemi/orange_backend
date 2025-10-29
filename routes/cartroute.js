const express = require("express")
const { addToCart, getCart, removeFromCart } = require("../controllers/cartController.js")
const authMiddlewere = require("../middleware/auth.js")

const cartRouter = express.Router()

cartRouter.post("/add", authMiddlewere,addToCart)
cartRouter.post("/remove",authMiddlewere, removeFromCart)
cartRouter.post("/get",authMiddlewere, getCart)

module.exports = cartRouter

