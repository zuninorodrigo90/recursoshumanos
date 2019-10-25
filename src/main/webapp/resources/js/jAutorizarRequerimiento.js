$(document).ready(function() {

});

function autorizarModal() {
	document.getElementById("tBodyModalAutorizados").innerHTML = "";
	document.getElementById("tBodyModalRechazados").innerHTML = "";
	document.getElementById("tablaAutorizados").hidden=true;
	document.getElementById("tablaRechazados").hidden=true;
	var table = document.getElementById("tbody"), cells;

	for (var i = 0; i < table.rows.length; i++) {

		if ($('#ocionReq' + table.rows[i].id + ' input:radio:checked').val() == 1) {
			document.getElementById("tablaAutorizados").hidden=false;
			var tr = '<tr id="' + table.rows[i].id + '">'
			cells = table.rows[i].cells;
			cells[0].innerText
			tr += '<td>' + cells[0].innerText + '</td><td>'
					+ cells[1].innerText + '</td><td>' + cells[2].innerText
					+ '</td><td>' + cells[3].innerText + '</td><td>'
					+ '<select class="form-control" id="imputation'
					+ table.rows[i].id + '">'
					+ '<option value="">Seleccione...</option>'
					+ document.getElementById("options").innerHTML
					+ '</select>' + '</td></tr>';

			document.getElementById("tBodyModalAutorizados").innerHTML += tr;
		} else if($('#ocionReq' + table.rows[i].id + ' input:radio:checked').val() == 2) {
			document.getElementById("tablaRechazados").hidden=false;
			var tr = '<tr id="' + table.rows[i].id + '">'
			cells = table.rows[i].cells;
			cells[0].innerText
			tr += '<td>' + cells[0].innerText + '</td><td>'
					+ cells[1].innerText + '</td><td>' + cells[2].innerText
					+ '</td><td>' + cells[3].innerText + '</td>'
					+ '</td><td><input cssClass="form-control" required="true" id="motivo'
					+ table.rows[i].id + '"/></td></tr>';

			document.getElementById("tBodyModalRechazados").innerHTML += tr;
		}
	}
	$("#modalAutorizados").modal();
}

function validar() {
	var autorizados = document.getElementById("tBodyModalAutorizados");
	for (var i = 0; i < autorizados.rows.length; i++) {
		cells = autorizados.rows[i].cells;
		if (document.getElementById('imputation'+ autorizados.rows[i].id).value == "") {
			return false;
		}
	}
	return true;
}
function save() {
	if (validar()) {
		var lista = [];
		var autorizados = document.getElementById("tBodyModalAutorizados");
		for (var i = 0; i < autorizados.rows.length; i++) {
			cells = autorizados.rows[i].cells;
			var requerimiento = {
				"autorizar" : true,
				"id" : Number(autorizados.rows[i].id),
				"idImputation" : Number(document.getElementById('imputation'
						+ autorizados.rows[i].id).value)
			}
			lista.push(requerimiento);
		}
		var rechazados = document.getElementById("tBodyModalRechazados");
		for (var i = 0; i < rechazados.rows.length; i++) {
			cells = rechazados.rows[i].cells;
			var requerimiento = {
				"autorizar" : false,
				"id" : Number(rechazados.rows[i].id),
				"motivo" : document.getElementById('motivo'+ rechazados.rows[i].id).value
			}
			lista.push(requerimiento);
		}
		var jsonParameter = encodeURIComponent(JSON.stringify(lista));
		var aprobar = {
			"requerimientos" : lista,
			"cantTotal" : 0
		}

		$
				.ajax({
					type : "POST",
					contentType : 'application/json; charset=utf-8',
					dataType : 'json',
					url : "/sgl/requerimientos/autorizarRequerimiento/aprobar/"
							+ jsonParameter,
					data : JSON.stringify(jsonParameter),
					success : function(response) {
						if(response == "2"){
							$("#modalBodyResultado").text("Todos los requerimientos se han cambiado de estado y se registraron correctamente.");
							$("#modalResultado").modal();
						}else if (response == "1"||response == "2"){
							$("#modalBodyResultado").text("Ha ocurrido un error durante la actualización de los estados de los requerimientos, vuelva a intentarlo.");
							$("#modalResultado").modal();
						}
					}
				})
	} else {
		$("#modalBodyError").text("Debe seleccionar todas las imputaciones antes de guardar.");
		
		$("#modalError").modal();
	}
	;
}
