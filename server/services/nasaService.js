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
    if (!params.rover) {
        throw new Error('Rover parameters is required');
    }

    if (params.rover === "opportunity" || params.rover === "spirit") {
        throw new Error("Spirit & Opportunity are no longer available via nasa public API.")
    }
    //https://api.nasa.gov/mars-photos/api/v1/manifests/Curiosity/?api_key=Kc2zMNRUQaPwTmTNSU9HdjwJKKtRAYHkrIYLmzRC
    const endpointPhotos = `${BASE_URL}/mars-photos/api/v1/rovers/${params.rover}/photos`
    const endPointManifest = `${BASE_URL}/mars-photos/api/v1/manifests/${params.rover}`


    const resPhotos = await axios.get(endpointPhotos, {
        params: {
            api_key: API_KEY,
            ...params,
        }
    })

    let totalPhotos = 0;
    if (params.sol !== undefined) {
        const resManifest = await axios.get(endPointManifest, {
            params: {
                api_key: API_KEY
            }
        })
        const manifest = resManifest.data.photo_manifest
        const solDay = manifest.photos.find((p) => p.sol === Number(params.sol))

        if(solDay) {
            totalPhotos = solDay.total_photos
        }
    }
    
    console.log("Returned: ", resPhotos.data)
    console.log("Total photos: ", totalPhotos)
    console.log("Transforming & returning response")
    return {
        photos: resPhotos.data.photos,
        totalPhotos: totalPhotos
    }
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