require("dotenv").config()
var Spotify = require("node-spotify-api")
var axios = require("axios")
var fs = require("fs")
var moment = require("moment")
var keys = require('./keys.js')
var spotify = new Spotify(keys.spotify)

var findArtist = function (artist) {
    axios.get('https://rest.bandsintown.com/artists/' + artist + '/events?app_id=simon')
        .then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                console.log(response.data[i].venue.name);

                console.log(response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country);
                console.log(moment(response.data[i].datetime).format("MM/DD/YYYY"));

                console.log("----------")

            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

var getSongInfo = function (song){
    spotify.search({ type: 'track', query: song}, function(error, data){
      if(!error){
        for(var i = 0; i < data.tracks.items.length; i++){
          var songData = data.tracks.items[i];
          //artist
          console.log("Artist: " + songData.artists[0].name);
          //song name
          console.log("Song: " + songData.name);
          //spotify preview link
          console.log("Preview URL: " + songData.preview_url);
          //album name
          console.log("Album: " + songData.album.name);
          console.log("-----------------------");
          
          //adds text to log.txt
          fs.appendFile('log.txt', songData.artists[0].name);
          fs.appendFile('log.txt', songData.name);
          fs.appendFile('log.txt', songData.preview_url);
          fs.appendFile('log.txt', songData.album.name);
          fs.appendFile('log.txt', "-----------------------");
        }
      } else{
        console.log('Error occurred.');
      }
    });
  }

 var getMovie = function omdbData(movie){
    var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true';
  
    request(omdbURL, function (error, response, body){
      if(!error && response.statusCode == 200){
        var body = JSON.parse(body);
  
        console.log("Title: " + body.Title);
        console.log("Release Year: " + body.Year);
        console.log("IMdB Rating: " + body.imdbRating);
        console.log("Country: " + body.Country);
        console.log("Language: " + body.Language);
        console.log("Plot: " + body.Plot);
        console.log("Actors: " + body.Actors);
        console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
        console.log("Rotten Tomatoes URL: " + body.tomatoURL);
  
        //adds text to log.txt
        fs.appendFile('log.txt', "Title: " + body.Title);
        fs.appendFile('log.txt', "Release Year: " + body.Year);
        fs.appendFile('log.txt', "IMdB Rating: " + body.imdbRating);
        fs.appendFile('log.txt', "Country: " + body.Country);
        fs.appendFile('log.txt', "Language: " + body.Language);
        fs.appendFile('log.txt', "Plot: " + body.Plot);
        fs.appendFile('log.txt', "Actors: " + body.Actors);
        fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + body.tomatoRating);
        fs.appendFile('log.txt', "Rotten Tomatoes URL: " + body.tomatoURL);
  
      } else{
        console.log('Error occurred.')
      }
      if(movie === "Mr. Nobody"){
        console.log("-----------------------");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
  
        //adds text to log.txt
        fs.appendFile('log.txt', "-----------------------");
        fs.appendFile('log.txt', "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        fs.appendFile('log.txt', "It's on Netflix!");
      }
    });
  
  }

  function doThing(){
    fs.readFile('random.txt', "utf8", function(error, data){
      var txt = data.split(',');
  
      getSongInfo(txt[1]);
    });
  }

var pick = function (caseChoice, userChoice) {
    switch (caseChoice) {
        case "concert-this":
            findArtist(userChoice);
            break;
        case "spotify-this-song":
            getSongInfo(userChoice);
            break;
        case "movie-this":
            getMovie(userChoice);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log("liri do not recognize command")
    }
}
var runThis = function(arg1, arg2){
    pick(arg1, arg2)
}
runThis(process.argv[2], process.argv.slice(3).join(" "));