const path = require("path");
require("dotenv").config({
  path : path.resolve("../.env")
})

module.exports = {
    development: {
      username: process.env.DB_Username,
      password: process.env.DB_Password,
      database: process.env.DB_Database,
      host: process.env.DB_Host,
      dialect: "mysql"
    },
    test: {
      username: process.env.DB_Username,
      password: process.env.DB_Password,
      database: process.env.DB_Database,
      host: process.env.DB_Host,
      dialect: "mysql"
    },
    production: {
      username: process.env.DB_Username,
      password: process.env.DB_Password,
      database: process.env.DB_Database,
      host: process.env.DB_Host,
      dialect: "mysql"
    }
}

