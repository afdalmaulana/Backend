const axios = require("axios")
const url = process.env.JSON_SERVER_URL;

const getBlog = async(req, res) => {
    try {
        const { category } = req.query;
        const paramCategory = category ? "category=" + category : "";
        const {data} = await axios.get(
            `${url}/blog?${paramCategory}`
        )
        if (data.length > 0){
            res.status(200).json({
                message: "Blog Details",
                data
            })
        }else{
            res.status(500).send({message:"Blog not found"})
        }
        // res.status(200).send(respon.data)
    } catch (error) {
        res.status(500).send({message:"error"})
    }
}

const getBlogById = async (req, res) => {
    try {
        const {id} =req.params;
        const {data} = await axios.get(
            `${url}/blog/${id}`
        )
        res.status(200).json({
            message: "Blog Details",
            data
        })
    } catch (error) {
        req.status(500).send("Blog not found")
    }
}

const postBlog = async (req, res) => {
    try {
        const respon = await axios.post(
            `${url}/blog`
        )
        res.status(200).send("Blog created")
    } catch (error) {
        res.status(500).send({message: "Invalid input"})
    }
}

module.exports = {getBlog, getBlogById, postBlog}