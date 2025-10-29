const connectDb = require("./config/db");
const express = require("express")
const transproter = require("./server/transproter")
const userRouter = require('./routes/userRoute')
const orderRouter = require('./routes/orderRoute')
const foodrouter = require("./routes/foodroute")
const cartRouter = require("./routes/cartroute")
const cors = require("cors")

// --- APP CONFIG ---
const app = express();
const port = 4005;

// --- MIDDLEWARE --- 
app.use(express.json()); 
app.use(cors());        

// --- DB CONNECT ---
connectDb();

// --- API ENDPOINTS ---
app.use("/api/food", foodrouter);
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
    res.send('API working');
});

// --- SERVER START ---
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
