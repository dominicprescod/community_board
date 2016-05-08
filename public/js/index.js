$(function(){
  var socket = io();
  var $section = $('section');
  var $inbox = $('.octicon-comment');
  var $messages = $('.inbox-message');
  // $(".inbox-message ul").scrollTop($(".width ul")[0].scrollHeight);

  $inbox.click(function(){
    $section.is(":visible") ? $section.hide() : $section.show();
  });

  $('.list').click(function(){
    var $me = $(this).find('.inbox-message');
    var $current = $me.find('ul');
    var $active = $(this).find('.from-message');
    $active.addClass('active');
    $me.addClass("width");

    $current.scrollTop($current[0].scrollHeight);
    // $('.width ul').animate({
    //   scrollTop: $('.width ul li')[0].offset().top
    // },'slow');
  // $('.width ul').scrollTop($('.width ul')[0].scrollHeight);

    $('.inbox-message .octicon').click(function(e){
      // $("#comments").scrollTop($("#comments")[0].scrollHeight);
      $me.removeClass("width");
      $active.removeClass('active');
      e.stopPropagation();
    });
  });

  $('.inbox-message form').submit(function(e){
    e.preventDefault();
      // console.log($(this).serializeArray()[4].value);
      var newMessage = {
        parent: $(this).serializeArray()[0].value,
        parent_name: $(this).serializeArray()[1].value,
        from_id: $(this).serializeArray()[2].value,
        from_name: $(this).serializeArray()[3].value,
        from_pic: $(this).serializeArray()[4].value,
        value: $(this).serializeArray()[5].value
      };
      // console.log(newMessage);
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
    $('.'+msg.parent_name+"-message").append($li);
    if($('.width ul').is(':visible')){
      $('.width ul').scrollTop($('.width ul')[0].scrollHeight);
    }
    $('.'+msg.parent_name+' p').text(msg.value);

  });



});
