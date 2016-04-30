$(function(){
  var $logInButton = $('.login-signup a');
  var $signUp = $('.login-signup button');

  $logInButton.click(function(){
    console.log($(this));
  });

  $signUp.click(function(){
    console.log($(this));
  });

});
