$(document).ajaxComplete(function() {
	$('[data-toggle="tooltip"]').tooltip();
})

$(document).ready(function() {
	$('[data-toggle="tooltip"]').tooltip();

	if (!document.execCommand('paste')) {
		document.getElementById('btnPegar').disabled = true;
	} else {
		document.getElementById('btnPegar').disabled = false;
	}
	$("button:submit").click(function() {
		return false;
	});
});

$(function() {
	$('[data-toggle="popover"]').popover()
})

$(document).ajaxComplete(function() {
	$('[data-toggle="popover"]').popover();
})

document.addEventListener("paste", function(e) {
	var pastedText = undefined;
	if (window.clipboardData && window.clipboardData.getData) { // IE
		pastedText = window.clipboardData.getData('Text');
	} else if (e.clipboardData && e.clipboardData.getData) {
		pastedText = e.clipboardData.getData('text/plain');
	}
	e.preventDefault();
	pasteItems(pastedText);
});

var total = 0;
var items = [];
var rowToEdit = null;
function findMaterialBtn() {
	var partNumber = document.getElementById('partNumber');
	var codeProducer = document.getElementById('producer');
	if (partNumber.value == "" && codeProducer.value == "") {
		var msj = document.getElementById('alertDanger');
		msj.hidden = false;
		msj.class = "alert alert-danger";
		msj.innerHTML = "Debe completar todos los campos.";
		document.getElementById('alertSuccess').hidden = true;
	} else {
		var catalogo = {
			"partNumber" : partNumber.value,
			"producer" : codeProducer.value
		}
		$
				.ajax({
					type : "POST",
					contentType : 'application/json; charset=utf-8',
					dataType : 'json',
					url : "/sgl/materiales/searchCatalogoByProducerAndPartNumber",
					data : JSON.stringify(catalogo),
					success : function(response) {
						if (response.vigente) {
							document.getElementById('btnDetalles').style = "display:inline-block;";
							document.getElementById('alertDanger').hidden = true;
							document.getElementById('catalogo.designacion').value = response.designacion;
							document.getElementById('lblMaterial').innerHTML = "Designación: "
									+ response.designacion
									+ "<br>"
									+ "Unidad de Medida: "
									+ response.measurementUnit.name
									+ "<br>"
									+ '<label id="nsn" style="font-weight: normal;" title="'
									+ response.nsn
									+ '">'
									+ "NSN: "
									+ response.nsn + "</label>";

							if (response.subItemsKit.length > 0) {
								loadSubitems(response.subItemsKit);
								document
										.getElementById('lblMaterialRelaciones').innerHTML = '<a id="btnSubitems" class="glyphicon glyphicon-menu-hamburger"'
										+ 'style="font-size: 30px" tabindex="0" data-toggle="tooltip" title="Ver Subitems" onclick="showModal()"></a>';
							}
							document.getElementById('catalogo.id').value = response.id;
						} else {
							if (response.equivalente != null) {
								loadEquivalentes(response.equivalente.id);
							} else {
								var msj = document
										.getElementById('alertDanger');
								msj.hidden = false;
								msj.class = "alert alert-danger";
								msj.innerHTML = "El material se encuentra dado de baja y no posee equivalentes ni alternativos. No podrá continuar.";
								document.getElementById('alertSuccess').hidden = true;
								document.getElementById('btnDetalles').style = "display:none";
							}
						}
					},
					error : function(response) {
						var msj = document.getElementById('alertDanger');
						msj.hidden = false;
						msj.class = "alert alert-danger";
						msj.innerHTML = "No se encontro el material ingresado.";
						document.getElementById('alertSuccess').hidden = true;
						document.getElementById('lblMaterial').innerHTML = "";
					}
				});
	}
}

function findMaterialOnBlur() {
	var partNumber = document.getElementById('partNumber');
	var codeProducer = document.getElementById('producer');
	if (partNumber.value != "" && codeProducer.value != "") {
		findMaterialBtn();
	}
}

