const request = require('request')
//const geocode= require('utils/geocode')

const forecast= (longitude, latitude, callback)=>
{
    
        const url= 'http://api.weatherstack.com/current?access_key=805480c4b95aaca43ec44e4da3420f7f&query='+latitude+','+longitude+'&units=m'

        request({url, json:true}, (error, {body})=>
        {
            if(error)
            {
                callback('Poor Network connection', undefined)
            }
            else if(body.error)
            {
           callback('Invalid search query', undefined)
            }
            else{
                callback(undefined, body.current.weather_descriptions[0]+". It is curently " +body.current.temperature +" degree out. I feels like "+body.current.feelslike +" out there")
            }
        })


    
}

module.exports= forecast