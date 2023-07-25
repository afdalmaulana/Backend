const request = require("supertest")
const app = require("../index");

const {User, sequelize} = require("../models")

// describe("GET /api/users", () => {
    // ini digunakan pengetesan untuk mencocokkan data yang kita input dibawah dengan data yang ada di database, perlu di seeder dulu
//     const sampleUsers = [
//         {
//             firstName : "Willis",
//             lastName : "Doe",
//             email : "willis@gmail.com",
//         },
//         {
//             firstName : "John",
//             lastName : "Smith",
//             email : "john@gmail.com",
//         },
//     ];

//     beforeAll(async () => {
//         await sequelize.sync();
//     })
//     beforeEach(async () => {
//         await User.bulkCreate(sampleUsers)
//     })

//     afterEach(async () => {
    // ini adalah pengetesan data seeder, setelah data dicocokkan dengan database lalu di hapus dengan destroy
//         await User.destroy({where: {} })
//     })
//     afterAll(async () => {
//         await sequelize.close()
//     })
    
//     it("should return an array of users", async() => {
//         const response = await request(app).get("/api/users");
//         expect(response.status).toBe(200);
//         expect(response.body).toMatchObject(sampleUsers)
//     })
// })

jest.mock("../models")
describe("GET /api/users", () => {
    // ini hanya melakukan pengetesan mencocokan data di database, tapi data tidak mengakses database secara langsung yaitu input ke database
    it("should return an array of users", async() => {
    const mockUsers = [
        {
            firstName : "Willis",
            lastName : "Doe",
            email : "willis@gmail.com",
        },
        {
            firstName : "John",
            lastName : "Smith",
            email : "john@gmail.com",
        },
    ];
    User.findAll.mockResolvedValue(mockUsers)    
        const response = await request(app).get("/api/users");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUsers)
    })
})

