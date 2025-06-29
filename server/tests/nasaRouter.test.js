const request = require("supertest")
const express = require("express")
const nasaRouter = require("../routes/nasaRouter")


const app = express()
app.use(express.json())
app.use("/", nasaRouter)

jest.mock("../services/nasaService", () => ({
    getAPOD: jest.fn().mockResolvedValue({ title: "Sample APOD", date: "2025-06-29" }),
    getMRP: jest.fn().mockResolvedValue({ photos: [] }),
    getNeoFeed: jest.fn().mockResolvedValue({ element_count: 1 })
}))

describe("NASA API Routes", () => {
    it("GET /APOD returns mock APOD data", async () => {
        const res = await request(app).get("/APOD")
        expect(res.statusCode).toBe(200)
        expect(res.body.title).toBe("Sample APOD")
    })

    it("GET /MRP should return mock Mars Rover data", async () => {
        const res = await request(app).get("/MRP?rover=curiosity&sol=1000");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.photos)).toBe(true);
    });

    it("GET /NeoWs should return mock NEO data", async () => {
        const res = await request(app).get("/NeoWs?start_date=2025-06-01&end_date=2025-06-02");
        expect(res.statusCode).toBe(200);
        expect(res.body.element_count).toBe(1);
    });
})