function subtotal() {
	if (document.getElementById('price').value != ""
			&& document.getElementById('amount').value != "") {
		document.getElementById('lblSubtotal').innerHTML = document
				.getElementById('price').value
				* document.getElementById('amount').value;
	} else {
		document.getElementById('lblSubtotal').innerHTML = "";
	}
}

function addDetalle() {
	if (document.getElementById(document.getElementById('catalogo.id').value) == null) {
		if (!validateMaterial(document.getElementById('catalogo.id').value)) {
			var test = document.getElementById('nsn');
			document.getElementById('tbody').innerHTML += '<tr id="'
					+ document.getElementById('catalogo.id').value
					+ '"><td>'
					+ document.getElementById('partNumber').value
					+ '</td><td>'
					+ document.getElementById('catalogo.designacion').value
					+ '</td><td>'
					+ document.getElementById('producer').value
					+ '</td><td>'
					+ document.getElementById('nsn').title
					+ '</td><td  title="'
					+ document.getElementById('quality').value
					+ '">'
					+ document.getElementById('quality'
							+ document.getElementById('quality').value).label
					+ '</td><td>'
					+ document.getElementById('amount').value
					+ '</td><td>'
					+ document.getElementById('price').value
					+ '</td><td>'
					+ document.getElementById('priority.id').value
					+ '</td><td>'
					+ document.getElementById('observacion').value
					+ '</td><td><a data-toggle="tooltip" title="Eliminar" class="glyphicon glyphicon-remove triggerRemove" onclick="deleteRow(this)"></a></td></tr>';
			total += document.getElementById('price').value
					* document.getElementById('amount').value;
			document.getElementById('lblMontoTotal').innerHTML = " " + total;
			cleanDetalles();
			document.getElementById('alertSuccess').hidden = true;
			document.getElementById('alertDanger').hidden = true;
		}
	} else {
		$("#modalDialog #btnAceptarDialog")
				.attr("onclick", "sumarCantidades()");
		$("#modalDialog #btnCancelar").attr("onclick", "cleanDetalles()");
		$("#modalDialog #lblTitle").html("Material Repetido");
		$("#modalDialog #bodyDialog")
				.html(
						"El material ya se encuentra en los items de la solicitud, ¿Desea sumar las cantidades y actualizar el precio y la calidad del material?");
		$("#modalDialog").modal();
	}
}

function validateSolNecesidadMaterial() {
	var priority = document.forms["solicitudNecesidadMaterialForm"]["priority.id"].value;
	if (document.getElementById('sistemaArmas').value == ""
			|| document.getElementById('reference').value == ""
			|| document.getElementById('number').value == "") {

		var msj = document.getElementById('alertDanger');
		msj.hidden = false;
		msj.innerHTML = "Debe completar todos los campos.";
		document.getElementById('alertSuccess').hidden = true;
		return true;
	}
	return false;
}

function validateDetalles() {
	var table = document.getElementById("tableDetalles");
	if (table.rows.length == 1) {
		var msj = document.getElementById('alertDanger');
		msj.hidden = false;
		msj.innerHTML = " No se ingresaron materiales a la Solicitud.";
		document.getElementById('alertSuccess').hidden = true;
		return true;
	}
	return false;
}

function validateMaterial(idMaterial) {
	if (idMaterial == ""
			|| document.getElementById("idMaterial") == "undefinde") {
		var msj = document.getElementById('alertDanger');
		msj.hidden = false;
		msj.innerHTML = "No hay un material para agregar.";
		document.getElementById('alertSuccess').hidden = true;
		return true;
	}
	if (document.getElementById('quality').value == ""
			|| document.getElementById('amount').value == ""
			|| document.getElementById('price').value == ""
			|| document.getElementById('priority.id').value == "") {
		var msj = document.getElementById('alertDanger');
		msj.hidden = false;
		msj.innerHTML = "Debe completar todos los campos obligatorios antes de agregar el material.";
		document.getElementById('alertSuccess').hidden = true;
		return true;
	}
	return false;
}

