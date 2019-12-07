'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');



// const MongoClient = require('mongodb').MongoClient;
// const uri = process.env.DATABASE;

// MongoClient.connect(uri, function(err, db) {
//   db.close();
// });
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


mongoose.connect(config.db, { useNewUrlParser: true })
.then((res) => {
	console.log("Mongo connected!");

	app.get('/',(req, res)=>{
		res.send(`API EZRIDE VERSIÓN:${process.env.npm_package_version}`);
	});

	app.listen(config.port, () => {
		console.log(`API EZRIDEq JALANDO EN:${config.port}`);
	});
})
.catch((err) => {
	console.log(err)
});