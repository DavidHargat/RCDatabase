/* 
* @Author David Hargat
* @Date 8/31/2015
* @Description Simple database made for Recurse Center interview.
*/

var http = require("http");

// port the server is listening on
var port = 4000;
// Key/value stored in an object
var data = {};

// Handle set requests
var handleSetRequest = function( key ){
	var equation = key.split("=");
	// If correct number of parameters...
	if(equation.length == 2){
		var name = equation[0];
		var value = equation[1];
		
		// If either parameter is empty, return error message
		if( !(name.length>0) || !(value.length>0) )
			return "Error: Invalid Set Parameters";
		
		// Set the data!
		data[name] = value;
		return "Success " + key
	}else{
		// If wrong number of parameters, return error message
		return "Error: Invalid Set Request " + key
	}
};

// Handle get requests
var handleGetRequest = function( key ){
	if(data[key]){
		return data[key]; // Return key/value if it exists
	}else{
		return "undefined"; // Else return 'undefined'
	}
};

// Parse and handle a database request
var handleRequest = function( url ){
	var sentence = url.split("?");
	var type     = sentence[0]; // 'get' or 'set'
	var key      = sentence[1]; // 'key' or 'key=value'
	
	// If correct number of parameters...
	if( sentence.length == 2 ){
		
		if( type.toLowerCase() == "get" )
			return handleGetRequest(key);
		
		if( type.toLowerCase() == "set" )
			return handleSetRequest(key);
		
		return "Error: Invalid Parameter " + type; // Invalid 'type' parameter
		
	}else{
		return "Error: Wrong Number Of Parameters " + type; // Wrong number of parameters
	}
	
};

// Handle requests to the server
var handleServerRequest = function( req, res ){
	var url = req.url.split("/")[1];
	console.log("Request: " + url);
	var output = handleRequest(url);
	console.log("Response: " + output);
	res.end(output);
};

var server = http.createServer(handleServerRequest);

console.log("Database Listening on *"+port);
server.listen(port);
