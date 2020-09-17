const request = require('request')
const geocode= (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoidmFpc2g5NiIsImEiOiJja2V4MWEyaHM0a2IxMnNwY3VlNW14YW93In0.S1I_yRUPSZcuFBBen2oHNw'
request({url, json:true}, (error, {body})=>
{
    if(error)
    {
        callback('Poor network connection', undefined)
    }
    else if(body.features.length===0)
    {
        callback('Invalid search query', undefined)
    }
    else{
        
      callback(undefined, {longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name

      })
      
        
    }
})
}

module.exports= geocode;
