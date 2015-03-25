var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var panelSchema = new mongoose.Schema({
	//_id: Schema.ObjectId,
	pin : String,
	panelData: Array,
});

var Panel = mongoose.model('Panel', panelSchema);

module.exports = Panel;