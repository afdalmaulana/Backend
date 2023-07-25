const request = require("supertest")
const app = require("../index")
const nock = require("nock")

// describe("GET /api/pokemons", () => {
//     it("should return an array of pokemons", async () => {
//         const response = await request(app).get("/api/pokemons")
//         expect(response.status).toBe(200)
//     })
// })

describe("GET /api/pokemons", () => {
    it("should return an array of pokemons", async () => {
        const nockResponse = {
            result : [

                {
                    name : "bulbasaur",
                    url : "https://pokeapi.co/v2/pokemon/1/",
                },
                {
                    name : "ivysaur",
                    url : "https://pokeapi.co/v2/pokemon/2/",
                },
            ],
        };
        nock("https://pokeapi.co").get("/api/v2/pokemon").reply(200, nockResponse)
        const response = await request(app).get("/api/pokemons");
        expect(response.status).toBe(200)
        expect(response.body).toEqual(nockResponse.result)
    });
})