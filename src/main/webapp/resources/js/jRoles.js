var app = {
	'onLoad' : function() {

	},
	'findElementById' : function(id) {
		var Row = document.getElementById(id);
		var Cells = Row.getElementsByTagName("td");
		document.getElementById('name').value = Cells[0].innerText;
		document.getElementById('description').value = Cells[1].innerText;
		document.getElementById('idRole').value = id;
		document.getElementById('alertCorrect').remove();
	}
};

$(document).ready(
		function() {
//			$(function() {
//				$("#draggable").draggable({
//					cursor : 'move'
//				});
//				$("#droppable").droppable(
//						{
//							drop : function(event, ui) {
//								$(this).addClass("ui-state-highlight")
//										.find("p").html("Dropped!");
//							}
//						});
//			});

			$(".registrationForm").validate(
					{
						errorClass : "error-class",
						rules : {
							name : {
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
					});
			$('[data-toggle="tabla"]').tooltip();
			$('[data-toggle="tooltip"]').tooltip();
			$(".triggerRemove").click(
					function(e) {
						e.preventDefault();
						$("#modalRemove #removeBtn").attr("onclick",
								"eliminar(" + $(this).attr("id") + ")");
						$("#modalRemove").modal();
					});
		});

function eliminar(id) {
	$.ajax({
		type : "GET",
		url : "/sgl/administracion/roles/eliminar/" + id,
		success : function(response) {
			if (response != "") {
				window.location.replace("/sgl/administracion/roles");
			} else {
				$("#modalRemove").modal('hide');
//				$("#modalRemoveForced #removeBtnForced").attr("href",
//						"/sgl/roles/eliminar/forced/" + id);
				$("#modalRemoveForced").modal();
			}
		}
	})
}