$(document).ajaxComplete(function() {
	$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="popover"]').popover();
	var test = document.getElementById("btnVerSubitems");
})

$(document).ready(
		function() {
			$.datepicker.regional.es = {
				closeText : "Cerrar",
				prevText : "Ant.",
				nextText : "Sig.",
				currentText : "Hoy",
				monthNames : [ "enero", "febrero", "marzo", "abril", "mayo",
						"junio", "julio", "agosto", "septiembre", "octubre",
						"noviembre", "diciembre" ],
				monthNamesShort : [ "ene", "feb", "mar", "abr", "may", "jun",
						"jul", "ago", "sep", "oct", "nov", "dic" ],
				dayNames : [ "domingo", "lunes", "martes", "miércoles",
						"jueves", "viernes", "sábado" ],
				dayNamesShort : [ "dom", "lun", "mar", "mié", "jue", "vie",
						"sáb" ],
				dayNamesMin : [ "D", "L", "M", "X", "J", "V", "S" ],
				weekHeader : "Sm",
				dateFormat : "dd/mm/yy",
				firstDay : 1,
				isRTL : false,
				showMonthAfterYear : false,
				yearSuffix : ""
			};
			$.datepicker.setDefaults($.datepicker.regional['es']);

			$("#dateFrom").datepicker();
			$("#dateUntil").datepicker();
			$('[data-toggle="tooltip"]').tooltip();
			$('[data-toggle="popover"]').popover();
			$(window).keydown(function(event) {
				if (event.keyCode == 13) {
					event.preventDefault();
					return false;
				}
			});
		});

var ban = true;
function buscar(page) {
	$(".divLoading").addClass('show');
	var requerimientoView = {
		"idState" : $('#idState').val(),
		"destination" : $('#destination').val(),
		"number" : $('#number').val(),
		"dateFrom" : $('#dateFrom').val(),
		"dateUntil" : $('#dateUntil').val(),
		"partNumber" : $('#partNumber').val(),
		"producer" : $('#producer').val()
	}

	var ban = false;
	if (page == undefined) {
		page = -1;
		ban = true;

	}
	$
			.ajax({
				type : "POST",
				contentType : 'application/json; charset=utf-8',
				dataType : 'json',
				url : "/sgl/requerimientos/consultarRequerimientoPost/" + page,
				data : JSON.stringify(requerimientoView),
				success : function(response) {
					if (response.requerimientos.length != 0) {
						if (ban) {
							totalPages = parseInt((response.cantTotal / 50) + 1);
							$('#page-selection').bootpag({
								maxVisible : 10,
								total : totalPages
							}).on("page", function(event, page) {
								buscar(page - 1);
								$(this).bootpag({
									maxVisible : 10,
									total : totalPages
								});
							});
							ban = false;
						}
						cargar(response);
					} else {
						var tbody = document.getElementById('tbody');
						var thead = document.getElementById('thead');
						thead.innerHTML = "<tr class="
								+ "active"
								+ ">"
								+ "<td>La consulta no devolvio ningun requerimiento.</td></tr>";
						tbody.innerHTML = "";
						document.getElementById('page-selection').innerHTML = "";
					}
				},
				error : function(response) {
					alert("Error");
				},
				complete : function() {
					$(".divLoading").removeClass('show');
				}
			})
}

