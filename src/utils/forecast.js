import request from 'postman-request'

export default function forecast(latitude, longitude, callback) {
    const forecastApi = `http://api.weatherstack.com/current?access_key=86aa544f6699354b852f4504563d468f&query=${latitude},${longitude}&unit=f`

    request({url: forecastApi, json: true}, (error, response, body) => {
        if(error){
            callback('Unable to connect to forecast API', undefined)
        }else if(body === undefined){
            callback('Unable to fetch weather forecast, try another search', undefined)
        }else
            callback(undefined, body)
    })

}

