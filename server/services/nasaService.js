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

    const endpoint = `${BASE_URL}/mars-photos/api/v1/rovers/${params.rover}/photos`
    console.log(API_KEY)
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