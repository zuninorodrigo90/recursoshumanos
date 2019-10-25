$(document).ajaxComplete(function() {
	$('[data-toggle="tooltip"]').tooltip();
})

$('#modalRemove').on('shown.bs.modal', function() {
	$('#myInput').focus();
})

$(document).ready(function() {
	$('[data-toggle="tooltip"]').tooltip();
	var id = document.getElementById('idCatalogo').value;
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
						document.getElementById('alertSuccess').hidden = true;
						var msj = document.getElementById('alertDanger');
						validateVigencia(response, msj);
						document.getElementById('btnGuardar').disabled = false;
						document.getElementById('idCatalogo').value = response.id;
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
								+ response.ncmConstable
						if (response.equivalente != null) {
							document.getElementById('idEquivalente').value = response.equivalente.id;
							findAlternativos(response.equivalente.id);
						} else {
							findAlternativos(null);
						}

					},
					error : function() {
						document.getElementById('btnGuardar').disabled = true;
						var msj = document.getElementById('alertDanger');
						document.getElementById('alertSuccess').hidden = true;
						msj.hidden = false;
						msj.innerHTML = "No se encontro el material correspondiente.";
						document.getElementById('idCatalogo').value = null;
						document.getElementById('designacion').innerHTML = "";
						document.getElementById('alternativos').hidden = true;
						document.getElementById('idEquivalente').value = null;
					}
				})
	}
}

function findMaterialAlt() {
	var partNumber = document.getElementById('partNumberAlt');
	var codeProducer = document.getElementById('producer2');
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
						var msj = document.getElementById('alertDanger');
						validateVigencia(response, msj);
						document.getElementById('btnGuardar').disabled = false;
						document.getElementById('idAlt').value = response.id;
						document.getElementById('designacionAlt').innerHTML = "Designación: "
								+ response.designacion
								+ "<br>"
								+ "Unidad de Medida: "
								+ response.measurementUnit.name
								+ "<br>"
								+ "NSN: "
								+ response.nsn
								+ "<br>"
								+ "NCM: "
								+ response.ncmConstable
						var modalBody = document.getElementById('modalBody');
						var tabla = '<table class="table table-bordered table-hover">'
								+ '<thead style="text-align: center; font-weight: bolder">'
								+ '<tr class="active">'
								+ '<td>Nro. de Parte</td>'
								+ '<td>Designación</td>'
								+ '<td>Fabricante</td>'
								+ '<td>Observación</td>'
								+ '</tr>'
								+ '</thead>'
								+ '<tbody style="font-size: 12px">';
						document.getElementById("observationHidden").hidden = false;
						if (response.equivalente != null) {
							$
									.ajax({
										type : "POST",
										url : "/sgl/materiales/findAlternativos/"
												+ response.equivalente.id,
										success : function(response) {
											modalBody.innerHTML = "";
											if (response.alternativos.length > 0) {
												var div = document
														.getElementById('divBtn')
												div.innerHTML = '<a id="btnVerAlternativos" class="glyphicon glyphicon-menu-hamburger"'
														+ 'style="font-size: 30px" tabindex="0" data-toggle="tooltip" title="Ver Alternativos" onclick="showModal()"></a>'
												for (var i = 0; i < response.alternativos.length; i++) {
													tabla += "<tr><td>"
															+ response.alternativos[i].partNumber
															+ "</td>"
															+ "<td>"
															+ response.alternativos[i].designation
															+ "</td>"
															+ "<td>"
															+ response.alternativos[i].producer
															+ "</td>"
															+ "<td>"
															+ response.alternativos[i].observation
															+ "</td>" + "</tr>";
												}
												tabla += '</tbody></table>'
												modalBody.innerHTML = tabla;
											} else {
												document
														.getElementById('divBtn').innerHTML = "";
											}
										}
									})
						} else {
							document.getElementById('divBtn').innerHTML = "";
						}

					},
					error : function() {
						document.getElementById('btnGuardar').disabled = true;
						var msj = document.getElementById('alertDanger');
						document.getElementById('alertSuccess').hidden = true;
						msj.hidden = false;
						msj.class = "alert alert-danger";
						msj.innerHTML = "No se encontro el material correspondiente.";
						document.getElementById('idAlt').value = null;
						document.getElementById('designacionAlt').innerHTML = "";
						document.getElementById('divBtn').innerHTML = "";
						document.getElementById("observation").value = "";
						document.getElementById("observationHidden").hidden = true;
					}
				})
	}

};

function findMaterialAlternativoOnBlur() {
	var partNumber = document.getElementById('partNumberAlt');
	var codeProducer = document.getElementById('producer2');
	if (partNumber.value != "" && codeProducer.value != "") {
		findMaterialAlt();
	}
}

function findMaterialOnBlur() {
	var partNumber = document.getElementById('partNumber');
	var codeProducer = document.getElementById('producer1');
	if (partNumber.value != "" && codeProducer.value != "") {
		findMaterial();
	}
}