function save() {
	if (!validateSolNecesidadMaterial() && !validateDetalles()) {
		// .push
		items = [];
		var table = document.getElementById("tableDetalles"), cells;
		for (var i = 1; i < table.rows.length; i++) {
			if (table.rows[i].title == "error") {
				$('#modalErrorDialog #divBodyDialog')
						.text(
								"No se puede enviar el requerimiento con items que poseean un error.");
				$('#modalErrorDialog').modal();
				return;
			}
			cells = table.rows[i].cells;
			var item = {
				"orden" : i,
				"catalogo" : {
					"id" : table.rows[i].id
				},
				"amount" : cells[5].innerText,
				"price" : cells[6].innerText,
				"quality" : {
					"id" : cells[4].title
				},
				"priority" : {
					"id" : cells[7].innerText,
				},
				"observation" : cells[8].innerText
			}
			items.push(item);
		}

		var requerimiento = {

			"reference" : document.getElementById('reference').value,
			"items" : items,
			"sistemaArmas" : {
				"id" : document.getElementById('sistemaArmas').value
			},
			"number" : document.getElementById('number').value
		};

		document.getElementById('alertDanger').hidden = true;
		var solicitud = {};
		$
				.ajax({
					type : "POST",
					contentType : 'application/json; charset=utf-8',
					dataType : 'json',
					url : "/sgl/requerimientos/generarRequerimiento/save",
					data : JSON.stringify(requerimiento),
					success : function(response) {
						if (response != "error") {
							document.getElementById('lblMontoTotal').innerHTML = " "
									+ total;
							cleanDetalles();
							cleanRequerimiento();
							document.getElementById('tbody').innerHTML = "";
							document.getElementById('lblMontoTotal').innerHTML = " 0";
							total = 0;
							var msj = document.getElementById('alertSuccess');
							msj.hidden = false;
							msj.innerHTML = "Requerimiento generado con el número "
									+ response + ".";
							document.getElementById('alertDanger').hidden = true;
						} else {
							var msj = document.getElementById('alertDanger');
							msj.hidden = false;
							msj.innerHTML = " Error al guardar el requerimiento.";
							document.getElementById('alertSuccess').hidden = true;
						}
					},
					error : function() {
						$('#modalErrorDialog #divBodyDialog')
								.text(
										"Ah ocurrido un error al enviar el requerimiento, intentelo nuevamente.");
						$('#modalErrorDialog').modal();
					}
				})

	}
}

function cleanDetalles() {
	document.getElementById('catalogo.id').value = "";
	document.getElementById('partNumber').value = "";
	document.getElementById('producer').value = "";
	document.getElementById('quality').value = "";
	document.getElementById('amount').value = "";
	document.getElementById('price').value = "";
	document.getElementById('lblMaterial').innerHTML = "";
	document.getElementById('lblSubtotal').innerHTML = "";
	document.getElementById('lblMaterialRelaciones').innerHTML = "";
	document.getElementById('priority.id').value = "";
	document.getElementById('observacion').value = "";
	document.getElementById('btnDetalles').style = "display:inline-block;";
}

function cleanRequerimiento() {
	document.getElementById('sistemaArmas').value = "";
	document.getElementById('reference').value = "";
	document.getElementById('idReqeurimiento').value = "";
	document.getElementById('number').value = "";
}

function loadDetalle(row) {
	var cell = row.parentNode.parentNode.cells;
	rowToEdit = row.parentNode.parentNode.id;
	document.getElementById('lblMontoTotal').innerHTML = " " + total;
	document.getElementById('catalogo.id').value = rowToEdit;
	document.getElementById('partNumber').value = cell[0].innerText;
	document.getElementById('producer').value = cell[2].innerText;
	document.getElementById('quality').value = cell[3].title;
	document.getElementById('amount').value = cell[4].innerText;
	document.getElementById('price').value = cell[5].innerText;
	findMaterialOnBlur();
	subtotal();
	$("#btnDetalles").attr("onclick", "editRow()");
	$("#btnDetalles").attr("class", "glyphicon glyphicon-ok-sign");
	$("#btnDetalles").attr("data-original-title", "Guardar Cambios");
	$("#btnDetalles").attr("style", 'text-align: cente; color:green');
}

