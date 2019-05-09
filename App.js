var express = require("express");
var app = express();
//var ejs = require("ejs");
//var fs = require("fs");
var url = require("url");
var querystring = require("querystring");
var request = require("request");

app.get("/", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.render("index.ejs");
});

app.get("/resultat.html", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  var ville = querystring.parse(url.parse(req.url).query);
  res.render("resultat.ejs");
  console.log(ville);
  const appId = "17gBQGSEkfjEwNRPe9TW";
  const appCode = "GmOgt6V7CG5isKnZDN3udg";
  var path_here =
    "https://geocoder.api.here.com/6.2/geocode.json?app_id=" +
    appId +
    "&app_code=" +
    appCode +
    "&searchtext=" +
    ville["ville"];
  console.log(path_here);
  request(path_here, function(error, response, body) {
    const json = JSON.parse(body);
    var searchLatitude =
      json.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
    var searchLongitude =
      json.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
    console.log(searchLatitude, searchLongitude);
    const key = "e79eb0713f0bb55a3b7a9845d2408d61";
    const exclude = "exclude=minuely,hourly,daily,alerts,flags";
    const lang = "lang=fr";
    const units = "units=auto";
    const path_dk =
      "https://api.darksky.net/forecast/" +
      key +
      "/" +
      searchLatitude +
      "," +
      searchLongitude +
      "?" +
      exclude +
      "?" +
      lang +
      "?" +
      units;
    console.log(path_dk);
    request(path_dk, function(error, response, body) {
      //console.log(body);
      const json2 = JSON.parse(body);
      const summary = json2.currently.summary;
      const temperature = json2.currently.temperature;
      res.send(temperature);
    });
  });
});

app.listen(8080);
