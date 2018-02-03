$(".submit-vote").on('click', function(e){
  $('input[type="radio"]:checked').val();
  e.preventDefault();
});