function editRow() {
	var cell = document.getElementById(rowToEdit).cells;
	total = total - (parseInt(cell[4].innerText) * parseInt(cell[5].innerText));
	if (rowToEdit == document.getElementById('catalogo.id').value) {

		cell[3].title = document.getElementById('quality').value;
		cell[3].innerText = document.getElementById('quality'
				+ document.getElementById('quality').value).label;
		cell[4].innerText = document.getElementById('amount').value;
		cell[5].innerText = document.getElementById('price').value;
		total += parseInt(cell[4].innerText) * parseInt(cell[5].innerText);
		document.getElementById('lblMontoTotal').innerHTML = " " + total;
		rowToEdit = null;
	} else if (document
			.getElementById(document.getElementById('catalogo.id').value) == null) {
		document.getElementById(rowToEdit).id = document
				.getElementById('catalogo.id').value;
		cell[0].innerText = document.getElementById('partNumber').value;
		cell[1].innerText = document.getElementById('catalogo.designacion').value;
		cell[2].innerText = document.getElementById('producer').value;
		cell[4].title = document.getElementById('quality').value;
		cell[4].innerText = document.getElementById('quality'
				+ document.getElementById('quality').value).label;
		cell[5].innerText = document.getElementById('amount').value;
		cell[6].innerText = document.getElementById('price').value;
		cell[7].innerText = document.getElementById('priority.id').value;
		cell[8].innerText = document.getElementById('observacion').value;
		rowToEdit = null;
		total += parseInt(cell[4].innerText) * parseInt(cell[5].innerText);
		document.getElementById('lblMontoTotal').innerHTML = " " + total;
	} else {
		$("#modalDialog #btnAceptarDialog").attr("onclick",
				"sumarCantidades(true)");
		$("#modalDialog #btnCancelar").attr("onclick", "cleanDetalles()");
		$("#modalDialog #lblTitle").html("Material Repetido");
		$("#modalDialog #bodyDialog")
				.html(
						"El material ya se encuentra en los items de la solicitud, ¿Desea sumar las cantidades y actualizar el precio y la calidad del material, eliminando la fila editada?");
		$("#modalDialog").modal();
	}

	cleanDetalles();
	$("#btnDetalles").attr("onclick", "addDetalle()");
	$("#btnDetalles").attr("class", "glyphicon glyphicon-plus-sign");
	$("#btnDetalles").attr("data-original-title", "Agregar Material");
	$("#btnDetalles").attr("style", 'text-align: center');
}

function deleteRow(row) {
	var d = row.parentNode.parentNode.rowIndex;
	var cell = row.parentNode.parentNode.cells;
	total = total - (parseInt(cell[5].innerText) * parseInt(cell[6].innerText));
	document.getElementById('lblMontoTotal').innerHTML = " " + total;
	document.getElementById('tableDetalles').deleteRow(d);
	var table = document.getElementById("tableDetalles");
}

function sumarCantidades(deleteRow) {
	if (deleteRow) {
		var d = document.getElementById(rowToEdit).rowIndex;
		document.getElementById('tableDetalles').deleteRow(d);
		rowToEdit = null;
	}
	var cell = document
			.getElementById(document.getElementById('catalogo.id').value).cells;
	total = total - (parseInt(cell[5].innerText) * parseInt(cell[6].innerText));
	var suma = parseInt(cell[5].innerText)
			+ parseInt(document.getElementById('amount').value);
	cell[4].innerText = document.getElementById('quality'
			+ document.getElementById('quality').value).label;
	cell[5].innerText = suma;
	cell[6].innerText = document.getElementById('price').value;
	total += parseInt(cell[5].innerText) * parseInt(cell[6].innerText);
	document.getElementById('lblMontoTotal').innerHTML = " " + total;
	cleanDetalles();
}

