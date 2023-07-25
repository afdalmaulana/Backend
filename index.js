const express = require("express")
const app = express();
const port = 8000

const userRoutes = require("./Routes/user")
const pokemonRoutes = require("./Routes/pokemon")

app.use("/api/users", userRoutes)
app.use("/api/pokemons", pokemonRoutes)
app.listen(port, () => {
    console.log(`Port ${port}`)
})

module.exports = app