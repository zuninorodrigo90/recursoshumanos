$(document).ready(function() {
	$('[data-toggle="tooltip"]').tooltip();
	$(window).keydown(function(event) {
		if (event.keyCode == 13) {
			event.preventDefault();
			return false;
		}
	});
});

var stateRequerimientoid = "";
var origenState = 0;
function findRequerimiento() {
	$
			.ajax({
				type : "POST",
				url : "/sgl/requerimientos/actualizarEstadoRequerimiento/findRequerimiento/"
						+ document.getElementById("number").value,
				success : function(response) {
					if (response != null) {
						document.getElementById('stateRequerimiento').disabled = false;
						origenState = 0;
						document.getElementById('requerimientoEncontrado').hidden = false;

						stateRequerimientoid = response.state.id;
						document.getElementById('sistemaArmas').innerHTML = response.sistemaArmas;
						document.getElementById('reference').innerHTML = response.reference;
						document.getElementById('montoTotal').innerHTML = response.importeTotal;
						document.getElementById('idRequerimiento').value = response.id;
						$('#stateRequerimiento').html('');

						$('#stateRequerimiento').append(
								$("<option></option>").attr("value",
										response.state.id).text(
										response.state.description));
						if (response.state.nextStates != null) {
							for (var i = 0; i < response.state.nextStates.length; i++) {
								$('#stateRequerimiento')
										.append(
												$("<option></option>")
														.attr(
																"value",
																response.state.nextStates[i].id)
														.text(
																response.state.nextStates[i].description));
							}
						}

						var divTabla = document.getElementById('tableDetalles');
						divTabla.innerHTML = "";
						var tabla = '<table class="table table-bordered table-hover">'
								+ '<thead style="text-align: center; font-weight: bolder">'
								+ '<tr class= "active">'
								+ '<td>Item</td>'
								+ '<td>Nro. de Parte</td>'
								+ '<td>Designación</td>'
								+ '<td style="width:250px">Fabricante</td>'
								+ '<td style="width:40px">NSN</td>'
								+ '<td>UM</td>'
								+ '<td style="width:20px">Cant.</td>'
								+ '<td style="width:20px">Calidad</td>'
								+ '<td style="width:20px">Prioridad</td>'
								+ '<td>Precio</td>'
								+ '<td>Observ.</td>'
								+ '<td>Estado</td>'
								+ '</tr>'
								+ '</thead>'
								+ '<tbody id="tableBody" style="font-size: 12px">';
						var detalle = response.items;
						for (var i = 0; i < detalle.length; i++) {
							var tr = '<tr id="'
									+ detalle[i].id
									+ '"><td>'
									+ detalle[i].orden
									+ "</td>"
									+ "<td>"
									+ detalle[i].partNumber
									+ "</td>"
									+ "<td>"
									+ detalle[i].designation
									+ "</td>"
									+ "<td>"
									+ detalle[i].producer
									+ "</td>"
									+ "<td>"
									+ detalle[i].nsn
									+ "</td>"
									+ "<td>"
									+ detalle[i].measurementUnitCode
									+ "</td>"
									+ "<td>"
									+ detalle[i].amount
									+ "</td>"
									+ "<td>"
									+ detalle[i].qualityName
									+ "</td>"
									+ "<td>"
									+ detalle[i].priority
									+ "</td>"
									+ "<td>"
									+ 'U$S '
									+ detalle[i].price
									+ "</td>"
									+ "<td>"
									+ detalle[i].observation
									+ "</td>"
									+ "<td>"
									+ '<select class="form-control" id="stateDetalle'
									+ detalle[i].id
									+ '" onchange= "changeStateDetalle(this)" name="'
									+ detalle[i].state.id + '">'
									+ '<option value="' + detalle[i].state.id
									+ '">' + detalle[i].state.description
									+ '</option>';
							if (detalle[i].state.nextStates != null) {
								for (var j = 0; j < detalle[i].state.nextStates.length; j++) {

									tr += '<option value="'
											+ detalle[i].state.nextStates[j].id
											+ '">'
											+ detalle[i].state.nextStates[j].description
											+ '</option>';
								}
							}
							tr += '</select>'

							+ "</td>";
							tabla += tr;
						}
						tabla += '</tbody></table>'
						divTabla.innerHTML = tabla;

					} else {
						document.getElementById('requerimientoEncontrado').hidden = true;

					}
				}
			})
}