function loadEquivalentes(idEquivalente) {
	var tabla = document.getElementById('tableEquivalentes');
	var tablaAlternativos = document.getElementById('tableAlternativos');
	$
			.ajax({
				type : "POST",
				url : "/sgl/equivalentes/findEquivalentes/" + idEquivalente,
				success : function(responseEq) {
					tabla.innerHTML = "";
					if (responseEq != "") {
						if (responseEq.catalogos.length > 0) {
							for (var i = 0; i < responseEq.catalogos.length; i++) {
								if (responseEq.catalogos[i].vigente) {
									tabla.innerHTML += '<tr onclick="loadMaterialEquivalente(this)" data-dismiss="modal"><td>'
											+ responseEq.catalogos[i].partNumber
											+ "</td>"
											+ "<td>"
											+ responseEq.catalogos[i].designacion
											+ "</td>"
											+ "<td>"
											+ responseEq.catalogos[i].producer
											+ "</td>" + "</tr>";
								}
							}
						} else {
							tabla.innerHTML += '<td>No posee equivalentes</td><td></td><td></td>';
						}

					}
				}
			})

	$
			.ajax({
				type : "POST",
				url : "/sgl/materiales/findAlternativos/" + idEquivalente,
				success : function(responseAlt) {
					tablaAlternativos.innerHTML = "";
					if (responseAlt != "") {
						if (responseAlt.alternativos.length > 0) {
							for (var i = 0; i < responseAlt.alternativos.length; i++) {
								if (responseAlt.alternativos[i]) {
									tablaAlternativos.innerHTML += '<tr onclick="loadMaterialEquivalente(this)" data-dismiss="modal"><td>'
											+ responseAlt.alternativos[i].partNumber
											+ "</td>"
											+ "<td>"
											+ responseAlt.alternativos[i].designation
											+ "</td>"
											+ "<td>"
											+ responseAlt.alternativos[i].producer
											+ "</td>"
											+ "<td>"
											+ responseAlt.alternativos[i].observation
											+ "</td>" + "</tr>";
								}
							}
						} else {
							tablaAlternativos.innerHTML += '<td>No posee alternativos</td><td></td><td></td><td></td>';
						}
					}
				}
			})
	$("#modalEquivalentes").modal();
	// } else {
	// document.getElementById('btnGuardar').disabled = true;
	// var msj = document.getElementById('alertDanger');
	// document.getElementById('alertSuccess').hidden = true;
	// msj.hidden = false;
	// msj.class = "alert alert-danger";
	// msj.innerHTML = "No se encontro el material correspondiente.";
	// document.getElementById('idEq').value = null;
	// document.getElementById('designacionEq').innerHTML = "";
	// document.getElementById('divBtn').innerHTML = "";
	// $("#modalEquivalentes").modal();
	// }
}

function loadMaterialEquivalente(item) {
	document.getElementById('catalogo.id').value = "";
	document.getElementById('partNumber').value = item.cells[0].innerText;
	document.getElementById('producer').value = item.cells[2].innerText.substr(
			0, item.cells[2].innerText.indexOf('-'));
	findMaterialBtn();
}
function loadSubitems(subItems) {
	var bodyConjunto = document.getElementById('divBodyConjunto');
	bodyConjunto.innerHTML = "";
	var tabla = '<table class="table table-bordered table-hover">'
			+ '<thead style="text-align: center; font-weight: bolder">'
			+ '<tr class="active">' + '<td>Nro. de Parte</td>'
			+ '<td>Designación</td>' + '<td>Fabricante</td>'
			+ '<td>Cantidad</td>' + '</tr>' + '</thead>'
			+ '<tbody style="font-size: 12px">';
	for (var i = 0; i < subItems.length; i++) {
		var tr = "<tr><td>" + subItems[i].catalogo.partNumber + "</td>"
				+ "<td>" + subItems[i].catalogo.designacion + "</td>" + "<td>"
				+ subItems[i].catalogo.producer.code + " - "
				+ subItems[i].catalogo.producer.name + "</td>" + "<td>"
				+ subItems[i].amount + "</td>" + "<tr> ";
		tabla += tr;
	}
	tabla += '</tbody></table>'
	bodyConjunto.innerHTML = tabla;
}

