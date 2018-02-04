$("document").ready(function(){
  $(".submit-challenge").click(function(){
    var random = Math.random() >= 0.5;
    $(".challenge-before").css({'display': 'none'});
    $(".submit-challenge").css({'display': 'none'});

    console.log(random)
    if (random)
      $(".challenge-after.success").css({'display': 'block'});
    else
      $(".challenge-after.failed").css({'display': 'block'});

    $(".challenge-system").data('toggle','');
    $(".challenge-system .card-text.text-warning").text('Already Challeneged')
  });
});
