$(document).ready(
		function() {
			$(".registrationForm").validate(
					{
						errorClass : "error-class",
						rules : {
							code : {
								required : true
							},
							description : {
								required : true,
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

function findElementById(id) {
document.getElementById('form-vigente').style.display = 'block';
var Row = document.getElementById(id);
var Cells = Row.getElementsByTagName("td");
document.getElementById('id').value = id;
document.getElementById('name').value = Cells[0].innerText;
document.getElementById('description').value = Cells[1].innerText;
document.getElementById('amount').value = Cells[2].innerText;
document.getElementById('lifeIntervalUnit').value = (Cells[3].id).substr(3);
document.getElementById('vigente').checked = document
		.getElementById('idHiddenVigente' + id).checked;
}