function showModal() {
	$("#modalConjunto").modal();
}

function loadListNumber(item) {
	document.getElementById('number').innerHTML = "";
	switch (item.value) {
	case "0":
		document.getElementById('number').innerHTML = '<option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option>';
		break;
	case "1":
		document.getElementById('number').innerHTML = '<option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option>';
		break;
	case "2":
		document.getElementById('number').innerHTML = '<option value="9">9</option>';
		break;
	default:
		// Sentencias_def ejecutadas cuando no ocurre una coincidencia con los
		// anteriores casos
		break;
	}
}

function pasteItems(pastedText) {
	if (document.getElementById('tbody').rows.length == 0) {
		if (document.execCommand('paste')) {
			pastedText = window.clipboardData.getData('Text');
		}
		document.getElementById('tbody').innerHTML = "";
		if (pastedText != undefined || pastedText != "") {
			$
					.ajax({
						type : "POST",
						contentType : 'application/json; charset=utf-8',
						dataType : 'json',
						url : "/sgl/requerimientos/generarRequerimiento/pegar",
						data : JSON.stringify(pastedText),
						success : function(response) {
							tbody.innerHTML = " ";
							if(response.length==0){
								$('#modalErrorDialog #divBodyDialog').text(
								"No se detectó ningún ítem en el texto pegado, es posible que los ítems no cumplan con el formato establecido. ");
								$('#modalErrorDialog').modal()
							}
							for (var i = 0; i < response.length; i++) {
								var tr = "<tr id='" + response[i].id + "'>";
								var filaBtn = '<td>'
										+ '<a data-toggle="tooltip" title="Eliminar" class="glyphicon glyphicon-remove triggerRemove" onclick="deleteRow(this)"></a>';
								if (response[i].error) {
									tr = '<tr class="danger" title="error" id="'
											+ response[i].id + '">';
									filaBtn += '<a style="color:#e49393" class="glyphicon glyphicon-alert triggerRemove" tabindex="0" role="button" data-toggle="popover" data-trigger="focus" title="Advertencia:" data-placement="left" data-content="'
											+ response[i].mensaje + '"></a>';
								}
								total += response[i].detalle.amount
										* response[i].detalle.price;
								tr += "<td>" + response[i].detalle.partNumber
										+ "</td>" + "<td>"
										+ response[i].detalle.designation
										+ "</td>" + "<td>"
										+ response[i].detalle.producer
										+ "</td>" + "<td>"
										+ response[i].detalle.nsn + "</td>"
										+ "<td title='"
										+ response[i].detalle.idQuality + "'>"
										+ response[i].detalle.qualityName
										+ "</td>" + "<td>"
										+ response[i].detalle.amount + "</td>"
										+ "<td>" + response[i].detalle.price
										+ "</td>" + "<td>"
										+ response[i].detalle.priority
										+ "</td>" + "<td>"
										+ response[i].detalle.observation
										+ "</td>" + filaBtn + '</td></tr>';
								document.getElementById('tbody').innerHTML += tr;
								document.getElementById('lblMontoTotal').innerHTML = " "
										+ total;
							}
						},
						error : function() {
							$('#modalErrorDialog #divBodyDialog').text(
							"Error al intentar pegar los ítems del requerimiento.");
							$('#modalErrorDialog').modal()
						}
					})
		}
	} else {
		$('#modalErrorDialog #divBodyDialog').text(
				"Solo puede pegar items cuando la lista esta vacía.");
		$('#modalErrorDialog').modal()
	}
}