function cargar(response) {
	var ban = true;

	$("#tableCreada").css({
		"background-color" : "rgba(255, 255, 255, 0.68)"
	});
	var tbody = document.getElementById('tbody');
	var thead = document.getElementById('thead');
	$("#thead").css({
		"text-align" : "center",
		"font-weight" : "bolder"
	});
	thead.innerHTML = "<tr class="
			+ "active"
			+ ">"
			+ "<td>Nro. de Req.</td>"
			+ "<td>Fecha generacion</td>"
			+ "<td>SA</td>"
			+ "<td>Destino</td>"
			+ "<td>Imputación</td>"
			+ "<td>Importe total</td>"
			+ "<td>Generador</td>"
			+ "<td>Doc. Ref.</td>"
			+ "<td>Items</td>"
			+ '<td>Estado <label style="font-size: 10px">(click para ver historial)</label></td>'
			+ "<td>Accion</td>";
	tbody.innerHTML = "";
	$("#tbody").css({
		"font-size" : "11px"
	});
	for (var i = 0; i < response.requerimientos.length; i++) {
		var tr = "";
		tr += "<td>"
				+ response.requerimientos[i].number
				+ "</td>"
				+ "<td>"
				+ dateFormatter(new Date(response.requerimientos[i].date))
				+ "</td>"
				+ "<td>"
				+ response.requerimientos[i].sistemaArmas.code
				+ " - "
				+ response.requerimientos[i].sistemaArmas.description
				+ "</td>"
				+ "<td>"
				+ ((response.requerimientos[i].user.name).substring(0, 4))
						.toUpperCase() + "</td>";
		if (response.requerimientos[i].imputation != null) {
			tr += "<td>" + response.requerimientos[i].imputation.name + "</td>";
		} else {
			tr += "<td>" + '-' + "</td>";
		}

		tr += "<td>" + 'U$S ' + response.requerimientos[i].totalPrice + "</td>"
				+ "<td>" + response.requerimientos[i].user.name + "</td>"
				+ "<td>" + response.requerimientos[i].reference + "</td>"
				+ "<td>";

		tr += '<a id="btnVerItems" class="glyphicon glyphicon-menu-hamburger"'
				+ 'style="font-size: 30px" tabindex="0" data-toggle="tooltip" title="Ver items" onclick="showModal('
				+ response.requerimientos[i].id + ')"></a>';
		tr += '<td><a  onclick="showModalHistorial('
				+ response.requerimientos[i].id
				+ ')"  data-toggle="tooltip" title="Ver historial" >'
				+ response.requerimientos[i].state.description + ' </a></td>';
		var pendiente = 1;
		var autorizado = 2;
		var cancelado = 3;
		var rechazado = 4;
		var enviadoFadea = 5;
		var enviadoJema = 6;
		var ordenCompra = 7;
		var comprado = 8;
		var entregado = 9;
		var recibido = 10;
		var ordenCompraParcial = 11;
		var compradoParcial = 12;
		var entregadoParcial = 13;
		var recibidoParcial = 14;
		var anulado = 15;
		var enviadoArce = 16;
		var enviadoFms = 17;
		
		tr += '<td>';
		if (response.requerimientos[i].state.id != pendiente
				&& response.requerimientos[i].state.id != cancelado
				&& response.requerimientos[i].state.id != rechazado
				&& response.requerimientos[i].state.id != comprado
				&& response.requerimientos[i].state.id != entregado
				&& response.requerimientos[i].state.id != recibido
				&& response.requerimientos[i].state.id != compradoParcial
				&& response.requerimientos[i].state.id != entregadoParcial
				&& response.requerimientos[i].state.id != recibidoParcial
				&& response.requerimientos[i].state.id != anulado) {
			var principalUserName = document.getElementById('principalUserName').textContent;
			var coanVar = principalUserName.substring(0, 4);
			if (coanVar == 'coan') {
				tr += '<a data-toggle="tooltip"  style="font-size: 30px" title="Anular" class="glyphicon glyphicon-minus-sign" onclick="loadModalAnularRequermiento('
					+ response.requerimientos[i].id + ')"></a>'	
			}
		} else {
			if (response.requerimientos[i].state.id == pendiente) {
				tr += '<a data-toggle="tooltip" style="font-size: 30px" title="Cancelar" class="glyphicon glyphicon-remove-sign" onclick="loadModalCancelRequermiento('
						+ response.requerimientos[i].id + ')"></a>'

			}
		}
		if (response.requerimientos[i].state.id != pendiente
				&& response.requerimientos[i].state.id != cancelado
				&& response.requerimientos[i].state.id != rechazado
				&& response.requerimientos[i].state.id != anulado) {
			tr += '<a data-toggle="tooltip" href="/sgl/requerimientos/exportRequerimiento/'
					+ response.requerimientos[i].id
					+ '" style="font-size: 30px" title="Exportar a PDF (formato ARA)" class="glyphicon glyphicon-download"></a>'

		}
		if (response.requerimientos[i].state.id == enviadoJema) {
			tr += '<a data-toggle="tooltip" href="/sgl/requerimientos/exportRequerimientoFms/'
					+ response.requerimientos[i].id
					+ '" style="font-size: 30px" title="Exportar a PDF (formato FMS)" class="glyphicon glyphicon-download"></a>'
		}
		if (response.requerimientos[i].state.id == rechazado) {
			tr += '<a class="glyphicon glyphicon-info-sign" style="font-size: 30px ; color: #e49393 ; text-align:center" tabindex="1" role="button" data-toggle="popover" data-trigger="focus" title="Motivo Rechazo:" data-placement="left" data-content="'
				+ response.requerimientos[i].motivoRechazo + '"></a>'
		}
		tr += '</td></tr>';

		tbody.innerHTML += tr;
	}
}

