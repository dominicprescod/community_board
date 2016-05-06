module.exports = function(server){
  var Comment = require('../models/comment.js');
  var Board = require('../models/board.js');
  var io = require('socket.io').listen(server);

  // Socket
  io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      var newComment = new Comment(msg);
      Board.findById(msg.parent,function(err, board){
        board.comments.push(newComment);
        board.save(function(){});
      });

      io.emit('chat message', msg);
    });
  });
};
