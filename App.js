var express = require("express");
var app = express();
var ejs = require("ejs");
//var fs = require("fs");
var url = require("url");
var querystring = require("querystring");

app.get("/", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.render("index.ejs");
});

app.get("/resultat.html", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  const ville = querystring.parse(req.url).query;
  console.log(ville);
  res.render("resultat.ejs");
});

app.listen(8080);