function findAlternativos(idEquivalente) {
	if (idEquivalente != null) {
		$
				.ajax({
					type : "POST",
					url : "/sgl/materiales/findAlternativos/" + idEquivalente,
					success : function(response) {
						var tbody = document.getElementById('tbody');
						tbody.innerHTML = "";
						if (response.alternativos.length > 0) {
							document.getElementById('idEquivalente').value = idEquivalente;
							for (var i = 0; i < response.alternativos.length; i++) {
								var fila = i;
								fila += 1;
								var tr = "<tr>";
								if (response.alternativos[i].vigente) {
									tr += "<tr>";
								} else {
									tr += '<tr class="danger" data-toggle="tooltip" title="Material NO vigente">'
								}
								tr += "<td>"
										+ response.alternativos[i].partNumber
										+ "</td>"
										+ "<td>"
										+ response.alternativos[i].designation
										+ "</td>"
										+ "<td>"
										+ response.alternativos[i].producer
										+ "</td>"
										+ "<td>"
										+ response.alternativos[i].observation
										+ "</td>"
										+ "<td>"
										+ '<a onclick="confirmarEliminar('
										+ response.alternativos[i].id + "," + idEquivalente
										+ ')"data-toggle="tooltip" title="Quitar" class="glyphicon glyphicon-remove triggerRemove"></a>'
										+ "</td>" + "</tr>";
								tbody.innerHTML += tr;
							}
							document.getElementById('alternativos').hidden = false;
						} else {
							tbody.innerHTML = '<tr>No posee alternativos</tr>';
							document.getElementById('alternativos').hidden = false;
						}
					}
				})
	} else {
		tbody.innerHTML = '<tr>No posee alternativos</tr>';
		document.getElementById('alternativos').hidden = false;
	}
}

function confirmarGuardar() {
	var id = document.getElementById('idCatalogo').value;
	var idAlt = document.getElementById('idAlt').value;
	var observation = document.getElementById('observation').value;
	if (id == "" || idAlt == "" || observation == "") {
		var msj = document.getElementById('alertDanger');
		document.getElementById('alertSuccess').hidden = true;
		msj.hidden = false;
		msj.innerHTML = "Debe completar todos los campos.";
	} else {
		$("#modalDialog #btnAceptarDialog").attr("onclick",
				"guardar(" + id + "," + idAlt + ")");
		$("#modalDialog #titleModalDelete").html(
				"Guardar relacion de alternativos");
		$("#modalDialog #bodyDialog").html(
				"Se relacionarán ambos materiales. ¿Desea continuar?");
		$("#modalDialog").modal();
	}
}

function guardar(id, idAlt) {
	var observation = document.getElementById('observation').value;
	var alternativoJson = {
		"idMaterial" : id,
		"idMaterialAlt" : idAlt,
		"observation" : observation,
	}
	$
			.ajax({
				type : "POST",
				contentType : 'application/json; charset=utf-8',
				dataType : 'json',
				data : JSON.stringify(alternativoJson),
				url : "/sgl/materiales/alternativos/saveAlternativo",
				success : function(response) {
					if (response != null) {
						if (response == 0) {
							var msj = document.getElementById('alertDanger');
							document.getElementById('alertSuccess').hidden = true;
							msj.hidden = false;
							msj.class = "alert alert-danger";
							msj.innerHTML = "No se pueden relacionar ambos materiales porque son equivalentes.";
						} else {
							document.getElementById('idEquivalente').value = response;
							var msj = document.getElementById('alertSuccess');
							document.getElementById('alertDanger').hidden = true;
							msj.hidden = false;
							msj.innerHTML = "Relación realizada con éxito.";
							findAlternativos(document
									.getElementById('idEquivalente').value);
						}
					} else {
						var msj = document.getElementById('alertDanger');
						document.getElementById('alertSuccess').hidden = true;
						msj.hidden = false;
						msj.class = "alert alert-danger";
						msj.innerHTML = "Error al registrar la relación de alternativos.";
					}
					document.getElementById('idAlt').value = null;
					document.getElementById('designacionAlt').innerHTML = "";
					document.getElementById('partNumberAlt').value = null;
					document.getElementById('producer2').value = "";
					document.getElementById('divBtn').innerHTML = "";
					document.getElementById("observation").value = "";
					document.getElementById("observationHidden").hidden = true;
				}
			})
}

function showModal() {
	$("#modal").modal();
}

function confirmarEliminar(idAlternativo, idMaterial) {
	$("#modalDialog #btnAceptarDialog").attr("onclick",
			"eliminar(" + idAlternativo + "," + idMaterial + ")");
	$("#modalDialog #titleModalDelete").html(
			"Eliminar relación de alternativos");
	$("#modalDialog #bodyDialog").html(
			"¿Está seguro que desea eliminar la relación de alternativos?");
	$("#modalDialog").modal();
}

function eliminar(idAlternativo, idMaterial) {
	$("#modalDialog").modal();
	$
			.ajax({
				type : "POST",
				url : "/sgl/materiales/alternativos/deleteAlternativo/"
						+ idAlternativo + "/" + idMaterial,
				success : function(response) {
					if (response) {
						var msj = document.getElementById('alertSuccess');
						document.getElementById('alertDanger').hidden = true;
						msj.hidden = false;
						msj.class = "alert alert-success";
						msj.innerHTML = "Se eliminó la relación de alternativos con éxito.";
						findAlternativos(document
								.getElementById('idEquivalente').value);
					} else {
						var msj = document.getElementById('alertDanger');
						document.getElementById('alertSuccess').hidden = true;
						msj.hidden = false;
						msj.class = "alert alert-danger";
						msj.innerHTML = "Hubo un error al quitar la relación de alternativos.";
					}
				}
			})
}

function validateVigencia(response, msj) {
	document.getElementById('alertSuccess').hidden = true;
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
