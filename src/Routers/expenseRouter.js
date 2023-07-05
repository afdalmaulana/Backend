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
            console.log(result.data)
            res.status(200).send(result.data)
    } catch (error) {
        console.log("error")
        res.status(500).json({message: error})
    }
    // res.send("Foyafoya")
})

router.get("/list/details/:id", async (req, res) => {
    const {id} = req.params
    try {
        const respon = await axios.get(`${axiosURL}/user/${id}`)
        console.log(axiosURL)
        res.send(respon.data)
    } catch (error) {
        res.status(500).send({message:error});
    }
})

router.post("/new-expense", async (req, res) => {
    try {
        const respon = await axios.post(
            `${axiosURL}/user`, req.body
        )
        res.send(respon.data)
    } catch (error) {
        res.status(500).send({message:error})
    }
})

router.patch("/edit-expense/:id", async (req,res)=> {
    const {id} = req.params
    try {
        const respon = await axios.patch(
            `${axiosURL}/user/${id}`, req.body
        )
        res.send(respon.data)
    } catch (error) {
        res.status(500).send({message:error})
    }
})

router.delete("/delete-expense/:id", async (req, res) => {
    const {id} = req.params
    try {
        const respon = await axios.delete(
            `${axiosURL}/user/${id}`, req.body
        )
        res.send("Expense Deleted")
        console.log(respon.data)
    } catch (error) {
        res.status(500).send({message:error})
    }
})

router.get("/total-expense/:category", async (req, res) => {
    const {category} = req.params
    try {
        const respon = await axios.get(
            `${axiosURL}/user/${category}`
        )
        res.send("Total Expense", respon.data )
    } catch (error) {
        res.status(500).send({message:error})
    }
})

module.exports = router;