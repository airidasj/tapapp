var React = require('react'),
    store = require('./Store').getInstance(),
    CountdownTimer = require('./countdown_timer');

var Panel = React.createClass({

    render: function(){
        var button = this.props.button;
        var position = {};
        position.left = this.props.number+"00vw";

        var timeLeft = this.props.time - new Date();

        var buttonComponent;
        if(button){
          buttonComponent = <button className="eventButton" onClick={this.onClick}>{button}</button>;
        }

        // console.log('Time left....', timeLeft);
        if(timeLeft < 0){

            return <section className={"panel"} style={position}>
                <div className="eventImage">
                <EventImage image={this.props.image}/>
                </div>
                  {buttonComponent}
              </section>;

        } else {

            return <section className={"panel"} style={position}>
               
                  <div className="eventImage">
                  <CountdownTimer initialTimeRemaining={timeLeft} />

                  <EventImage image={"locked-event"}/>

                  </div>
                

              </section>;
        }
    },

    onClick: function(){
      store.set('panelDepth', 0)
    }
});


var EventImage = React.createClass({
  render: function() {
    return (
      <img src={'../img/'+ this.props.image +'.png'} className="eventImage"/>
    );
  }
});



module.exports = Panel;