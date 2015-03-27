var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer'); 
var fs = require('fs');

var app = express();
var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

// --- Image processing
var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'hooxxkj2f', 
  api_key: '616288365828359', 
  api_secret: 'd1JzuM4JWcKAS6xvk7dGDlvU-2A' 
});


//--- Datbase:
var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/miixer');

mongoose.connect("mongodb://miixer:Miixer123@ds035027.mongolab.com:35027/heroku_app35009083");



// aws = require("aws")

// aws.s3.createSignedURL()

// "https://s3.amazonaws.com/miixer/userpics/239741623874t129837456183724r.jpg"

// var dsn = "mongodb://localhost/test";

// if(process.env.MONGOLAB_URI){
//     dsn = process.env.MONGOLAB_URI)
// }

// mongoose.connection(dsn);


// --- DB Connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Connected to DB! yay!');
});

var User = require('./lib/user-model'),
    Panels = require('./lib/panel-model');


app.use(cookieParser());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data


// ================================= //
// Working with Facebook integration //
// ================================= //

var USERS = {};
passport.use(new FacebookStrategy({
    clientID: "927061310658845",
    clientSecret: "60dd3ae06bca44adfc4046b2b8132981",
    // callbackURL: "http://localhost:8001/auth/facebook/callback"
    callbackURL: "http://app.miixer.im/auth/facebook/callback"
  },


// var USERS = {};

// passport.use(new FacebookStrategy({
//     clientID: "929135713784738",
//     clientSecret: "2836e56f77502f65dc838796294133a6",
//     callbackURL: "http://localhost:8001/auth/facebook/callback"
//   },



  function(accessToken, refreshToken, profile, done) {
    USERS[profile.id] = profile;
    done(null, USERS[profile.id]);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  var user = USERS[id];
  if(!user){
    return done(new Error("No such user!"));
  }
  done(null, user);
});
  
  // Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/login/success',
                                      failureRedirect: '/' }));


// General Comments:
// Note that in scss files, the panel width is 2000vw - meaning
// that only 20 panels can be used in a sequence...

app.use('/', express.static(__dirname + '/www'));
app.use('/createForm/', express.static(__dirname + '/www-form'));

// =====================================  //
// Creating a new panel                   //
// =====================================  //

app.post("/newPanel/", function(req, res){
    var panelData = req.body[1];
    var panelPin = req.body[0];
    // console.log('Panel data in server =====>', panelData );
    // console.log('Panel PIN in server =====>', panelPin );

    Panels.find({'pin' : panelPin}, function(err, panel){
        if(!err && panel[0]){
            // do nothing, just checking...
            console.log('Panel found...');

        } else if(err){
            console.log('Error creating new panel...',err);

        } else if(!panel[0]){
            console.log('Panel NOT FOUND, creating new...');
            var nPanel = new Panels({ 'pin' : panelPin, 'panelData' : panelData});
            nPanel.save(function(err, data){
                if(!err){
                    console.log('Panel saved', data);
                }
            });
        }
    });
});

// fs.readdirSync('./www-form/img/icons/', function(names){
//     console.log(names);
// });

app.get('/iconNames/', function(req, res){
    var list = fs.readdirSync('./www-form/img/icons');
    list.shift();
    // console.log(list);
    var nList = [];
    list.forEach(function(item){
        nList.push(item.slice(0, -4));
    });
    res.send(nList);
});

var noPinPanel = [{  
                image: "1" || {}, 
                time: 0,
                icon: "016_System",
                background: "#f4853a",
                text1: "Oops! We didn't find this keyword...",
                text2: "Please try again...",
                button: "GO Back",
            },];

function auth(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.send(403);
    }
}

app.get('/checkPin/:pin', function(req, res){

    var pin = req.params.pin;

    Panels.findOne({'pin' : pin}, function(err, panel){
        if(err){
            console.log(err);
        } else if (!panel){
            // console.log('No panel with this PIN NUMBER ----', panel);
            res.send(false);
        } else if (panel){
            // console.log('Sent the panel', panel);
            res.send(true);
        }
    });
});


app.get('/panelData/:pinNumber', auth,  function(req, res){
    var pinNumber = req.params.pinNumber;
    console.log('The pin ===>', pinNumber, 'and type', typeof(pinNumber));
    // console.log(req.user);
    // res.send(panelData);

    Panels.findOne({'pin' : pinNumber}, function(err, panel){
        if(err){
            console.log(err);
        } else if (!panel){
            // console.log('No panel with this PIN NUMBER ----', panel);
            res.send(noPinPanel);
        } else if (panel){
            // console.log('Sent the panel', panel);
            res.send(panel.panelData);
        }
    });

});


app.get('/panelData/', function(req, res){
    res.send(noPinPanel);
});

app.get('/login/success', function(req, res){
    res.redirect("/?pin="+req.session.pin);    
});

app.get('/login/:pin', function(req, res){
    req.session.pin = req.params.pin;
    res.redirect("/auth/facebook");
});



app.post("/panel/:panelId", auth, function(req,res){
    var panelId = req.params.panelId;
    if(!(panelId in userCache)){
        userCache[panelId] = {};
    }
    userCache[panelId][req.user.id] = +new Date();
    res.send(204);
});

app.delete("/panel/:panelId", auth, function(req, res){
    var panelId = req.params.panelId;
    if(panelId in userCache){
        delete userCache[panelId][req.user.id];
    }
    res.send(204);
});

app.get("/panel-users/:panelId", auth, function(req,res){
    var panelId = req.params.panelId;
    if(!(panelId in userCache)){
        return res.send({users: []});
    }
    return res.send({users: Object.keys(userCache[panelId]).map(function(id){ 
        return USERS[id];
    }) });
});

app.post("/picture/:pin", function(req, res){
    var pin = req.params.pin;
    // var image = req.files;

    // console.log('The image ==>', image);
    console.log('Trying to upload...');

    res.send(204);
    // cloudinary.uploader.upload("http://www.example.com/image.jpg", function(result) { 
    //   console.log(result) 
    // });
});


var userCache = {};


app.listen(process.env.PORT||8001);

















