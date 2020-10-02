 $(document).ready(function(){
 // create useful variables
var radioButton = $(".radio-button"),
    buttonATM = $(".radio-button:nth-child(1)"),
    buttonINTERNET = $(".radio-button:nth-child(2)"),
    buttonMOBILE  = $(".radio-button:nth-child(3)"),
    buttonKLIK = $(".radio-button:nth-child(4)");

$(radioButton).click(function(){
  // toggle radio buttons
  $("form").find(radioButton).not(this).removeClass("active");
  $(this).addClass("active");
  $("input", this).prop("checked", true);
  
  // determine which content to display
  if ($(buttonATM).find('input:checked').length > 0) {
    $("#atm-content").fadeIn();
  } else { $("#atm-content").hide(); }

  if ($(buttonINTERNET).find('input:checked').length > 0) {
    $("#internet-content").fadeIn();
  } else { $("#internet-content").hide(); }

  if ($(buttonMOBILE).find('input:checked').length > 0) {
    $("#mobile-content").fadeIn();
  } else { $("#mobile-content").hide(); }

  if ($(buttonKLIK).find('input:checked').length > 0) {
    $("#klik-content").fadeIn();
  } else { $("#klik-content").hide(); }
  
});


  // create useful variables
var bankButton = $(".bank-button"),
    buttonMANDIRI = $(".bank-button:nth-child(0)"),
    buttonBCA = $(".bank-button:nth-child(2)"),
    buttonBNI  = $(".bank-button:nth-child(3)"),
    buttonBRI = $(".bank-button:nth-child(4)");

$(bankButton).click(function(){
  // toggle radio buttons
  $("form").find(bankButton).not(this).removeClass("active");
  $(this).addClass("active");
  $("input", this).prop("checked", true);
  
  // determine which content to display
  if ($(buttonMANDIRI).find('input:checked').length > 0) {
    $("#bankmandiri").fadeIn();
  } else { $("#bankmandiri").hide(); }

  if ($(buttonBCA).find('input:checked').length > 0) {
    $("#bankbca").fadeIn();
  } else { $("#bankbca").hide(); }

  if ($(buttonBNI).find('input:checked').length > 0) {
    $("#bankbni").fadeIn();
  } else { $("#bankbni").hide(); }

  if ($(buttonBRI).find('input:checked').length > 0) {
    $("#bankbri").fadeIn();
  } else { $("#bankbri").hide(); }
  
});

});