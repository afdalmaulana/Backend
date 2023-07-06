// const express = require("express")
const axios = require("axios")
const url = process.env.JSON_SERVER_URL;

const getCategory = async (req, res) => {
    try {
        const respon = await axios.get(
            `${url}/category`
        )
        res.status(200).json({
            data: respon.data
        })
    } catch (error) {
        res.send({message:"error"})
    }
}

module.exports = {getCategory}