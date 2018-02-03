var stateNames = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Orissa","Punjab","Rajasthan","Sikkim","Tamil Nadu","Tripura","Uttaranchal","Uttar Pradesh","West Bengal"]
$(".submit-vote").on('click', function(e){
    // console.log($('input[type="radio"]:checked').val());
  Voting.vote(web3.eth.accounts[ethid],$('input[type="radio"]:checked').val(),stateNames[ethid]);
    console.log(web3.eth.accounts[ethid], $('input[type="radio"]:checked').val(), stateNames[ethid]);

    e.preventDefault();
});
