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
                time: + new Date('2015.03.18.15:15')
            },

            {
                title: "Channel",
                className: "channels",
                image: "2" || {}, 
                time: + new Date('2015.03.18.15:15')

            },

            {
                title: "Channel",
                className: "channels",
                image: "3" || {},
                time: + new Date('2015.03.18.16:15') 

            },
                
            {
                title: "Starred",
                className: 'starred',
                image: "1" || {}, 
                time: + new Date('2015.03.18.16:15')
            },

            {
                title: "Channel",
                className: "channels",
                image: "2" || {}, 
                time: + new Date('2015.03.18.17:15')
            },

            {
                title: "Channel",
                className: "channels",
                image: "3" || {}, 
                time: + new Date('2015.03.18.17:15')

            },


            ];

// 

var noPinPanel = [{ image: 'no-pin', time: 0, button: 'GO Back'}]


app.get('/panelData/:pinNumber', function(req, res){

    var pinNumber = req.params.pinNumber;
    console.log('The pin ===>', pinNumber);

    res.send(panelData);
});


app.get('/panelData/', function(req, res){
    res.send(noPinPanel);
});



// aws = require("aws")

// aws.s3.createSignedURL()

// "https://s3.amazonaws.com/miixer/userpics/239741623874t129837456183724r.jpg"

// var dsn = "mongodb://localhost/test";

// if(process.env.MONGOLAB_URI){
//     dsn = process.env.MONGOLAB_URI)
// }

// mongoose.connection(dsn);

app.listen(process.env.PORT||8001);

















