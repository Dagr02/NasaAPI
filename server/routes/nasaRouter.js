const express = require('express');
const router = express.Router();

const { getAPOD, getMRP, getNeoFeed } = require("../services/nasaService") 


router.get("/", (req, res) => {
    res.send("Hello World")
})

router.get("/APOD", async (req, res) => {
    try {
        const data = await getAPOD(req.query);
        res.json(data);
    } catch (err) {
        res.status(500).json({error: 'Failed to fetch APOD data.'})
    }
})

router.get("/MRP", async (req, res) => {
    try {
        const data = await getMRP(req.query);
        console.log("Fetching mars rover photos")
        res.json(data);
    }catch (err){
        res.status(500).json({error: 'Failed to fetch Mars Rover data.'})
    }

})

router.get("/NeoWs", async (req, res) => {
    try{
        console.log("Fetching neoWs data.")
        const data = await getNeoFeed(req.query)
        res.json(data)
    }catch(err){
        console.log(err)
        res.status(500).json({error: 'Failed to fetch NeoWs data.'})
    }
})


module.exports = router;