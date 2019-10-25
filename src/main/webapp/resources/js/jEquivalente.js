$(document).ajaxComplete(function() {
	$('[data-toggle="tooltip"]').tooltip();
})

$('#modalRemove').on('shown.bs.modal', function() {
	$('#myInput').focus();
})

$(document).ready(function() {
	$('[data-toggle="tooltip"]').tooltip();
	var id = document.getElementById('id').value;
	if (id != "") {
		findMaterial();
	}
});

function findMaterial() {
	var partNumber = document.getElementById('partNumber');
	var codeProducer = document.getElementById('producer1');
	if (partNumber.value == "" || codeProducer.value == "") {
		var msj = document.getElementById('alertDanger');
		msj.hidden = false;
		msj.class = "alert alert-danger";
		msj.innerHTML = "Debe completar todos los campos.";
		document.getElementById('alertSuccess').hidden = true;
	} else {
		var component = {
			"partNumber" : partNumber.value,
			"producer" : codeProducer.value,
		}
		$
			.ajax({
				type : "POST",
				contentType : 'application/json; charset=utf-8',
				dataType : 'json',
				url : "/sgl/materiales/searchCatalogoByProducerAndPartNumber",
				data : JSON.stringify(component),
				success : function(response) {
					if (response != "") {
						var msj = document.getElementById('alertDanger');
						validateVigencia(response, msj);
						document.getElementById('btnGuardar').disabled = false;
						document.getElementById('id').value = response.id;
						document.getElementById('designacion').innerHTML = "Designación: "
						+ response.designacion
						+ "<br>"
						+ "Unidad de Medida: "
						+ response.measurementUnit.name
						+ "<br>"
						+ "NSN: "
						+ response.nsn
						+ "<br>"
						+ "NCM: "
						+ response.ncmConstable;
						if (response.equivalente == null) {
							findEquivalentes(null);
						} else
							findEquivalentes(response.equivalente.id);

					} else {
						document.getElementById('btnGuardar').disabled = true;
						var msj = document.getElementById('alertDanger');
						document.getElementById('alertSuccess').hidden = true;
						msj.hidden = false;
						msj.innerHTML = "No se encontro el material correspondiente.";
						document.getElementById('id').value = null;
						document.getElementById('designacion').innerHTML = "";
						document.getElementById('equivalentes').hidden = true;
						document.getElementById('idEquivalentes').value = null;

					}
				}
			})
	}
}

