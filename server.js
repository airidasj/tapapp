var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var app = express();
var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;


  app.use(cookieParser());
  app.use(session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());

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

var panelData = [
            {  
                id: 12342314,
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
                time: + new Date('2015.03.18.15:15'),
                icon: "053_Institution",
                background: "#d70335",
                text1: "Castle event?",
                text2: "you lucky bastard...",
            },
            {  
                time: + new Date('2015.03.18.15:15'),
                icon: "053_Institution",
                background: "#d70335",
                text1: "Castle event?",
                text2: "you lucky bastard...",
            },

            {  
                time: + new Date('2015.03.22.15:15'),
                icon: "",
                background: "",
                text1: "Have a JOINT",
                text2: "you lucky bastard...",
            },
            {  
                time: + new Date('2015.03.18.15:15'),
                icon: "053_Institution",
                background: "#d70335",
                text1: "Castle event?",
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

function auth(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.send(403);
    }
}


app.get('/panelData/:pinNumber', auth, function(req, res){
    var pinNumber = req.params.pinNumber;
    console.log('The pin ===>', pinNumber);
    console.log(req.user);
    res.send(panelData);
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

var userCache = {};

// aws = require("aws")

// aws.s3.createSignedURL()

// "https://s3.amazonaws.com/miixer/userpics/239741623874t129837456183724r.jpg"

// var dsn = "mongodb://localhost/test";

// if(process.env.MONGOLAB_URI){
//     dsn = process.env.MONGOLAB_URI)
// }

// mongoose.connection(dsn);

app.listen(process.env.PORT||8001);

















