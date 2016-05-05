$(function(){
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



});
