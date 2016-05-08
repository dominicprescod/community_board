module.exports = function(server){
  var Comment = require('../models/comment.js');
  var Board = require('../models/board.js');
  var io = require('socket.io').listen(server);

  // Socket
  io.on('connection', function(socket){
    socket.on('chat message', function(msg){

      var filMsg = {
        parent: msg.parent,
        from_id: msg.from_id,
        from_name: msg.from_name,
        from_pic: msg.from_pic,
        value: msg.value
      };

      var newComment = new Comment(filMsg);
      Board.findById(msg.parent,function(err, board){
        board.comments.push(newComment);
        board.save(function(){});
      });

      io.emit('chat message', msg);
    });
  });
};
