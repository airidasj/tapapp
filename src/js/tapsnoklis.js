var React = require('react/addons'),
    dispatcher = require('./Dispatcher').getInstance(),
    store = require('./Store').getInstance();

/////////////////////////////////////
// GLOBAL FUNCTIONS //
///////////////////////////

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
};

function getIntegerNumber(min, max){
  return Math.round(getRandomArbitrary(min, max));
};



var tapsnoklis = React.createClass({ 
    
    componentDidMount: function() {
    var el = $(this.getDOMNode('wrapper'));
    // var langas = React.findDOMNode('wrapper');
    // set el height and width etc.

    // console.log('componentDidMount !!!!');
    // console.log('El ==>', el);
    // console.log('Langas ==>', langas);

    $(el).on('touchstart',function(e){
            // console.log('Selected...');
            // var x = e.pageX;
            // var y = e.pageY;

            var x = e.originalEvent.touches[0].pageX;
            var y = e.originalEvent.touches[0].pageY; 
            


            var clickY = y - $(this).offset().top;
            var clickX = x - $(this).offset().left;
          var box = this;
           
          var setX = parseInt(clickX);
          var setY = parseInt(clickY);

          // var fill = ["red","green","yellow","purple","blue","magenta","white"];
          // var number = getIntegerNumber(1,6);
          var fill = ["purple","magenta","green", "red", "white", "orange", "blue","purple"];
          var number = getIntegerNumber(1,7);
          // console.log('the number ==>',number);
          // console.log(fill[number]);
          var cfill = fill[number];
          // console.log('cfill ===', cfill);


          var circleData = [ setX, setY, cfill, number ];
          // console.log(circleData);         
          dispatcher.emit('circleData', circleData);


          // $(this).find("svg").remove();
          $(this).append('<svg id='+number+'><circle  class="animated bounceOut" cx="'+setX+'" cy="'+setY+'" r="'+30+'" style="   fill:'+fill[number]+';   " ></circle></svg>  ');
          

          setTimeout(function(){
            $(box).find('svg[id='+number+']').remove();
          }, 300);

          

          var c = $(box).find("circle");

          // setTimeout(function(){
          //   c.attr("class", "animated fadeOut");
          // }, 400);


          // console.log($(box).outerWidth());
          // c.animate(
          //   {
          //     "r" : 50
              
          //   },
          //   {
          //     easing: "easeOutQuad",
          //     duration: 400,
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
          //     duration: 400,
          //       step : function(val){
          //               c.attr("r", val);

          //           }
          //   } 
          
          // ); 
        });  

    },


    render: function(){
  


        return <div>
              
                <div className="wrapper" ></div>
              
               </div>
    },


    onItemLoad: function(){
      console.log('Item loaded...');

        $(".wrapper").on('click touch',function(e){
            console.log('Selected...');
            var x = e.pageX;
            var y = e.pageY;
            var clickY = y - $(this).offset().top;
            var clickX = x - $(this).offset().left;
          var box = this;
           
          var setX = parseInt(clickX);
          var setY = parseInt(clickY);

          var fill = ["red","green","yellow","purple","blue","grey","white"];
          var number = getIntegerNumber(1,6);
          // console.log('the number ==>',number);
          // console.log(fill[number]);
          var cfill = fill[number];
          // console.log('cfill ===', cfill);

          $(this).find("svg").remove();
          $(this).append('<svg><circle cx="'+setX+'" cy="'+setY+'" r="'+0+'" style="   fill:'+fill[number]+';   " ></circle></svg>');
          

          var circleData = [ setX, setY, cfill ];
          console.log(circleData);         
          dispatcher.emit('circleData', circleData);

          var c = $(box).find("circle");
          console.log($(box).outerWidth());
          c.animate(
            {
              "r" : 50
              
            },
            {
              easing: "easeOutQuad",
              duration: 400,
                step : function(val){
                        c.attr("r", val);

                    }
            }
          );

           c.animate(
            {
              "r" : 0
            },
            {
              easing: "easeInQuad",
              duration: 400,
                step : function(val){
                        c.attr("r", val);

                    }
            } 
          
          ); 
        });  

    },


    onItemClick: function(item){
        console.log("TAPSNOJAM!!!!");
        // store.set('clicked', true);
        console.log('the item ==> ', item);
        console.log('the item ==> ', item.pageX);


        // onClick={this.onItemClick.bind(null, this)} 

        

        // $(".wrapper").on('touch', function(e){
           $(".wrapper").on('click touch',function(e){
            console.log('Selected...');
            var x = e.pageX;
            var y = e.pageY;
            var clickY = y - $(this).offset().top;
            var clickX = x - $(this).offset().left;
          var box = this;
           
          var setX = parseInt(clickX);
          var setY = parseInt(clickY);

          var fill = ["red","green","yellow","purple","blue","grey","white"];
          var number = getIntegerNumber(1,6);
          // console.log('the number ==>',number);
          // console.log(fill[number]);
          var cfill = fill[number];
          // console.log('cfill ===', cfill);

          $(this).find("svg").remove();
          $(this).append('<svg><circle cx="'+setX+'" cy="'+setY+'" r="'+0+'" style="   fill:'+fill[number]+';   " ></circle></svg>');
          

          var circleData = [ setX, setY, cfill ];
          console.log(circleData);         
          dispatcher.emit('circleData', circleData);

          var c = $(box).find("circle");
          console.log($(box).outerWidth());
          c.animate(
            {
              "r" : 50
              
            },
            {
              easing: "easeOutQuad",
              duration: 400,
                step : function(val){
                        c.attr("r", val);

                    }
            }
          );

           c.animate(
            {
              "r" : 0
            },
            {
              easing: "easeInQuad",
              duration: 400,
                step : function(val){
                        c.attr("r", val);

                    }
            } 
          ); 
         
          
          
        });
        
    },
    
});



// var FacebookNames = React.createClass({ 

//     render: function(){

//         var FB = this.props.FBuser;
//         // console.log('The FB ===> ',FB);

//        return <div>

//        <a href={FB.profileUrl}><li>
//            <span className="FB-pic"><img className="FB-pic" src={"http://graph.facebook.com/"+FB.id+"/picture?type=normal"}></img></span>
//            <h3>{FB.displayName}</h3>
//        </li></a>

//        </div>;
//     }

// });



module.exports = tapsnoklis;







