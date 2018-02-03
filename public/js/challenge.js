$("document").ready(function(){
  $(".submit-challenge").click(function(){
    var random = Math.random() >= 0.5;
    $(".challenge-before").css({'display': 'none'});
    $(".challenge-after").css({'display': 'block'})
  });
});
