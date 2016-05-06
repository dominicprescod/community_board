var mongoose = require('mongoose');
mongoose.set('debug', true);
var Schema = mongoose.Schema;
var boardSchema = require('./boards.js').schema;

var neighborhoodSchema = new Schema ({
    title: {type: String, required: true},
    boards: [boardSchema],
    members: [String],
    images: [String],
}, {collection: 'neighborhoods'});

var Neighborhoods = mongoose.model('Neighborhoods', neighborhoodSchema);

module.exports = Neighborhoods;
