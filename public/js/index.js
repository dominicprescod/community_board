$(function(){
  var socket = io();
  var $section = $('section');
  var $inbox = $('.octicon-comment');
  var $messages = $('.inbox-message');

  $inbox.click(function(){
    $section.is(":visible") ? $section.hide() : $section.show();
  });

  $('.list').click(function(){
    var $me = $(this).find('.inbox-message');
    $me.addClass("width");

    $('.inbox-message .octicon').click(function(e){
      $me.removeClass("width");
      e.stopPropagation();
    });
  });

  $('.inbox-message form').submit(function(e){
    e.preventDefault();
      // console.log($(this).serializeArray()[4].value);
      var newMessage = {
        parent: $(this).serializeArray()[0].value,
        from_id: $(this).serializeArray()[1].value,
        from_name: $(this).serializeArray()[2].value,
        from_pic: $(this).serializeArray()[3].value,
        value: $(this).serializeArray()[4].value
      };
      console.log(newMessage);
      socket.emit('chat message', newMessage);
      $('.comment-box').val('');
      return false;
  });

  socket.on('chat message',function(msg){
    var $stringPic = $('<div>').addClass('string-pic');
    var $stringMessage = $('<div>').addClass('string-message');
    var $img = $('<img>').attr('src',msg.from_pic);
    var $name = $('<h1>').text(msg.from_name);
    var $time = $('<h1>').addClass('time').text('now');
    var $text = $('<p>').text(msg.value);
    $stringPic.append($img);
    $stringMessage.append($name)
                  .append($time)
                  .append($text);
    var $li = $('<li>');
    $li.append($stringPic)
        .append($stringMessage);
    $('.width ul').append($li);
  });



});
