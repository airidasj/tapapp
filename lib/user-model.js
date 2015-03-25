var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new mongoose.Schema({
	//_id: Schema.ObjectId,
	name : String,
	facebookId: String,
	facebookLink: String,
});

var User = mongoose.model('User', userSchema);

module.exports = User;