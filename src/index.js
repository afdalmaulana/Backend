const path = require("path")
require("dotenv").config({
    path : path.resolve(__dirname,"../.env")
})
const PORT = process.env.PORT;
const express = require("express")
const db = require("./models")
const app = express();

// const { userRouter } = require("./Routers")
const { userRouter, profileRouter, blogRouter } = require("./Routers")

app.use(express.json());
app.use("/mini-project/api", userRouter, profileRouter, blogRouter)


// db.sequelize.sync({alter:true});


// const express = require("express")
// const PORT = process.env.PORT || 8000;

// const {userRouter, blogRouter} = require("./Routers");

// const app = express()
// app.use(express.json())

// app.use("/api/mini-project/auth", userRouter)
// app.use("/api/mini-project", blogRouter)

// app.use((req, res, next) => {
//     console.log("Time", Date.now())
//     next();
// })

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})