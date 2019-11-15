$(document).ready(function() {
  //Confirmar contraseña

  var password = document.getElementById("pass"),
    confirm_password = document.getElementById("confirmPass");

  function validatePassword() {
    if (password.value != confirm_password.value) {
      confirm_password.setCustomValidity("Las contraseñas no coinciden");
    } else {
      confirm_password.setCustomValidity("");
    }
  }

  password.onchange = validatePassword;
  confirm_password.onkeyup = validatePassword;

  /*Confirmar contraseña con jQuery

  $("#alta").on("click", function() {
    if ($("#pass").val() === $("#confirmPass").val()) {
      alert("Equal");
      return true;
    } else {
      alert("don't matches");
      return false;
    }
  });
  */

  //Modal

  $(".triggerRemove").click(function(e) {
    e.preventDefault();
    $("#modalRemove #removeBtn").attr("href", $(this).attr("href"));
    $("#modalRemove").modal();
  });



});
