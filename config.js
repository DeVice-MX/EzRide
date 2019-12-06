
const dotenv = require('dotenv'); //Used for environment variables
dotenv.config();

module.exports = {
	port: process.env.PORT || 8080,
	db: process.env.MONGODB || process.env.DATABASE
	
}