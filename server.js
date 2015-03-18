var express = require('express');
var app = express();


// General Comments:
// Note that in scss files, the panel width is 2000vw - meaning
// that only 20 panels can be used in a sequence...

app.use('', express.static(__dirname + '/www'));

var panelData = [{
                title: "Starred",
                className: 'starred',
                image: "1" || {}, 
                time: 
            },

            {
                title: "Channel",
                className: "channels",
                image: "2" || {}, 

            },

            {
                title: "Channel",
                className: "channels",
                image: "3" || {}, 

            },
                
            {
                title: "Starred",
                className: 'starred',
                image: "1" || {}, 
            },

            {
                title: "Channel",
                className: "channels",
                image: "2" || {}, 

            },

            {
                title: "Channel",
                className: "channels",
                image: "3" || {}, 

            },


            ];


var noPinPanel = [{ image: 'no-pin'}]


app.get('/panelData/:pinNumber', function(req, res){

    var pinNumber = req.params.pinNumber;
    console.log('The pin ===>', pinNumber);

    res.send(panelData);
});


app.get('/panelData/', function(req, res){
    res.send(noPinPanel);
});








app.listen(process.env.PORT||8001);

















