var React = require('react'),
    CountdownTimer = require('./countdown_timer');

var Panel = React.createClass({

    render: function(){

        var position = {};
        position.left = this.props.number+"00vw";

        return <section className={"panel"} style={position}>
           
              <div className="eventImage">
              <CountdownTimer initialTimeRemaining={30000} />

              <EventImage image={this.props.image}/>

              </div>
              

            </section>;
    },


});


var EventImage = React.createClass({
  render: function() {
    return (
      <img src={'../img/'+ this.props.image +'.png'} className="eventImage"/>
    );
  }
});


module.exports = Panel;