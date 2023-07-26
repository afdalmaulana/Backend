const path = require("path")
require("dotenv").config({
    path : path.resolve(__dirname,"../.env")
})
const PORT = process.env.PORT;
const express = require("express")
const db = require("./models")
const app = express();

const {infoLogger} = require("./helpers/logger")

const { userRouter, profileRouter, blogRouter } = require("./Routers")

app.use(express.json());
app.use("/mini-project/api", userRouter, profileRouter, blogRouter)
app.use("/public", express.static(path.resolve(__dirname, "./public")))

// db.sequelize.sync({alter:true});
// ini untuk function declaration
// app.listen(PORT, function () {
//     infoLogger.info(`Server is running on port ${PORT}`)
//     // console.log(`Server is running on port ${PORT}`)
// })

// ini untuk arrow function
app.listen(PORT, () => {
    infoLogger.info(`Server is running on port ${PORT}`)
    // console.log(`Server is running on port ${PORT}`)
})