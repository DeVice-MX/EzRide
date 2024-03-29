'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//CONTROLADORES AQUI

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

//APIS AQUI

module.exports = app;