function findMaterialEq() {
	var partNumber = document.getElementById('partNumberEq');
	var codeProducer = document.getElementById('producer2');
	if (partNumber.value == "" || codeProducer.value == "") {
		var msj = document.getElementById('alertDanger');
		msj.hidden = false;
		msj.class = "alert alert-danger";
		msj.innerHTML = "Debe completar todos los campos.";
		document.getElementById('alertSuccess').hidden = true;
		document.getElementById('alertDanger').hidden = true;
	} else {
		var component = {
			"partNumber" : partNumber.value,
			"producer" : codeProducer.value,
		}
		$
			.ajax({
				type : "POST",
				contentType : 'application/json; charset=utf-8',
				dataType : 'json',
				url : "/sgl/materiales/searchCatalogoByProducerAndPartNumber",
				data : JSON.stringify(component),
				success : function(response) {
					if (response != "") {
						var msj = document.getElementById('alertDanger');
						validateVigencia(response, msj);
						// document.getElementById('divDesignacion').innerHTML
						document.getElementById('btnGuardar').disabled = false;
						document.getElementById('idEq').value = response.id;
						// <label id="designacionEq" data-toggle="tooltip"
						// title="Datos Material"></label>

						document.getElementById('divDesignacion').innerHTML = '<label data-toggle="tooltip" title="Datos Material">Designación: '
							+ response.designacion
							+ "<br>"
							+ "Unidad de Medida: "
							+ response.measurementUnit.name
							+ "<br>"
							+ "NSN: "
							+ response.nsn
							+ "<br>"
							+ "NCM: "
							+ response.ncmConstable + '</label>';

						if (response.equivalente != null) {
							$
								.ajax({
									type : "POST",
									url : "/sgl/equivalentes/findEquivalentes/"
										+ response.equivalente.id,
									success : function(responseEq) {

										// modalBody.innerHTML += tabla;
										if (responseEq != "") {
											var modalBody = document
												.getElementById('modalBody');
											modalBody.innerHTML = "";
											var tabla = '<div style="background-color: rgba(255, 255, 255, 0.68)"><table class="table table-bordered table-hover">'
												+ '<thead style="text-align: center; font-weight: bolder">'
												+ '<tr class="active">'
												+ '<td>Nro. de Parte</td>'
												+ '<td>Designación</td>'
												+ '<td>Cod. Fabricante</td>'
												+ '</tr>'
												+ '</thead>'
												+ '<tbody id="tBodyModalEq" style="font-size: 12px">';
											document
												.getElementById('idEquivalentes').value = response.equivalente.id;
											for (var i = 0; i < responseEq.catalogos.length; i++) {
												if (responseEq.catalogos[i].id != response.id) {
													if (!responseEq.catalogos[i].vigente) {
														tabla += '<tr class="danger" data-toggle="tooltip" title="Material NO vigente">'
													} else
														tabla += "<tr>"
													tabla += "<td>"
														+ responseEq.catalogos[i].partNumber
														+ "</td>"
														+ "<td>"
														+ responseEq.catalogos[i].designacion
														+ "</td>"
														+ "<td>"
														+ responseEq.catalogos[i].producer
														+ "</td>"
														+ "</tr>";
												}
											}
											tabla += '</tbody></table></div>'
											document
												.getElementById('divDesignacion').innerHTML += tabla;
											if (document
													.getElementById('tBodyModalEq').rows.length == 0) {
												document
													.getElementById('tBodyModalEq').hidden = true;
											}
										}
									}
								})
						}
					}
				},
				error : function() {
					document.getElementById('btnGuardar').disabled = true;
					var msj = document.getElementById('alertDanger');
					document.getElementById('alertSuccess').hidden = true;
					msj.hidden = false;
					msj.class = "alert alert-danger";
					msj.innerHTML = "No se encontro el material correspondiente.";
					document.getElementById('idEq').value = null;
					document.getElementById('designacionEq').innerHTML = "";
					document.getElementById('divBtn').innerHTML = "";
				}
			})
	}
}
;

function findMaterialEquivalenteOnBlur() {
	var partNumber = document.getElementById('partNumberEq');
	var codeProducer = document.getElementById('producer2');
	if (partNumber.value != "" && codeProducer.value != "") {
		findMaterialEq();
	}
}

function findMaterialOnBlur() {
	var partNumber = document.getElementById('partNumber');
	var codeProducer = document.getElementById('producer1');
	if (partNumber.value != "" && codeProducer.value != "") {
		findMaterial();
	}
}

function findEquivalentes(idEquivalentes) {
	var tbody = document.getElementById('tbody');
	tbody.innerHTML = "";
	if (idEquivalentes != null) {
		$
			.ajax({
				type : "POST",
				url : "/sgl/equivalentes/findEquivalentes/"
					+ idEquivalentes,
				success : function(response) {
					if (response != "") {
						document.getElementById('idEquivalentes').value = idEquivalentes;
						for (var i = 0; i < response.catalogos.length; i++) {
							if (response.catalogos[i].id != document
									.getElementById('id').value) {
								var tr = "";
								if (!response.catalogos[i].vigente) {
									tr += '<tr class="danger" data-toggle="tooltip" title="Material NO vigente">'
								} else
									tr += "<tr>"
								tr += "<td>"
									+ response.catalogos[i].partNumber
									+ "</td>"
									+ "<td>"
									+ response.catalogos[i].designacion
									+ "</td>"
									+ "<td>"
									+ response.catalogos[i].producer
									+ "</td>"
									+ "<td>"
									+ '<a onclick="confirmarEliminar('
									+ response.catalogos[i].id
									+ ')"data-toggle="tooltip" title="Quitar" class="glyphicon glyphicon-remove triggerRemove"></a>'
									+ "</td>" + "</tr>";
								tbody.innerHTML += tr;
							}
						}
						document.getElementById('equivalentes').hidden = false;
					}
					if (tbody.rows.length == 0)
						tbody.innerHTML = '<tr><td colspan="4">No posee equivalentes</td></tr>';
				}
			})

	} else {
		tbody.innerHTML = '<tr><td colspan="4">No posee equivalentes</td></tr>';
		document.getElementById('equivalentes').hidden = false;
	}
}

