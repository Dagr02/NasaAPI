
require("dotenv").config()

const express = require('express')
const cors = require('cors')
const app = express()

// Routers

const nasaRouter = require('./routes/nasaRouter')
app.use(express.json())
app.use(cors({
    origin: "https://nasa-api-q5je.vercel.app",
}))
app.use("/", nasaRouter)

app.listen(3001, () => {
    console.log("Server running on port 3001");
});