// require libraries
const express = require ('express')
const Sequelize = require ('sequelize')
const bodyParser = require ('body-parser')
const app = express ()
const session = require('express-session')

// requiere modules
const db = require(__dirname + '/models/database.js')
const fileReader = require (__dirname + "/json-file-reader");

//setting view engine
app.set('views','./views');
app.set('view engine', 'pug');
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to ssupport URL-encoded bodies
	extended: false
})); 

// middleware
app.use(express.static('public'));

// routers
app.get('/', function(request, response){
	response.render('index')
})

app.get('/destination', function (request, response){


	db.Destination.find(     // find one radom record in destination table
	{
		order: [Sequelize.fn( 'RANDOM' )]
	}
	).then((cityPicker) => {
		console.log("hier lezen")
		console.log(cityPicker)
		response.render('destination',
		{
			cityPicker:cityPicker // pass the record as object to front

		})

	})
})

// route for specific country
app.get('/destination/:country', (req, res) => {
	const country = req.params.country 
	db.Destination.findOne({where: {country: country}}).then( country => {
		console.log(country)
		res.render('country_detail.pug', {country: country})
		
	})
	
})



// start the server

app.listen(process.env.PORT || 3000, function(){
	console.log("The server has started")
})

