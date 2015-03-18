var React = require('react'),
    store = require('./Store').getInstance(),
    CountdownTimer = require('./countdown_timer');

var Panel = React.createClass({

    render: function(){
        var button = this.props.button;
        var position = {};
        position.left = this.props.number+"00vw";

        var eventStyle = {};
        eventStyle.background = this.props.background;
        var lockedStyle = {};
        lockedStyle.background = "#C2C2C2";

        var timeLeft = this.props.time - new Date();

        var buttonComponent;
        if(button){
          buttonComponent = <button className="eventButton" onClick={this.onClick}>{button}</button>;
        } else {
          buttonComponent = <button onClick={this.onClick} className="headerBack"></button>;
        }

        // console.log('Time left....', timeLeft);
        if(timeLeft < 0){

            return <section className={"panel"} style={position}>
                <div className="eventImage" style={eventStyle}>

                <header className="headerMenu">{buttonComponent}</header>

                <EventIcon image={this.props.icon}/>


                  <h1>{this.props.text1}</h1>
                  <h2>{this.props.text2}</h2>

                </div>
                  {buttonComponent}
              </section>;

        } else {

            return <section className={"panel"} style={position}>
                  
                  <div className="eventImage" style={lockedStyle}>

                  <header className="headerMenu">{buttonComponent}</header>
                  <CountdownTimer initialTimeRemaining={timeLeft} />

                  <EventIcon image={"042_Key"}/>
                  <h1>{"Locked Event"}</h1>

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

var EventIcon = React.createClass({
  render: function() {
    return (
      <img src={'../img/icons/'+ this.props.image +'.png'} className="eventIcon"/>
    );
  }
});



module.exports = Panel;