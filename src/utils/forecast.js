const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=hourly,minutely&appid=d67ef8ed3e80ef1c2f0a3b4bbcc8c5c8&units=metric"
    request({url, json: true}, (error, response) => {
        if (error) {
            callback("Unable to connect to the weather service! Please check your connectivity.", undefined);
        } else if (response.body.error) {
            callback("No results found", undefined);
        } else {
            callback(undefined, {
                temperature: response.body.current.temp,
                Weather : response.body.current.weather[0].main,
                Description : response.body.current.weather[0].description,
                Percipitaion: (response.body.current.rain === undefined? "0%":response.body.current.rain)
            });
           
        }
    });
}

module.exports = forecast;