function showModal(idRequerimiento) {
	$.ajax({
		type : "POST",
		url : "/sgl/requerimientos/consultarRequerimiento/" + idRequerimiento,
		success : function(response) {
			var body = document.getElementById('bodyDetalle');
			body.innerHTML = "";
			var tabla = '<table class="table table-bordered table-hover">'
					+ '<thead style="text-align: center; font-weight: bolder">'
					+ '<tr class= "active"><td>Item</td><td>Nro. de Parte</td>'
					+ '<td>Designacion</td>' + '<td>Fabricante</td>'
					+ '<td>NSN</td>' + '<td>Uni.Med.</td>' + '<td>Cant.</td>'
					+ '<td>Calidad</td>' + '<td>Prioridad</td>'
					+ '<td>Precio</td>' + '<td>Observ.</td>'
					+ '<td>Estado </td>' + '</tr>' + '</thead>'
					+ '<tbody style="font-size: 12px">';
			var detalle = response.items;
			for (var i = 0; i < detalle.length; i++) {
				var tr = "<tr><td>" + detalle[i].orden + "</td>"
						+ "<td>" + detalle[i].catalogo.partNumber + "</td>"
						+ "<td>" + detalle[i].catalogo.designacion + "</td>"
						+ "<td>" + detalle[i].catalogo.producer.code + " - "
						+ detalle[i].catalogo.producer.name + "</td>" + "<td>"
						+ detalle[i].catalogo.nsn + "</td>" + "<td>"
						+ detalle[i].catalogo.measurementUnit.code + "</td>"
						+ "<td>" + detalle[i].amount + "</td>" + "<td>"
						+ detalle[i].quality.name + "</td>" + "<td>"
						+ detalle[i].priority.name + "</td>" + "<td>" + 'U$S '
						+ detalle[i].price + "</td>" + "<td>"
						+ detalle[i].observation + "</td>" + "<td>"
						+ detalle[i].state.description + "</td>" + "<tr> ";
				tabla += tr;
			}
			tabla += '</tbody></table>'
			body.innerHTML = tabla;
			$("#modalDetalle").modal();
		}
	})
}

function dateFormatter(date) {
	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
	var hour = date.getHours();
	var minutes = date.getMinutes();
	if (day < 10) {
		day = '0' + day;
	}
	if (month < 10) {
		month = '0' + month;
	}
	if (hour < 10) {
		hour = '0' + hour;
	}
	if (minutes < 10) {
		minutes = '0' + minutes;
	}
	return day + '/' + month + '/' + year + ' ' + hour + ':' + minutes;
}

function loadModalCancelRequermiento(idRequerimiento) {
	var bodyConfirmation = document.getElementById('bodyConfirmation');
	var titleConfirmation = document.getElementById('titleConfirmation');
	var btnAceptarConfirmation = document
			.getElementById('btnAceptarConfirmation');
	titleConfirmation.innerHTML = 'Confirmacion';
	bodyConfirmation.innerHTML = '¿Esta seguro que desea cancelar el requerimiento?';
	$("#modalConfirmation").modal();
	btnAceptarConfirmation.onclick = function() {
		cancelRequerimiento(idRequerimiento);
	}
}

