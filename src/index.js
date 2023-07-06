const path = require("path")
require("dotenv").config({
    path : path.resolve(__dirname,"../.env")
})

const express = require("express")
const PORT = process.env.PORT || 8000;

const {userRouter, blogRouter} = require("./Routers");

const app = express()
app.use(express.json())

app.use("/api/mini-project/auth", userRouter)
app.use("/api/mini-project", blogRouter)

app.use((req, res, next) => {
    console.log("Time", Date.now())
    next();
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})