function save() {
	if (origenState == 1) {
		var table = document.getElementById("tableBody"), cells;
		var requerimiento = {
			'idRequerimiento' : document.getElementById('idRequerimiento').value,
			'state' : document.getElementById('stateRequerimiento').value
		}

		var jsonParameter = encodeURIComponent(JSON.stringify(requerimiento));

		$
				.ajax({
					type : "POST",
					contentType : 'application/json; charset=utf-8',
					dataType : 'json',
					url : "/sgl/requerimientos/actualizarEstadoRequerimiento/setState/"
							+ jsonParameter,
					success : function(response) {
						if (response == "2") {
							findRequerimiento();
							$("#modalBodyResultado")
									.text(
											"El estado del requerimiento se actualizo con exito.");
							$("#modalResultado").modal();
						} else if (response == "error") {
							$("#modalError #lblModalError")
									.html(
											"Hubo un error al intentar actualizar el estado del requerimiento.");
							$("#modalError").modal();
						}
					}
				})
	} else if (origenState == 2) {
		var detalles = [];
		var table = document.getElementById("tableBody"), cells;
		for (var i = 0; i < table.rows.length; i++) {
			cells = table.rows[i].cells;
			var item = {
				"id" : table.rows[i].id,
				"state" : document.getElementById('stateDetalle'
						+ table.rows[i].id).value
			}
			detalles.push(item);
		}
		var requerimiento = {
			'idRequerimiento' : document.getElementById('idRequerimiento').value,
			'detalles' : detalles
		}

		var jsonParameter = encodeURIComponent(JSON.stringify(requerimiento));

		$
				.ajax({
					type : "POST",
					contentType : 'application/json; charset=utf-8',
					dataType : 'json',
					url : "/sgl/requerimientos/actualizarEstadoRequerimiento/setStateDetalles/"
							+ jsonParameter,
					success : function(response) {
						if (response == "2") {
							findRequerimiento();
							$("#modalBodyResultado")
									.text(
											"El estado del requerimiento se actualizo con exito.");
							$("#modalResultado").modal();
						} else if (response == "error") {
							$("#modalError #lblModalError")
									.html(
											"Hubo un error al intentar actualizar el estado del requerimiento.");
							$("#modalError").modal();
						}
					}
				})
	} else if (origenState == 0) {
		$("#modalError #lblModalError")
				.html(
						"No hay cambios de estados seleccionados.");
		$("#modalError").modal();
	}

}

function changeState(idState) {
	var disabled = true;
	if (Number(idState) != stateRequerimientoid) {
		disabled = true;
		origenState = 1;
	} else {
		disabled = false;
		origenState = 0;
	}
	var table = document.getElementById("tableBody"), cells;
	for (var i = 0; i < table.rows.length; i++) {
		cells = table.rows[i].cells;
		document.getElementById('stateDetalle' + table.rows[i].id).disabled = disabled;

	}
}

function changeStateDetalle(selectState) {
	if (selectState.name == selectState.value) {
		document.getElementById('stateRequerimiento').disabled = false;
		origenState = 0;
	} else {
		document.getElementById('stateRequerimiento').disabled = true;
		origenState = 2;
	}
}

function loadRequerimientos() {
	var nroRequerimiento = document.getElementById('number');
	var producers;
	$.ajax({
		type : "POST",
		url : "/sgl/requerimientos/actualizarEstadoRequerimiento/loadNumbersRequerimiento/"
				+ nroRequerimiento.value,
		success : function(response) {
			producers = response;
			$("#number").autocomplete({
				source : response
			});
		}
	})
}
