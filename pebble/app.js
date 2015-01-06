var UI   = require('ui');
var ajax = require('ajax');

var IP   = "192.168.2.18";
var PORT = 3000;

var items = [{
  title: "Lights",
  subtitle: "Toggle Lights"
}];

var mainMenu = new UI.Menu({
  sections: [{title: "Room", items: items}]
});

mainMenu.on('select', function(event){
  ajax({
    url: "http://"+IP+":"+PORT+"/lights/toggle",
    type: "json"
  });
});

mainMenu.show();
