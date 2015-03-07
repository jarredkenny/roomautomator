module.exports = (function(){

  var five   = require('johnny-five');
  var board  = new five.Board({repl: false});

  var _lights = {
    on: false,
    relay: false
  };

  return {

    onReady: function(callback){
      board.on("ready", function(){
        _lights.relay = new five.Pin(4, "analog");
      });
      callback();
    },

    lights: {

      isOn: function(){
        return (lights.on);
      },

      on: function(){
        _lights.on = true;
        _lights.relay.high();
      },

      off: function(){
        _lights.on = false;
        _lights.relay.low();
      },

      toggle: function(){
        if(_lights.on) this.off();
        else this.on();
      }
    }

  };

}());
