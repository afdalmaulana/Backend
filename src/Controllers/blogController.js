const axios = require("axios")
const url = process.env.JSON_SERVER_URL;
const db = require("../models")
const blog = db.Blog;
const {op} = db.sequelize

const blogController = {
    getBlog : async(req, res) => {
        try {
            const { category } = req.query;
            const paramCategory = category ? "category=" + category : "";
            const result = await blog.findAll()
            if(result.length > 0){
                return res.status(200).json({
                    message : "Get Blog Success",
                    data : result
                })
            } else {
                return res.status(500).json({
                    message : "Blog not found"
                })
            }
            // const {data} = await axios.get(
            //     `${url}/blog?${paramCategory}`
            // )
            // if (data.length > 0){
            //     res.status(200).json({
            //         message: "Blog Details",
            //         data
            //     })
            // }else{
            //     res.status(500).send({message:"Blog not found"})
            // }
            // res.status(200).send(respon.data)
        } catch (error) {
            res.status(500).send({message:"error", error : error.message})
        }
    },
    getBlogById : async (req, res) => {
        try {
            const {id} =req.params;
            const result = await blog.findOne({
                where : {
                    id 
                }
            })
            res.status(200).json({
                message: "Blog Details",
                data : result
            })
        } catch (error) {
            req.status(500).send("Blog not found")
        }
    },
    postBlog : async (req, res) => {
        try {
            const {title, content} = req.body
            await db.sequelize.transaction(async (t) => {
                const result = await blog.create({
                    title,
                    content
                }, {transaction : t})
                return res.status(200).json({
                    message : "Blog Created",
                    data : result
                })
            })
        } catch (error) {
            return res.status(500).send({message: "Invalid input", error: error.message})
        }
    }
}


module.exports = blogController