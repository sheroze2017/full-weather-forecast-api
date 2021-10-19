const request=require('postman-request')
const forecast = (latitude,longitude,callback) => {
const url='http://api.weatherstack.com/current?access_key=160ddccb4c8fb27cc0a3d4d5a39fb092&query='+latitude+','+longitude+'&units=f'

    request({ url, json: true }, (error, {body}) => {
            if (error) {
                callback('Unable to connect to location services!', undefined)
            } else if (body.error) {
                callback('Unable to find location. Try another search.', undefined)
            } else {
                callback(undefined,
 
                      body.current.weather_descriptions[0]+" , it is currently " + body.current.temperature
                        + " degrees out ")

                
            }
        })
    
    }
    module.exports=forecast