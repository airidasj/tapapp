var React = require('react'),
    dispatcher = require('./Dispatcher').getInstance(),
    store = require('./Store').getInstance(),
	// miixerHome = require('./miixerHome'),
	xhr = require('./xhr');
    tapsnoklis = require('./tapsnoklis');
    io = require('socket.io-client');
    indexForm = require('./index-form');


var server = io.connect(window.location.origin);
var app;

dispatcher.on('*', function() {
    if (app) app.forceUpdate();
});

dispatcher.on('click', function(pin){
	console.log('Screen was clicked in index.js');
    // store.set('pinNumber', pin);
});

dispatcher.on('circleData', function(data){

    console.log('IN INDEX --> ', data);
    server.emit('circleInfo', data);

});




if (window) {
    window._store = store;
    window.React = React;
    window.xhr = xhr;
    window.dispatcher = dispatcher;
}


if(document){
    document.addEventListener('touchmove', function(e){}, true);
}
// Previous app...
app = React.render(React.createElement(tapsnoklis), document.body);




