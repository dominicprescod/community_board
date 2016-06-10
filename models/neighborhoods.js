var mongoose = require('mongoose');
mongoose.set('debug', true);
var Schema = mongoose.Schema;
// var boardSchema = require('./board.js').schema;
// var userSchema = require('./user.js').schema;

var neighborhoodSchema = new Schema ({
    title: {type: String, required: true},
    borough: {type: String, required: true},
    boards: [String],
    members: [String],
    images: [String],
}, {collection: 'neighborhoods'});

var Neighborhoods = mongoose.model('Neighborhoods', neighborhoodSchema);

module.exports = Neighborhoods;
