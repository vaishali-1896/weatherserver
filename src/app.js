const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode =  require('./utils/geocode')
//const address= process.argv[2]
console.log(__dirname)
//const argsv= require('argsv')
//used when we had html files in public folder
const publicDirectoryPath = path.join(__dirname, '../Public')

const viewpath= path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialspath)
const app= express()
app.use(express.static(publicDirectoryPath))

app.set('view engine', 'hbs')

app.set('views', viewpath)

app.get('', (req, res)=>
{
    //res.send('<h1>Weather</h1>')
    res.render('index',
    {
        title: "Weather",
        about: "Use this site to get Weather",
        name:"Vaishali"
    })
})

app.get('/about', (req, res)=>
{
    res.render('about', {
        title: 'about',
        name: "Vaishali"
    })
})

app.get('/weather', (req, res)=>
{
    if(!req.query.address){
        return res.send({
            error: "Please provide the address"
        })
    }
    geocode(req.query.address, (error, {longitude, latitude, location}={})=>
{
  
    if(error)
    {
return res.send('Error: ', error)

    }

forecast(longitude, latitude, (error,forecastData)=>
{
    if(error)
    {
        return res.send('error ', error)

    }
     res.send({location: location,
        Data: forecastData})
})

    })
// res.send({
//     forecast: 123,
//     location: 'Hyderabad',
//     address: req.query.address
   
// })
})

app.get('/help', (req, res)=>
{
    res.render('help', {
        title:'about',
        message: "How can we help you?"
    })
})
app.get('/product', (req, res)=>
{
    if(!(req.query.search))
    {
        return  res.send({
            error : "You need to send a search query"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res)=>
{
res.render('error', {
    message: "Help page for this article is not found",
})})

app.get('/*', (req, res)=>
{
    res.render('error', {
        message: " page not found",
    })
})
app.listen(3000, ()=>
{
    console.log("The server is up and running")
})