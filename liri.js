///////// variables ////////////
var fs = require("fs");
var keys = require("./keys.js");
var keysT = keys.twitterKeys; 
var keysS = keys.spotifyKeys; 
var request = require("request");


//////// required app commands ///////////
if (keys.commands.action === 'movie-this' && keys.commands.value === undefined) { 
	movieNull();
	}	

if 	(keys.commands.action === 'movie-this' && keys.commands.value) { 
	movie();
}
	
if (keys.commands.action === 'my-tweets') { 
	twitter(); 
}

if (keys.commands.action === 'spotify-this-song' && keys.commands.value) { 
	spotify(); 
}

if (keys.commands.action === 'spotify-this-song' && keys.commands.value === undefined) { 
	spotifyNull(); 
}


if (keys.commands.action === 'do-what-it-says') { 
	doIt(); 
}



//////////  if nothing is entered in movie function  /////////////
function movieNull() { 


/////////// logic for retrieving data from omdb API  /////////////// 
var nobodyURL = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=40e9cece";

request(nobodyURL, function(error, response, body) {

  if (!error && response.statusCode === 200) {

    console.log("Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("IMBD Rating: " + JSON.parse(body).imdbRating);

    if (JSON.parse(body).Ratings.length > 1 ){ 
    console.log("Rotten Toms Rating: " + JSON.parse(body).Ratings[1].Value);
}
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
	console.log("Plot: " + JSON.parse(body).Plot);
	console.log("Actors: " + JSON.parse(body).Actors);
    }
  })
};



//////// movie function if user enters a query ////////// 
function movie() { 

var queryUrl = "http://www.omdbapi.com/?t=" + keys.commands.value + "&y=&plot=short&apikey=40e9cece";

request(queryUrl, function(error, response, body) {

  if (!error && response.statusCode === 200) {

    console.log("Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("IMBD Rating: " + JSON.parse(body).imdbRating);

    if (JSON.parse(body).Ratings.length > 1 ){ 
    console.log("Rotten Rating: " + JSON.parse(body).Ratings[1].Value);
}
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
	console.log("Plot: " + JSON.parse(body).Plot);
	console.log("Actors: " + JSON.parse(body).Actors);
	}
  })
};



//////// twitter function to display 20 most recent tweets //////////// 
function twitter() { 
	var properties = {screen_name: 'mccarthinator', count: 20};
	keysT.get('statuses/user_timeline', properties, function(error, data, response) {
 	 if (!error) {
 	 	 for (var i = 0; i < data.length ; i++) {
   		 console.log(data[i].text);
  		}
 	 }
 });
}

/////// spotify function if nothing entered by user /////////////
function spotifyNull() { 
keysS.search({ type: 'track', query: 'the+sign+Ace+of+Base' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 	else { 
		var songInfo = data.tracks.items[0];
		var songResult = console.log(songInfo.artists[0].name)
	    console.log(songInfo.name)
	    console.log(songInfo.album.name)
	    console.log(songInfo.preview_url)
   		}
   });
}




/////////// spotify function if something is queried by user ////////////////
function spotify() { 
keysS.search({ type: 'track', query: keys.commands.value }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 	else { 
		var songInfo = data.tracks.items[0];
    	var songResult = console.log(songInfo.artists[0].name)
        console.log(songInfo.name)
        console.log(songInfo.album.name)
        console.log(songInfo.preview_url)
   		}
	});
}

//////// do-what-it-says function //////////
function doIt() { 
fs.readFile("random.txt", "utf8", function(error, data) {

  keysS.search({ type: 'track', query: data }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 	else { 
		var songInfo = data.tracks.items[0];
    	var songResult = console.log(songInfo.artists[0].name)
        console.log(songInfo.name)
        console.log(songInfo.album.name)
        console.log(songInfo.preview_url)
   		}
	});
  });
}

 
 
