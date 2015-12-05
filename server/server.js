/**
 * Room Automation Server
 * A simple API server which uses an Arduino to
 * various bedroom automation functions.
 */

// Imports
var five       = require('johnny-five');
var express    = require('express');
var bodyParser = require('body-parser');
var Pins       = require('./config/pins');

// Set up Arduino
var board = new five.Board({repl: false});

// Set up API server
var app   = express();
var port  = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Start server on baord ready event.
board.on("ready", function(){

  // Set up relays
  var RELAYS = {};
  for(var relay in Pins){
    if(Pins.hasOwnProperty(relay)){
      RELAYS[relay] = five.Pin(Pins[relay], 0);
    }
  }

  // Handle Lights Requests
  app.use('/lights/:relay/:state', function(req, res){

    var state = req.params.state;
    var relay = req.params.relay;

    // Ensure relay exists, else throw error.
    if(Pins[relay] === undefined){
      res.send("Relay not found: " + relay);
      return;
    }

    // Ensure state is valid, else throw error.
    if(
      state === undefined ||
      ['on', 'off', 'toggle'].indexOf(state) === -1
    ){
      res.send("Invalid state. State must be either 'on' or 'off'.");
      return;
    }

    if(state === "on"){
      RELAYS[relay].high();
    }else if(state === "off"){
      RELAYS[relay].low();
    }else if(state === "toggle"){
      RELAYS[relay].query(function(state){
        if(state.value){
          RELAYS[relay].low();
        }else{
          RELAYS[relay].high();
        }
      });
    }

    res.send();

  });

  // Turn all relays on by default.
  for(var i = o; i < RELAYS.length; i++){
    RELAYS[i].high();
  }

  app.listen(port, function(){
    console.log("Server running on port: ", port);
  });
});
