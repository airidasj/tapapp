var React = require('react/addons'),
    dispatcher = require('./Dispatcher').getInstance(),
    store = require('./Store').getInstance(),
    xhr = require('./xhr');


var playSound = function(){
	// var sound = new Audio('./sound/Blop.wav');
	// sound.play();
};

var CreateForm = React.createClass({

    render: function(){


        return <div>

                <div className="wrapperis"></div>

               </div>
    },

    componentDidMount: function(){

    	dispatcher.on('circleSocket', function(data){

	    	console.log('NEW CIRCLE!!!!!!', data);

	        // console.log("TAPSNOJAM!!!!");
	        // store.set('clicked', true);

	        var vraperis = document.getElementsByClassName("wrapperis");

	        // $(".wrapper").get("index", function(e){

	        // 	consle.log('in wrapper this is e ==>', e);
	        //   var box = this;

	          // var setX = data[0]+(data[0]*2);
	          // var setY = data[1]+(data[1]*1,5);

	          var setX = data[0]*2.5;
	          var setY = data[1]*2;

	          var fill = data[2];
	          var id = data[3];

	          // console.log(vraperis);

	          	// class="animated bounceIn"
				// $(vraperis).find("svg").remove();
	          $(vraperis).append('<svg id='+id+'><circle class="animated bounceOut" cx="'+setX+'" cy="'+setY+'" r="'+40+'" style=" width: 50px;  fill:'+fill+';   " ></circle></svg> ');

	          playSound();

	          // console.log('Sound ==>', sound);


	   //        	var audio = document.getElementsByTagName("audio")[0];
				// audio.play();

				// var audio = $(vraperis).find('svg[id='+id+'] audio');
				// audio.play();
				// console.log('audio ===>', audio);


	          var c = $(vraperis).find('svg[id='+id+'] circle');

	          // $(vraperis).find("svg").addClass('.square', function(){
	          // 	console.log("Tried changing SVG Class...");
	          // });

				setTimeout(function(){
					c.attr("class", "animated bounceOut");
				}, 400);


			// $(c).ready(function(){
			// 	console.log('this item...',c);
			// 	$(c).addClass("animated bounceIn");
			// });

	          // var o = $(c).find("circle");
	          // c.switchClass( removeClassName, addClassName [, duration ] [, easing ] [, complete ] )

	          // c.switchClass( "animated bounceIn", "animated bounceOut", 100, fadeIn, function(){console.log('Class SWich');}; );

	          // setTimeout( function(){ console.log('Tried something ====', c);
	          // 							c.removeClass('animated bounceIn').addClass('animated bounceOut', function(){

	          // 																	console.log('Class change.......');
	          // 																});

	          // 							// o.toggleClass("animated bounceIn");
	          // 							// o.toggleClass("bounceOut");
	          // 							console.log('Got to the end..');
	          // 						}, 300);

	          // var c = $(vraperis).find("circle");
	          // console.log($(vraperis).outerWidth());

				          // c.animate(
				          //   {
				          //     "r" : 50

				          //   },
				          //   {
				          //     easing: "easeOutQuad",
				          //     duration: 200,
				          //       step : function(val){
				          //               c.attr("r", val);

				          //           }
				          //   }
				          // );

				          //  c.animate(
				          //   {
				          //     "r" : 0
				          //   },
				          //   {
				          //     easing: "easeInQuad",
				          //     duration: 200,
				          //       step : function(val){
				          //               c.attr("r", val);

				          //           }
				          //   }
				          // );

	          	// setTimeout(function(){$(vraperis).find('svg[id='+id+']').remove(); console.log('Removed svg', id);}, 1000);
	        	});
			// });

    }

});


var vraperis = document.getElementsByClassName("wrapperis");
var clean = function(){
	console.log('cleaned...');
  	$(vraperis).find("svg").remove();
  };


module.exports = CreateForm;
