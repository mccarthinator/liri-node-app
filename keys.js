// console.log('this is loaded');

///// twitter keys ////////////
var Twitter = require('twitter');

exports.twitterKeys = Twitter ({
  consumer_key: 'bAJrcVKs5QpXSodjkLQ9H8P07',
  consumer_secret: 'DkGxjBaM244SkICCBWAGVVTsjhTolMzAcOLhu0fTkXTIvufCmy',
  access_token_key: '1966990682-7gByXBDIJWc56XdJGsKl1b4x3qtXcSJh7hgSTwU',
  access_token_secret: '4D1CE0KvDLsgmxAi79ICFOizp9ghf8rdVD62lLnBCDI7L',
}); 


////// spotify keys //////////
var Spotify = require('node-spotify-api');
 
exports.spotifyKeys = new Spotify({
  id: '2fde161bf188437782eb8227883e2324',
  secret: '07e43665ab4f4239aaeffbb2e1a3d18f'
});


exports.commands = { 
	action:process.argv[2], 
	value:process.argv[3]
}