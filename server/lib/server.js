module.exports = (function(){

  var express = require('express');
  var app     = express();

  return {

    get: function(url, callback){
      app.get(url, callback);
    },

    start: function(){
      app.listen(3001, "192.168.2.22");
    }

  }

}());
