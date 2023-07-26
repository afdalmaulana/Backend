const axios = require("axios")
const url = process.env.JSON_SERVER_URL;
const db = require("../models")
const blog = db.Blog;
const category = db.Category;
const user = db.User;
const country = db.Country
const {Op} = db.Sequelize

const blogController = {
    getBlog : async(req, res) => {
        const {id, title, categoryId, orderBy, size, page } = req.query;
        const limitPerPage = parseInt(size) || 10;
        const pageNumber = parseInt(page) || 1;
        const iniId = parseInt(id);
        const offset = (pageNumber - 1) * limitPerPage;
        const findTitle = {title : { [Op.like] : `%${title || ""}%`}}
        if(categoryId) findTitle.categoryId = categoryId;
        try { 
            const result = await blog.findAll({
                attributes : {exclude : ["categoryId"]},
                where : iniId || findTitle,
                limit : limitPerPage,
                blogPage : pageNumber,
                offset,
                include : [
                    { model : user, attributes : ["id", "username", "img"] },
                    { model : category, attributes : {exclude : ["createdAt", "updatedAt"]} },
                    { model : country, attributes : ["id", "country_name"] }],
                    order : [["createdAt", orderBy || "ASC"]]
            })
            if(result.length > 0){ return res.status(200).json({
                    message : "Get Blog Success",
                    listLimit : limitPerPage,
                    blogPage : pageNumber,
                    data : result})
            } else {return res.status(500).json({message : "Blog not found" })}
        } catch (error) {res.status(500).send({message:"error", error : error.message})}},
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
            const {title, content, videoUrl, categoryId, countryId, keywords} = req.body
            if(content.length > 500)return res.status(500).json({message : "Content maximum 500 character"})
            await db.sequelize.transaction(async (t) => {
                const result = await blog.create({
                    title,
                    content,
                    categoryId,
                    countryId,
                    userId : req.user.id,
                    imgBlog: req.file.path,
                    videoUrl,
                    keywords,
                }, {transaction : t})
                return res.status(200).json({
                    message : "Blog Created",
                    data : result
                })
            })
        } catch (error) {
            return res.status(500).send({message: "Invalid input", error: error.message})
        }
    },
    getCategory : async (req, res) => {
        try {
            const result = await category.findAll({
                attributes : { exclude : ["createdAt", "updatedAt"]}
            })
            res.status(200).json({
                message : "Get data success",
                data : result
            })
        } catch (error) {
            res.status(500).send({
                message:"Get data failed",
                error : error.message
            })
        }
    },
    getCountry : async (req, res) => {
        try {
            const result = await country.findAll({
                attributes : { exclude : ["createdAt", "updatedAt"]}
            })
            res.status(200).json({
                message : "Get data success",
                data : result
            })
        } catch (error) {
            res.status(500).send({
                message:"Get data failed",
                error : error.message
            })
        }
    }
}


module.exports = blogController