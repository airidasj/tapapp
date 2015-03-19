var express = require('express');
var app = express();


// General Comments:
// Note that in scss files, the panel width is 2000vw - meaning
// that only 20 panels can be used in a sequence...

app.use('', express.static(__dirname + '/www'));

var panelData = [
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
                time: + new Date('2015.03.20.15:15'),
                icon: "",
                background: "",
                text1: "Have a JOINT",
                text2: "you lucky bastard...",
            },

            ];

// 

var noPinPanel = [{  
                image: "1" || {}, 
                time: 0,
                icon: "016_System",
                background: "#f4853a",
                text2: "Oops! We didn't find this pin",
                // text2: "you motherfucker...",
                button: "GO Back",
            },]


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

















