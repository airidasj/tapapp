var React = require('react/addons'),
    dispatcher = require('./Dispatcher').getInstance(),
    store = require('./Store').getInstance(),
    Panel = require('./Panel'),
    xhr = require('./xhr');

var CreateForm = React.createClass({

	getInitialState: function(){
		return {
			formCount: 1
		};
	},

	render: function(){


		var forms = [
			<FormFields ref={"form"+1} key="form0" number={1} />
		];

		if(this.state.formCount > 1){
			var remaining = this.state.formCount - 1;
			while(remaining--){
				forms.push(<FormFields ref={"form"+(forms.length+1)} key={"form"+forms.length} number={forms.length+1} />);
			}
		}

		if(store.get('pinAlert') === true){
			var alert =  <PinAlert />;
		} else if(store.get('pinSuccess')){
			var alert = <PinSuccess />
		}else {
			var alert = "";
		};
		

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
					<h1>{'Create an Event Password'}</h1>

					<div className="col-lg-12">
						<div className="input input-group input-group-lg">
						  <span className="input-group-addon" id="sizing-addon1"> <span className="glyphicon glyphicon-star" aria-hidden="true"></span> </span>
						  <input ref="password" type={"text"} className="form-control"  placeholder={"Enter password"} aria-describedby="sizing-addon1" />
						</div>

						<button className="btn" onClick={this.submitClick} >{'SUBMIT'}</button>

					</div>
					{alert}
				</div>
			</div>
		</div>;
	},

	addForm: function(){
		this.setState({
			formCount: this.state.formCount+1
		});
	},

	_submitForm: function(){
		console.log('Invoking submit form?');

		var password = [this.refs.password.getDOMNode().value];
		var nForms = this.state.formCount;

		// console.log('Number of forms...',nForms);
		var DataObjects = [];
		

		for (i=1; i < (nForms+1); i++){
			// console.log(this.refs["form"+i]["state"]);
			DataObjects.push(this.refs["form"+i]["state"])
		};


		Data = [];
		Data.push(password);
		Data.push(DataObjects);

		console.log(Data);
		dispatcher.emit('newPanel', Data);
		store.set('pinSuccess', true);
	},

	submitClick: function(){
		var p = this.refs.password.getDOMNode().value;
		var self = this;
		if(p){
			xhr('/checkPin/'+p).then(function(response){
				// console.log(response);
				store.set('pinAlert', response);
				if(response === false){
					// console.log('We start the submit form function..');
					self._submitForm();
				}
			});
		} else {
			store.set('pinAlert', true);
		}
	},


});

var FormFields = React.createClass({

	getInitialState: function(){
		return {
			icon: "016_System",
			text1: "Event Title",
			text2: "Instructions",
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

		// if(store.get('submit-event') === true){
		// 	console.log('=====>',this.state);

		// 	console.log('=====>',this.refs.text1.getDOMNode().value);

		// 	store.set('submit-event', false);
		// }

		if(this.props.number <= 1){
			var buttonRemove = '';
		} else {
			var buttonRemove = <button onClick={this.removeForm.bind(null, this.props.number)} className="form-remove"></button>;
		}

		var iconList = store.get('iconNames') || [];
		var icons = iconList.map(function(icona, i){
			return <IconOptions key={i} icon={icona} />
		});

		return <div className="animated fadeInDown form">

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
					  <input type={"text"} className="form-control" value={this.state.text1} onChange={this.setProp("text1")} placeholder={"First Line"} aria-describedby="sizing-addon1" />
					</div>
				</div>

				<div className="col-lg-12">
					<div className="input-group input-group-lg">
					  <span className="input-group-addon" id="sizing-addon1"> <span className="glyphicon glyphicon-star" aria-hidden="true"></span> </span>
					  <input type={"text"} className="form-control" value={this.state.text2} onChange={this.setProp("text2")} placeholder={"Second Line"} aria-describedby="sizing-addon1" />
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
                  <h1>{this.props.text1}</h1>
                  <h2>{this.props.text2}</h2>
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

var PinAlert = React.createClass({
	render: function(){
		return (
			<div className="animated bounceIn alert alert-danger" role="alert">
			  <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
			  
			  {'This PASSWORD is taken...'}
			</div>
		);
	}
});

var PinSuccess = React.createClass({
	render: function(){
		return (
			<div className="animated bounceIn alert alert-success" role="alert">
			  <span className="glyphicon glyphicon-check" aria-hidden="true"></span>
			  
			  {'Your MIIXER sequence has been submited!'}
			</div>
		);
	}
});




module.exports = CreateForm;