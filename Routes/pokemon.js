const express = require('express')
const router = express.Router()
const axios = require("axios")

router.get("/", async (req, res) => {
    try {
        const {data} = await axios.get("https://pokeapi.co/api/v2/pokemon");
        res.json(data.result)
    } catch (error) {
        console.log("error fetching pokemon", error)
        res.status(500).json({error : error.message})
    }
})

module.exports = router