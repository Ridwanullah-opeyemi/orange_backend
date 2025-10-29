const Stripe = require("stripe")
const orderModel = require("../model/orderModel.js")
const userModel = require("../model/userModel")

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// placing user order for frontend
const placeOrder = async (req, res) => {

    const frontedurl = process.env.FRONTEND_BASE_URL

    try {
        const newOrder = await orderModel.create({
            ...req.body
        });

        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 5 * 100 
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontedurl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontedurl}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({
            success: true,
            session_url: session.url
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error
        })
    }
}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({
                success: true,
                message: "paid"
            })
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({
                success: false,
                message: "not paid"
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "error"
        })
    }
}

// user order for frontend
const userOrder = async (req,res) => {
    try {
        const orders = await orderModel.find({
            userId:req.body.userId
        });
        res.json({
            success: true,
            data : orders
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message: "Error"
        })
    }
}

//LISTING order for admin panal
const listOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({});
        res.json({
            success: true,
            data: orders
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "error"
        })
    }
} 

//api for updating order status
const upDateStatus = async (req,res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status}) 
        res.json({
            success: true,
            message: "status updated"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "error updating status"
        })
    }
}

module.exports = {
    placeOrder,
    verifyOrder,
    upDateStatus,
    userOrder,
    listOrders
}