function confirmarGuardar() {
	var id = document.getElementById('id').value;
	var idEq = document.getElementById('idEq').value;
	if (id == "" || idEq == "") {
		var msj = document.getElementById('alertDanger');
		document.getElementById('alertSuccess').hidden = true;
		msj.hidden = false;
		msj.innerHTML = "Debe completar todos los campos.";
	} else {
		$("#modalDialog #btnAceptarDialog").attr("onclick",
			"guardar(" + id + "," + idEq + ")");
		$("#modalDialog #lblModalDialog").html(
			"Guardar relacion de equivalencia");
		$("#modalDialog #bodyDialog")
			.html(
				"Se relacionará la equivalencia de "
				+ "ambos materiales y de todos los equivalentes que estos poseean.");
		$("#modalDialog").modal();
	}
}

function guardar(id, idEq) {
	$
		.ajax({
			type : "POST",
			url : "/sgl/equivalentes/equivalenteIndividual/saveEquivalente/"
				+ id + "/" + idEq,
			success : function(response) {
				if (response != null) {
					if (response == 0) {
						var msj = document.getElementById('alertDanger');
						document.getElementById('alertSuccess').hidden = true;
						msj.hidden = false;
						msj.class = "alert alert-danger";
						msj.innerHTML = "No se pueden relacionar ambos materiales porque existe una relación de alternativos";
					} else {
						document.getElementById('idEquivalentes').value = response;
						var msj = document.getElementById('alertSuccess');
						document.getElementById('alertDanger').hidden = true;
						msj.hidden = false;
						msj.innerHTML = "Relación realizada con éxito.";
						findEquivalentes(document
							.getElementById('idEquivalentes').value);
					}
				} else {
					var msj = document.getElementById('alertDanger');
					document.getElementById('alertSuccess').hidden = true;
					msj.hidden = false;
					msj.class = "alert alert-danger";
					msj.innerHTML = "Error al registrar la relación de equivalencia.";
				}
				document.getElementById('idEq').value = null;
				document.getElementById('divDesignacion').innerHTML = "";
				document.getElementById('partNumberEq').value = null;
				document.getElementById('producer2').value = "";
			}
		})
}

function showModal() {
	$("#modal").modal();
}

function confirmarEliminar(idMaterial) {
	$("#modalDialog #btnAceptarDialog").attr("onclick",
		"eliminar(" + idMaterial + ")");
	$("#modalDialog #lblModalDialog").html("Eliminar relación de equivalencia");
	$("#modalDialog #bodyDialog").html(
		"¿Está seguro que desea eliminar la relación de equivalencia?");
	$("#modalDialog").modal();
}

function eliminar(idMaterial) {
	$("#modalDialog").modal();
	$
		.ajax({
			type : "POST",
			url : "/sgl/equivalentes/equivalenteIndividual/deleteEquivalente/"
				+ idMaterial,
			success : function(response) {
				if (response) {
					var msj = document.getElementById('alertSuccess');
					document.getElementById('alertDanger').hidden = true;
					msj.hidden = false;
					msj.class = "alert alert-success";
					msj.innerHTML = "Se eliminó la relación de equivalencia con éxito.";
					findEquivalentes(document
						.getElementById('idEquivalentes').value);
				} else {
					var msj = document.getElementById('alertDanger');
					document.getElementById('alertSuccess').hidden = true;
					msj.hidden = false;
					msj.class = "alert alert-danger";
					msj.innerHTML = "Hubo un error al quitar la relación de equivalente.";
				}
			}
		})
}

function validateVigencia(response, msj) {
	if (!response.vigente && !response.producer.vigente) {
		msj.hidden = false;
		msj.class = "alert alert-danger";
		msj.innerHTML = "Material y fabricante se encuentran dados de baja.";
	} else {
		if (!response.producer.vigente) {
			msj.hidden = false;
			msj.class = "alert alert-danger";
			msj.innerHTML = 'El fabricante "' + response.producer.code
				+ '" se encuentra dado de baja.';
		} else {
			if (!response.vigente) {
				msj.hidden = false;
				msj.class = "alert alert-danger";
				msj.innerHTML = 'El material "' + response.partNumber
					+ '" se encuentra dado de baja.';
			} else {
				msj.hidden = true;
			}
		}
	}
}