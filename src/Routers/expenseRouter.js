const express = require("express")
const router = express.Router();
const axiosURL = process.env.JSON_SERVER_URL
const axios = require("axios")
// router.use((req,res,next) => {
//     console.log("Time", Date.now())
//     next();``
// })

router.get("/list", async (req, res) => {
    try {
        const result = await axios.get(`${axiosURL}/user`);
        if (result.data.length > 0 ){
            console.log(result.data)
            res.status(200).send(result.data)
        } 
    } catch (error) {
        console.log("error")
        res.status(500).json({message: error})
    }
    // res.send("Foyafoya")
})

router.get("/details", (req, res) => {
    res.send("Details")
})

router.post("/new-expense", (req, res) => {
    res.send("New list have been upload")
})

router.delete("/delete-expense", (req, res) => {
    res.send("Expense deleted")
})


module.exports = router;