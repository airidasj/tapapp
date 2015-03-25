var React = require('react'),
    dispatcher = require('./Dispatcher').getInstance(),
    store = require('./Store').getInstance(),
	CreateForm = require('./CreateForm'),
	xhr = require('./xhr');

var app;


dispatcher.on('*', function() {
    if (app) app.forceUpdate();
});

// ================================  //
// Creating new panels
// ================================  //

dispatcher.on('newPanel', function(data){

    var panelData = [["123"], [
            {  
                time: + new Date('2015.03.18.15:15'),
                icon: "059_Smilesend",
                background: "#04be2c",
                text1: "Best APP EVER",
                text2: "damn lucky bastards...",
            },
            {  
                time: + new Date('2015.03.18.15:15'),
                icon: "053_Institution",
                background: "#d70335",
                text1: "Castle event?",
                text2: "you lucky bastard...",
            },
            {  
                time: + new Date('2015.03.25.15:15'),
                icon: "",
                background: "",
                text1: "Have a JOINT",
                text2: "you lucky bastard...",
            },]
            ];

    xhr('/newPanel/', 'POST', panelData).then(function(data){
        console.log('Data sent to backend ==>', data);
    });

});

xhr('/iconNames/').then(function(data){
	store.set('iconNames', data);
});



if (window) {
    window._store = store;
    window.React = React;
    window.xhr = xhr;
    window.dispatcher = dispatcher;
}


// Previous app...
app = React.render(React.createElement(CreateForm), document.body);

