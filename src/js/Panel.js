var React = require('react'),
    store = require('./Store').getInstance(),
    CountdownTimer = require('./countdown_timer'),
    dispatcher = require('./Dispatcher').getInstance();

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
        var eventFooter;
        if(button){
          buttonComponent = <button className="eventButton" onClick={this.props.resetPanels}>{button}</button>;
        } else {
          buttonComponent = <button onClick={this.props.resetPanels} className="headerBack"></button>;

          eventFooter = 
                <div className="eventFooter">
                  {/* <button className="eventPictures" onClick={this.footerButton.bind(this, 'eventPictures')}></button> */}
                  <button className="eventFacebook" onClick={this.footerButton.bind(this, 'eventFacebook')}></button>
                  <span className="uploadPicture"><input ref="picture" onChange={this.uploadPicture} className="uploadPic" type="file"></input></span>
                </div>;
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

                  {eventFooter}

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

    footerButton: function(name){
      console.log(name);
      store.set('slideUpPanel', name);
      dispatcher.emit('eventFacebook', store.get('pinNumber'));
    },
    
    uploadPicture: function(){
      var picture = this.refs.picture.getDOMNode().value;
      var pin = store.get('pinNumber');
      var Data = [pin, picture];

      console.log("In sequence: ",pin,"Uploading ==> ",picture);
      dispatcher.emit('pictureUpload', Data);
    },
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