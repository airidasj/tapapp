var React = require('react'),
    dispatcher = require('./Dispatcher').getInstance(),
    store = require('./Store').getInstance(),
	miixerHome = require('./miixerHome'),
	xhr = require('./xhr');


var app;

dispatcher.on('*', function() {
    if (app) app.forceUpdate();
});

dispatcher.on('pinNumber', function(pin){
	console.log('The pin ==>', pin);
});


dispatcher.on('pinNumber', function(pin){

    var route = '/panelData/'+pin;
        xhr(route).then(function(data){
            store.set('panelData', data);
            store.set('numberOfPanels', data.length); 
        });

});



if (window) {
    window._store = store;
}

app = React.render(React.createElement(miixerHome), document.body);