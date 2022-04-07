import request from 'postman-request'

export default function geocode(address, callback){
    const geocodingApi=`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic3VzaG1hcCIsImEiOiJjbDFnaTliYnowbzh3M2xwM2FwNTVpYm42In0.f0S34NLpa_fhTct4Bpa5tw&limit=1`

    request({url: geocodingApi, json: true}, (error, response, body) => {
        if(error){
            callback('Unable to connect to geocoding API', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location, try another search', undefined)
        }else
            callback(undefined, {
                longitude: body.features[0].center[0], 
                latitude: body.features[0].center[1],
                location: body.features[0].place_name})
    })

}