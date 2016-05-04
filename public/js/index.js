$(function(){
  var $section = $('section');
  var $inbox = $('.octicon-comment');
  var $messages = $('.inbox-message');

  $inbox.click(function(){
    $section.is(":visible") ? $section.hide() : $section.show();
  });

  $('.list').click(function(){
    $(this).find('.inbox-message').width('100%');
  });

});
