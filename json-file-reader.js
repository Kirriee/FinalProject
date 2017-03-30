// REQUIRE FS LIBRARY
var fs = require ("fs");

// FUNCTION THAT READS AND PARSES JSON DATA
function reader (filename, callback){
	fs.readFile(filename, 'utf-8', function (error, data){
		if (error) {
			console.log("There is an error");
			throw error;
		}	
		var parsedFile =JSON.parse(data);
		callback(parsedFile);

	})

}
// EXPORT FUNCTION TO APP.JS FILE
module.exports = reader;