function cancelRequerimiento(idRequerimiento) {
	var bodyInformation = document.getElementById('bodyInformation');
	var titleInformation = document.getElementById('titleInformation');
	var btnCerrarInformation = document.getElementById('btnCerrarInformation');
	$
			.ajax({
				type : "POST",
				url : "/sgl/requerimientos/cancelRequerimiento/" + idRequerimiento,
				success : function(response) {
					switch (response) {
					case 1: // exitoso
						titleInformation.innerHTML = 'Cancelado correctamente';
						bodyInformation.innerHTML = 'El requerimiento se ha cancelado correctamente';
						$("#modalInformation").modal();
						btnCerrarInformation.onclick = function() {
							location.reload();
						}
						break;
					case 0: // no se puede cancelar
						titleInformation.innerHTML = 'No se puede cancelar';
						bodyInformation.innerHTML = 'El requerimiento no se puede cancelar porque ya se encuentra procesado';
						$("#modalConfirmation").modal('hide');
						$("#modalInformation").modal();
						break;
					case -1: // error
						titleInformation.innerHTML = 'Error';
						bodyInformation.innerHTML = 'Ha ocurrido un error';
						$("#modalInformation").modal();
						break;
					}
				}
			})
}

function loadModalAnularRequermiento(idRequerimiento) {
	var bodyConfirmation = document.getElementById('bodyConfirmation');
	var titleConfirmation = document.getElementById('titleConfirmation');
	var btnAceptarConfirmation = document
			.getElementById('btnAceptarConfirmation');
	titleConfirmation.innerHTML = 'Confirmacion';
	bodyConfirmation.innerHTML = '¿Esta seguro que desea anular el requerimiento?';
	$("#modalConfirmation").modal();
	btnAceptarConfirmation.onclick = function() {
		anularRequerimiento(idRequerimiento);
	}
}

function anularRequerimiento(idRequerimiento) {
	var bodyInformation = document.getElementById('bodyInformation');
	var titleInformation = document.getElementById('titleInformation');
	var btnCerrarInformation = document.getElementById('btnCerrarInformation');
	$
			.ajax({
				type : "POST",
				url : "/sgl/requerimientos/anularRequerimiento/" + idRequerimiento,
				success : function(response) {
					switch (response) {
					case 1: // exitoso
						titleInformation.innerHTML = 'Anulado correctamente';
						bodyInformation.innerHTML = 'El requerimiento se ha anulado correctamente';
						$("#modalInformation").modal();
						btnCerrarInformation.onclick = function() {
							location.reload();
						}
						break;
					case 0: // no se puede anular
						titleInformation.innerHTML = 'No se puede anular';
						bodyInformation.innerHTML = 'El requerimiento no se puede anular porque ya se encuentra procesado';
						$("#modalConfirmation").modal('hide');
						$("#modalInformation").modal();
						break;
					case -1: // error
						titleInformation.innerHTML = 'Error';
						bodyInformation.innerHTML = 'Ha ocurrido un error';
						$("#modalInformation").modal();
						break;
					}
				}
			})
}

function showModalHistorial(idRequerimiento) {
	var bodyInformation = document.getElementById('bodyInformation');
	var titleInformation = document.getElementById('titleInformation');
	var btnCerrarInformation = document.getElementById('btnCerrarInformation');
	titleInformation.innerHTML = 'Historial requerimiento';
	$
			.ajax({
				type : "POST",
				url : "/sgl/requerimientos/consultarRequerimientos/searchHistorial/"
						+ idRequerimiento,
				success : function(response) {
					bodyInformation.innerHTML = "";
					var tabla = '<table class="table table-bordered table-hover">'
							+ '<thead style="text-align: center; font-weight: bolder">'
							+ '<tr class= "active"><td>Estado</td>'
							+ '<td>Usuario</td>'
							+ '<td>Fecha</td>'
							+ '</tr>'
							+ '</thead>' + '<tbody style="font-size: 12px">';
					for (var i = 0; i < response.length; i++) {
						var tr = "<tr><td>" + response[i].state.description
								+ "</td>" + "<td>" + response[i].user.name
								+ "</td>" + "<td>"
								+ dateFormatter(new Date(response[i].date))
								+ "</td>" + "<tr> ";
						tabla += tr;
					}
					tabla += '</tbody></table>'
					bodyInformation.innerHTML = tabla;
					$("#modalInformation").modal();
				}
			})
}
