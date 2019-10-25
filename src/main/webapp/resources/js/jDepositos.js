$(document).ready(
		function() {
			$(".registrationForm").validate(
					{
						errorClass : "error-class",
						rules : {
							destination : {
								required : true
							},
							code : {
								required : true
							},
							name : {
								required : true
							},
							description : {
								maxlength : 255

							}
						},
						highlight : function(element) {
							$(element).closest('.form-group').removeClass(
									'has-success').addClass('has-error');
						},
						unhighlight : function(element) {
							$(element).closest('.form-group').removeClass(
									'has-error').addClass('has-successerror');
						}
					}

			);
			$('[data-toggle="tabla"]').tooltip();
			$('[data-toggle="tooltip"]').tooltip();
			$(".triggerRemove").click(
					function(e) {
						e.preventDefault();
						$("#modalRemove #removeBtn").attr("href",
								$(this).attr("href"));
						$("#modalRemove").modal();
					});
		});

function edit(id) {
	document.getElementById('form-vigente').style.display = 'block';
	var Row = document.getElementById(id);
	var Cells = Row.getElementsByTagName("td");
	document.getElementById('destination').value = Cells[0].innerText;
	document.getElementById('code').value = Cells[1].innerText;
	document.getElementById('name').value = Cells[2].innerText;
	document.getElementById('description').value = Cells[3].innerText;
	document.getElementById('idDeposito').value = document.getElementById('idHidden' + id).value;
	document.getElementById('vigente').checked = document.getElementById('idHiddenVigente' + id).checked;
}