const axios = require("axios")

const BASE_URL = 'https://api.nasa.gov'
const API_KEY = process.env.NASA_API_KEY


//apod
exports.getAPOD = async (params = {}) => {
    const res = await axios.get(`${BASE_URL}/planetary/apod`, {
        params: {
            api_key: API_KEY,
            ...params,
        }
    })
    return res.data
}


//mars rover photos
exports.getMRP = async (params = {}) => {
    if(!params.rover) {
        throw new Error('Rover parameters is required');
    }

    if(params.rover === "opportunity" || params.rover === "spirit"){
        throw new Error("Spirit & Opportunity are no longer available via nasa public API.")
    }

    const endpoint = `${BASE_URL}/mars-photos/api/v1/rovers/${params.rover}/photos`

    const res = await axios.get(endpoint, {
        params: {
            api_key: API_KEY,
            ...params,
        }
    })
    console.log("Returned: ", res.data)
    console.log("Transforming & returning response")
    return res.data
}

exports.getNeoFeed = async (params = {}) => {
    const endpoint = `${BASE_URL}/neo/rest/v1/feed`
    console.log("NeoWs API call at new dates: ", params.start_date, params.end_date)
    const res = await axios.get(endpoint, {
        params: {
            api_key: API_KEY,
            ...params,
        }
    })

    return res.data
}