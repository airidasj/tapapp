var React = require('react'),
    dispatcher = require('./Dispatcher').getInstance(),
    store = require('./Store').getInstance(),
	xhr = require('./xhr'),
	CreateForm = require('./CreateForm'),
	io = require('socket.io-client');

var server = io.connect(window.location.origin);

var app;

// dispatcher.on('*', function() {
//     if (app) app.forceUpdate();
// });

// ================================  //
// Creating new panels
// ================================  //


server.on('newCircle', function(data){
    console.log('new circle!');
    console.log('socket circle in index.js. ===> ', data);
    dispatcher.emit('circleSocket', data);

});



if (window) {
    window._store = store;
    window.React = React;
    window.xhr = xhr;
    window.dispatcher = dispatcher;
}


// Previous app...
app = React.render(React.createElement(CreateForm), document.body);

