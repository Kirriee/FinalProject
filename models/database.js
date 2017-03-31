//- JAVASCRIPT CODE TO COMMUNICATE WITH DATABASE BY USING SEQUELIZE //


// SET UP CONNECTION WITH DATABASE
const Sequelize = require('sequelize')
const fileReader = require (__dirname + "/../json-file-reader");
var db = new Sequelize ('postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/trips');

// TESTING DATABASE CONNECTION
db
.authenticate()
.then(function(err) {
	console.log('Connection has been established successfully.');
}, function (err) {
	console.log('Unable to connect to the database:', err);
});

// DEFINE MODEL (W/ DESTINATIONS)
const Destination = db.define('destination', {
	city: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	country:{
		type:Sequelize.STRING,
		allowNull:false, 
	},
	description:{
		type:Sequelize.TEXT,
		allowNull:false, 
	},
	image:{
		type:Sequelize.STRING,
		allowNull:false,
	},
	poloroid:{
		type:Sequelize.STRING,
		allowNull:false,
	},
	caption:{
		type:Sequelize.STRING,
		allowNull:false,
	}

});


// SYNC DATABASE
db.sync({
	force:true			// drops tables before recreating
}).then(function(){
	var getCity = function (cities){
		for (var i=0; i < cities.length; i++){
			console.log(cities[i].city)
			// console.log(json[i].country)
			// console.log(json[i].currency)
			Destination.create({
				city: (cities[i].city),
				country: (cities[i].country),
				description:(cities[i].description),
				image:(cities[i].image),
				poloroid:(cities[i].poloroid),
				caption:(cities[i].caption)

			})
		}
	}
	fileReader('./cities.json', getCity) // PASS FILE TO JSON FILE READER

	



	// return Destination.create ({
	// 	city: "Barcelona",
	// 	country: "Spain"
	// }).then(function(){
	// 	return Destination.create ({
	// 		city: "Tel Aviv",
	// 		country: "Israel"
	// 	})
	// }).then(function(){
	// 	return Destination.create ({
	// 		city: "Moscow",
	// 		country: "Russia"
	// 	})
	// })
	// .catch ( function (error){
	// 	console.log(error)
	// })
})







// EXPORT MODEL TO APP.JS
module.exports = {
	db: db,
	Destination:Destination
	
}