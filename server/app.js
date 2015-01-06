/*
 * Room Automator
 * A simple API service for room automation via an arduino.
 *
 * Author: Jarred Kenny (jarredkenny@gmail.com)
 * Date  : January 6, 2015
 */

var arduino = require('./lib/arduino');
var server  = require('./lib/server');

server.get("/lights/toggle", function(){
  console.log(new Date().now+ " | Toggling Lights");
  arduino.lights.toggle();
});

server.get("/lights/off", function(){
  arduino.lights.off();
});

server.get("/lights/on", function(){
  arduino.lights.on();
});

arduino.onReady(function(){
  server.start();
});
