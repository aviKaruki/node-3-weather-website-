const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Path configuration for the express
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials"); 

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);


// Path for accessing static files
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Vaibhav Vats"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Vaibhav Vats"
    });
})

app.get("/help", (req,res) => {
    res.render("help", {
        title: "Help",
        message: "how you doin? Feel free to ask if in case you have any query.",
        name: "Vaibhav Vats"
    })
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        });
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error : error
                });
            }
            res.send([
                data = {
                    Temperature : forecastData.temperature,
                    weather     : forecastData.Weather,
                    Description : forecastData.Description
                },
                location = {
                    location,
                    lat : latitude,
                    long: longitude
        
                }
            ]);
        });
    });
});

app.get("/products", (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: "You must enter the search term"
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Vaibhav Vats",
        errorMessage: "Help Article not found"
    })
});


app.get("*", (req, res) => {
    res.render("404", {
        title: "Error",
        name: "Vaibhav Vats",
        errorMessage: "Page not found"
    });
}); 

app.listen(3000, () => {
    console.log("Server is up at port 3000.");
});