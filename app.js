// REQUIRE LIBRARIES

const express = require ('express')
const Sequelize = require ('sequelize')
const bodyParser = require ('body-parser')
const app = express ()
const session = require('express-session')

// REQUIRE MODULES
const db = require(__dirname + '/models/database.js')
const fileReader = require (__dirname + "/json-file-reader");

//SETTING VIEW ENGINE
app.set('views','./views');
app.set('view engine', 'pug');
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to ssupport URL-encoded bodies
	extended: false
})); 

// MIDDLEWARE

app.use(express.static('public'));

// ROUTES

app.get('/', function(request, response){
	response.render('index2')
})

app.get('/destination', function (request, response){


	db.Destination.find(     // FIND ONE RANDOM RECORD IN DESTINATION TABLE
	{
		order: [Sequelize.fn( 'RANDOM' )]
	}
	).then((cityPicker) => {
		console.log("hier lezen")
		console.log(cityPicker)
		response.render('destination',
		{
			cityPicker:cityPicker // PASS THE RECORD AS OBJECT TO FRONT

		})

	})
})

app.get('/destination/:country', (req, res) => {
	const country = req.params.country
	db.Destination.findOne({where: {country: country}}).then( country => {
		console.log(country)
		res.render('country_detail.pug', {country: country})
		
	})
	
})



// START THE SERVER

app.listen(process.env.PORT || 3000, function(){
	console.log("The server has started and is listening on port 3000")
})

