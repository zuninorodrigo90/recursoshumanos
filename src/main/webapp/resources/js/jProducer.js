var app = {
	'onLoad' : function() {

	},
	'reload' : function() {
		$('#myTable').DataTable();
		$('[data-toggle="tooltip"]').tooltip();
		$('[data-toggle="tabla"]').tooltip();
		$(".triggerRemove").click(function(e) {
			e.preventDefault();
			$("#modalRemove #removeBtn").attr("href", $(this).attr("href"));
			$("#modalRemove").modal();
		});
	},
	'findElementById' : function(id, idCountry) {
		document.getElementById('form-vigente').style.display = 'block';
		var Row = document.getElementById(id);
		var Cells = Row.getElementsByTagName("td");
		document.getElementById('code').value = Cells[0].innerText;
		document.getElementById('name').value = Cells[1].innerText;
		document.getElementById('countries').value = idCountry;
		document.getElementById('idProducer').value = id;
		document.getElementById('vigente').checked = document
		.getElementById('idHiddenVigente' + id).checked;
	}
};

$(document).ready(
		function() {
			$(".registrationForm").validate(
					{
						errorClass : "error-class",
						rules : {
							code : {
								required : true
							},
							name : {
								required : true,
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
					});
			$('#myTable').DataTable();
			$('[data-toggle="tooltip"]').tooltip();
			$('[data-toggle="tabla"]').tooltip();
			$(".triggerRemove").click(
					function(e) {
						e.preventDefault();
						$("#modalRemove #removeBtn").attr("href",
								$(this).attr("href"));
						$("#modalRemove").modal();
					});
		});