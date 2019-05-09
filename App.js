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

app.listen(8080);
