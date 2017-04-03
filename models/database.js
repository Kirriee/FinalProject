//- JAVASCRIPT CODE TO COMMUNICATE WITH DATABASE BY USING SEQUELIZE //

// set up connection with database
const Sequelize = require('sequelize')
const fileReader = require (__dirname + "/../json-file-reader");

if (process.env.DATABASE_URL) {
  // the application is executed on Heroku ... use the postgres database
 var db = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres',
    logging:  false
  });
} else {
  // the application is executed on the local machine
  var db = new Sequelize ('postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/trips');
  }

// testing database connection
db
.authenticate()
.then(function(err) {
	console.log('Connection has been established successfully.');
}, function (err) {
	console.log('Unable to connect to the database:', err);
});

// desfine model (w/ destinations)
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

// sync database
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
	fileReader('./cities.json', getCity) // pass file to JSON file reader
})

// export model to app.js
module.exports = {
	db: db,
	Destination:Destination
	
}