var React = require('react/addons'),
    swipePanels = require('./swipePanelsMixin'),
    cx = React.addons.classSet,
    Panel = require('./Panel'),
    dispatcher = require('./Dispatcher').getInstance(),
    store = require('./Store').getInstance();

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var translate3dString = function(x){
    x = x || 0;
    return 'translate3d('+x+'vw, 0, 0)';
};

var miixerHome = React.createClass({

    mixins: [swipePanels],
    render: function(){

        var moving = this.state.moving,
            activePanel = this.state.activePanel,
            //menuOpen = this.state.menuOpen,
            panelDepth = store.get('panelDepth') || 0,
            
            // Sending data from
            panelData = store.get('panelData'),

            wrapperClassName = cx({
                "panels-wrapper": true,
                "detail": true,
                "moving": this.state.moving
            }),

           
    
       
            pos = this.state.activePanel || 0,
            mainPanelStyle = {},
            detailPanelsStyle = {},
            subDetailPanelStyle = {},
            homePanelStyle = {},
            mainPanelOffsetValue = pos * 100 * -1;

            if (panelData){
                var panels = panelData.map(function(panel, i){
                    //panel.menu.menuOpen = activePanel === i && menuOpen;
                    //panel.content.onItemClick = this.onItemClick;
                    panel.number = i;
                    panel.resetPanels = this.resetPanels;

                    return <Panel key={i} {...panel} />;
                }, this);
            }
            // console.log(panelData.length + "00vw");

        switch(panelDepth){
            case 0:
                //All good nowt to say...
                mainPanelStyle.transform = translate3dString(0)
                detailPanelsStyle.transform = translate3dString(0);
                homePanelStyle.transform = translate3dString(0);

                mainPanelStyle.webkitTransform = translate3dString(0)
                detailPanelsStyle.webkitTransform = translate3dString(0);
                homePanelStyle.webkitTransform = translate3dString(0);
            break;
            case 1:
                //We are viewing a sliding panels
                // mainPanelStyle.transform = translate3dString(mainPanelOffsetValue);

                detailPanelsStyle.transform = translate3dString(-100);
                homePanelStyle.transform = translate3dString(mainPanelOffsetValue-100);

                homePanelStyle.webkitTransform = translate3dString(mainPanelOffsetValue-100);
                detailPanelsStyle.webkitTransform = translate3dString(-100);
                // console.log('Case one...');
                // console.log('DEtail pnel style...',detailPanelsStyle);
            break;
            case 2:
                //We are viewing a about/profile
                mainPanelStyle.transform = translate3dString(mainPanelOffsetValue-100);
                detailPanelsStyle.transform = translate3dString(-100);
                subDetailPanelStyle.transform = translate3dString(-100);
            break;
        }

        // Defining the witdth depending on the number of panels...
        // mainPanelStyle.width = store.get('numberOfPanels')+ "00vw";

        var FBusers = store.get('peopleInEvent') || [];

        // console.log('FB users ===>',FBusers);
        var Users = FBusers.map(function(user, i){
            return <FacebookNames key={i} FBuser={user} />;
        }, this);

            var slideUpPanel = null;
            if(store.get("slideUpPanel")){
                var text = store.get("slideUpPanel");
                slideUpPanel = 
                <div key={"slideUp"+text} className="slideUpPanel">
                    <header className="headerMenu"><button onClick={store.set.bind(store, 'slideUpPanel', false)} className="headerBack"></button><h2>{"People in the MIX"}</h2></header>
                    <div className="FB-users">
                        {Users}
                    </div>
                </div>
            }


        return <div>
               	{ /* Top Level Panels */}
                <div className="panels-wrapper home" style={homePanelStyle}>
                  
                    {/* The home area */}
                    <div className='mixer-header'><span className="logo"></span></div>
                    <div className='mixer-video'></div>
                    <div className='mixer-login'>
                      <span className="event">{'Enter the keyword, to start Mixin!'}</span>
                        <div className='form'>
                          <textarea ref="input" className="input" placeholder="Type your sequence password..." />
            
                            <button className="facebook-miixer" onClick={this.onSend}></button>
                      </div>
                    </div>
                    <div className='mixer-apply'><a href="http://miixer.im/">Apply to join...</a></div>

                </div>

                { /* Detail Panels */}
                <div className={wrapperClassName} style={detailPanelsStyle}>
                    <div ref="topLevelPanels" id="home-panels" className="panels" style={mainPanelStyle}>
	                    {panels}
	                 </div>

                  
                </div>
                <ReactCSSTransitionGroup transitionName="slideUp">
                    {slideUpPanel}
                </ReactCSSTransitionGroup>
               </div>
    },
    onItemClick: function(item){
        console.log(item);
        //store.set('panelDepth', 1);
    },
    getInitialState: function(){
    	store.set('panelDepth', 0);
        return {
            activePanel: 0,
            moving: false,
            menuOpen: false
        }
    },

    resetPanels: function() {
        this.setState(this.getInitialState());
    },
    
    toggleDetail: function(){
        if(this.state.moving) return;
        store.set('panelDepth', +(!store.get('panelDepth')));
    },
    toggleSubDetail: function(){
       var depth = store.get('panelDepth');
       depth = depth == 2 ? 1 : 2;
       store.set('panelDepth', depth);
    },

    onSend: function(){
        if(this.refs.input.getDOMNode().value){
            window.location = "/login/"+this.refs.input.getDOMNode().value;
        } else {
            dispatcher.emit('pinNumber', "");
        }
    }
});

var FacebookNames = React.createClass({ 

    render: function(){

        var FB = this.props.FBuser;
        // console.log('The FB ===> ',FB);

       return <div>

       <a href={FB.profileUrl}><li>
           <span className="FB-pic"><img className="FB-pic" src={"http://graph.facebook.com/"+FB.id+"/picture?type=normal"}></img></span>
           <h3>{FB.displayName}</h3>
       </li></a>

       </div>;
    }

});



module.exports = miixerHome;