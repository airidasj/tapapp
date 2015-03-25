var React = require('react/addons'),
    dispatcher = require('./Dispatcher').getInstance(),
    store = require('./Store').getInstance(),
    Panel = require('./Panel');

var CreateForm = React.createClass({

	getInitialState: function(){
		return {
			formCount: 1
		};
	},

	render: function(){

		var forms = [
			<FormFields key="form0" number={1} />
		];

		if(this.state.formCount > 1){
			var remaining = this.state.formCount - 1;
			while(remaining--){
				forms.push(<FormFields key={"form"+forms.length} number={forms.length+1} />);
			}
		}

		if(store.get('removeForm') === true){
			this.state.formCount -= 1;
			store.set('removeForm', false);
		}

		return <div>
			<header></header>
			<div className="content">
				<h1>{"Fill in the fields and generate your own MIXER sequence!"}</h1>
				{forms}
				<button className="btn" onClick={this.addForm}>{'Add an one more Event!'}</button>
				<div className="miixer-submit">
					<h1>{'Submit the Form:'}</h1>

					<div className="col-lg-12">
						<div className="input input-group input-group-lg">
						  <span className="input-group-addon" id="sizing-addon1"> <span className="glyphicon glyphicon-star" aria-hidden="true"></span> </span>
						  <input type={"text"} className="form-control"  placeholder={"The Keyword"} aria-describedby="sizing-addon1" />
						</div>

						<button className="btn" >{'SUBMIT'}</button>

					</div>



				</div>
			</div>
		</div>;
	},

	addForm: function(){
		this.setState({
			formCount: this.state.formCount+1
		});
	},


});

var FormFields = React.createClass({

	getInitialState: function(){
		return {
			icon: "016_System",
			line1: "Create your",
			line2: "MIIXER Event",
			background: "#F4853A",
			time: ""
		};
	},


	setProp: function(name){
		 var self = this;
		return function(evt){
			var obj = {};
			obj[name] = evt.target.value;
			self.setState(obj);
		}
	},
	removeForm: function(number){
		// console.log(this.props.parent);
		store.set('removeForm', true);
	},


	render: function(){

		if(this.props.number <= 1){
			var buttonRemove = '';
		} else {
			var buttonRemove = <button onClick={this.removeForm.bind(null, this.props.number)} className="form-remove"></button>;
		}

		var iconList = store.get('iconNames') || [];
		var icons = iconList.map(function(icona, i){
			return <IconOptions key={i} icon={icona} />
		});

		return <div className="form">

			<div className="fields">
			{buttonRemove}
			<h1>{"Event number "+this.props.number+"!"}</h1>	

				<div className="col-lg-12">
					<div className="input-group input-group-lg">
					  <span className="input-group-addon" id="sizing-addon3"> {'Icon'} </span>

						<select className="form-control" value={this.state.icon} onChange={this.setProp("icon")} id="sel1">
						    {icons}
						</select>

					  {/* <input type={"dropdown"} className="form-control" value={this.state.icon} onChange={this.setProp("icon")} placeholder={"Icon"} aria-describedby="sizing-addon3" /> */}

					</div>
				</div>

				<div className="col-lg-12">
					<div className="input-group input-group-lg">
					  <span className="input-group-addon" id="sizing-addon1"> <span className="glyphicon glyphicon-star" aria-hidden="true"></span> </span>
					  <input type={"text"} className="form-control" value={this.state.line1} onChange={this.setProp("line1")} placeholder={"First Line"} aria-describedby="sizing-addon1" />
					</div>
				</div>

				<div className="col-lg-12">
					<div className="input-group input-group-lg">
					  <span className="input-group-addon" id="sizing-addon1"> <span className="glyphicon glyphicon-star" aria-hidden="true"></span> </span>
					  <input type={"text"} className="form-control" value={this.state.line2} onChange={this.setProp("line2")} placeholder={"Second Line"} aria-describedby="sizing-addon1" />
					</div>
				</div>

				<div className="col-lg-12">
					<div className="input-group input-group-lg">
					  <span className="input-group-addon" id="sizing-addon1">{'Color'}</span>
					  <input type={"color"} className="form-control" value={this.state.background} onChange={this.setProp("background")} placeholder={"Background Color"} aria-describedby="sizing-addon1" />
					</div>
				</div>

				<div className="col-lg-12">
					<div className="input-group input-group-lg">
					  <span className="input-group-addon" id="sizing-addon1">{'Time (optional)'}</span>
					  <input type={"datetime-local"} className="form-control" placeholder={"Time to unlock the event"} aria-describedby="sizing-addon1" />
					</div>
				</div>

				<h1></h1>
			</div>

			<div className="preview">
				<Panel {...this.state} />
			</div>

		</div>
	}
});

var IconOptions = React.createClass({
	render: function(){
		return <option>{this.props.icon}</option>
	}
});

var Panel = React.createClass({
	render: function(){
		var eventStyle = {};
        eventStyle.background = this.props.background;

		return <div className="eventImage" style={eventStyle}>
                <EventIcon image={this.props.icon}/>
                  <h1>{this.props.line1}</h1>
                  <h2>{this.props.line2}</h2>
                </div>
	}
});

var EventIcon = React.createClass({
  render: function() {
    return (
      <img src={'../img/icons/'+ this.props.image +'.png'} className="eventIcon"/>
    );
  }
});




module.exports = CreateForm;