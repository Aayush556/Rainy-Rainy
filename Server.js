
//import modules of need
const express = require("express")
const request = require("request")
const app = express()
const port = 8008
app.get("/:city", retrieveFunction) 
//handler for fetching weather of city
app.listen(port, () => console.log("server.js - hosted on port " + port)
)
//check if there is rain in next 4 days(96 hours) and return "Pack an umbrella for your journey" if raining
function umbrellaCheck(weather) { 
 for (let i = 0; i < 32; i++) {
 
if (
 
typeof weather.list != "undefined" &&
 
weather.list[i]
.weather[0]
.main === "Rain"
 
)
 
return " Pack an umbrella for your journey ";
 }
 return "You dont have to carry umbrella";
}
//check the average temperate for next 4 days and return the type of clothes you should carry.
function packing(weather) {
 let sum = 0;
 for (let i = 0; i < 32; i++) {
 
sum = sum + weather.list[i]
.main.temp;
 }
 if (typeof weather.list != "undefined" && sum / 32 < 12)
 { 
 return "Pack warm clothes because weather is cold at destination "}
 else if (
 
typeof weather.list != "undefined" &&
 
sum / 32 >= 12 &&
 
sum / 32 <= 24
 )
 
return "weather is going to be great, not too cold not too hot";
 else if (typeof weather.list != "undefined" && sum / 32 > 24)
 
return "pack light clothes because weather is hot at destination ";
}
//fetch the open weather api for the requested city and send the result file to client 
function retrieveFunction(req, res) {
 console.log("Forecast request for place: " + req.params.city)
 let city = req.params.city;
 const response = request("https://api.openweathermap.org/data/2.5/forecast?q="+city+"&units=metric&APPID=6d5dfc6af6bfaea7734db1cc1e1241f3", 
function(err, response, body) {
 
if (err) {
 
console.log("Error occurred: ", err)
 
} else {
 
let weather = JSON.parse(body)
 
weather.checkRain = umbrellaCheck(weather);
 
weather.clothes = packing(weather);
 
weather = JSON.stringify(weather)
 
res.header("Access-Control-Allow-Origin", "*"); // allow access to all the clients requesting
 
res.send(weather); //return the json file to client
 
}
 })
}
