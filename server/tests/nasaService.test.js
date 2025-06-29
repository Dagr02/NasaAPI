jest.mock("axios")
const axios = require("axios")

const { getAPOD, getMRP, getNeoFeed } = require("../services/nasaService")


describe("NASA Service Layer", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("fetches APOD data", async () => {
        axios.get.mockResolvedValue({ data: { title: "APOD Example" } });
        const data = await getAPOD();
        expect(data.title).toBe("APOD Example");
        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining("apod"), expect.any(Object));
    });

    it("throws error for missing rover param in getMRP", async () => {
        await expect(getMRP()).rejects.toThrow("Rover parameters is required");
    });

    it("throws error for Spirit/Opportunity rovers", async () => {
        await expect(getMRP({ rover: "spirit" })).rejects.toThrow("Spirit & Opportunity are no longer available via nasa public API.");
    });

    it("fetches NeoWs data", async () => {
        axios.get.mockResolvedValue({ data: { element_count: 2 } });
        const data = await getNeoFeed({ start_date: "2025-06-01", end_date: "2025-06-02" });
        expect(data.element_count).toBe(2);
    });
})