import {dirname} from 'path'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
import express from 'express'
import hbs from 'hbs'
import geocode from './utils/geocode.js'
import forecast from './utils/forecast.js'

const app = express()

const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDirectory))

app.set('view engine', 'hbs')
app.set('views', viewsPath)

//TODO Fix partials error
//hbs.registerPartial(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Welcome',
        name: 'Sushma Murthy'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Sushma Murthy'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    console.log('Query', req.query)
    if(!address) {
        return res.send({
            Error: 'Address is required to fetch weather details'
        })
    }

    return geocode(address, (error, geoResponse) => {
        if(error) {
            return console.log(`Error: ${error}`)
        }
    
        forecast(geoResponse.latitude, geoResponse.longitude, (error, forecastResponse) => {
            if(error) {
                return console.log(`Error: ${error}`)     
            }
            const {temperature, feelslike} = forecastResponse.current

            console.log(geoResponse.location)
            const forecast = `It is currently ${temperature} degrees out, feels like ${feelslike} degrees.`

            res.send({
                address,
                forecast
            })
           
        })
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        msg: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server up and running on port 3000')
})