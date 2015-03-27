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
    store.set('pinNumber', pin);
});


dispatcher.on('pinNumber', function(pin){

    var route = '/panelData/'+pin;
        xhr(route).then(function(data){
            store.set('panelDepth', 1);
            store.set('panelData', data);
            store.set('numberOfPanels', data.length);
            dispatcher.emit("enterPanel", pin); 
        });
});

dispatcher.on("enterPanel", function(panelId){
    xhr("/panel/"+panelId, 'POST');
});

dispatcher.on("leavePanel", function(panelId){
    xhr("/panel/"+panelId, 'DELETE');
});

dispatcher.on('eventFacebook', function(panelId){
    // console.log('E-FB======>',panelId);
    var route = "/panel-users/"+panelId;

    xhr(route).then(function(data){

        // var listUsers = [];
        // data.users.forEach(function(user){
        //     console.log(user);
        //     listUsers.push(user.displayName);
        // });


        store.set('peopleInEvent', data.users);


        // console.log('the list ====>',listUsers);
    

        // // store.set('peopleInEvent', data);
        // console.log('======>',data);
        // console.log('======>',data.users[0].displayName);
    });
});

dispatcher.on('pictureUpload', function(data){
    console.log(data);
    var pin = data[0];
    var picture = data[1];

    var route = "/picture/"+pin;
    xhr(route, 'POST', picture);

});




if (window) {
    window._store = store;
    window.React = React;
    window.xhr = xhr;
    window.dispatcher = dispatcher;
}

window.location.search.replace(/pin=([a-z,A-Z,0-9]+)/, function(_, pin){
    dispatcher.emit("pinNumber", pin);
    window.history.replaceState({}, "", "/");
});

if(document){
    document.addEventListener('touchmove', function(e){}, true);
}
// Previous app...
app = React.render(React.createElement(miixerHome), document.body);




