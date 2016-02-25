var mongoose = require('mongoose');
mongoose.set('debug',true);
var Schema = mongoose.Schema;
var commentSchema = require('./comment.js').schema;


var boardSchema = new Schema({
      name: {type: String, required: true},
      date: {type: Date, default: Date.now},
      comments: [commentSchema],
      fpal:[{
        firstName: String,
        lastName: String,
        rId: String,
        pic: String
      }],
      spal: [{
        firstName: String,
        lastName: String,
        rId: String,
        pic: String
      }],
      members: [String]
}, {collection: 'boards'});

var Board = mongoose.model('Board', boardSchema);
module.exports = Board;
