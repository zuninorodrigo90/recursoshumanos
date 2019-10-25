$(document).ajaxComplete(function() {
	$('[data-toggle="tooltip"]').tooltip();
	var test = document.getElementById("btnVerSubitems");
})

$(document).ready(function() {
	$('[data-toggle="tooltip"]').tooltip();
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
	var partNumber = document.getElementById('partNumber').value;
	var producer = document.getElementById('producer').value;
	var designacion = document.getElementById('designacion').value;
	var onlyKits = document.getElementById('onlyKits').checked;
	var ban = false;
	if (partNumber == "" && producer == "" && designacion == "" && !onlyKits) {
		var tbody = document.getElementById('tbody');
		tbody.innerHTML = "";
		$("#modalWarning").modal();
		$(".divLoading").removeClass('show');
	} else {
		var catalogo = {
			"partNumber" : partNumber,
			"producer" : producer,
			"designacion" : designacion,
			"onlyKits" : onlyKits
		};
		if (page == undefined) {
			page = -1;
			ban = true;

		}
		$
			.ajax({
				type : "POST",
				contentType : 'application/json; charset=ISO-8859-1',
				dataType : 'json',
				url : "/sgl/materiales/consultarMaterialesPost/" + page,
				data : JSON.stringify(catalogo),
				success : function(response) {
					if (response.catalogo.length != 0) {
						if (ban) {
							totalPages = parseInt((response.cantTotal / 50) + 1);
							$('#page-selection').bootpag({
								maxVisible : 10,
								total : totalPages,
							}).on("page", function(event, page) {
								buscar(page - 1);
								$(this).bootpag({
									maxVisible : 10,
									total : totalPages
								});
							});
							ban = false;
						}
						document.getElementById('btnExportar').hidden = false;
						cargar(response);
					} else {
						var tbody = document.getElementById('tbody');
						var thead = document.getElementById('thead');
						thead.innerHTML = "<tr class="
							+ "active"
							+ ">"
							+ "<td>La consulta no devolvio ningun Material.</td></tr>";
						tbody.innerHTML = "";
						document.getElementById('page-selection').innerHTML = "";
						document.getElementById('btnExportar').hidden = true;
					}
				},
				complete : function() {
					$(".divLoading").removeClass('show');
				},
				error : function(response) {
					alert("error");
				}
			})
	}
}

function getTotal() {
	var total2Input = document.getElementById('cantidadTotal');
	var component = {
		"partNumber" : $('#partNumber').val(),
		"producer" : $('#producer').val(),
		"designation" : $('#designation').val(),
	}
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=ISO-8859-1',
		dataType : 'json',
		url : "/sgl/materiales/consultarMateriales/getTotal/",
		data : JSON.stringify(component),
		success : function(response) {
			total2Input.value = response;
		}
	});

}

function retornar(response) {
	return response;
}

function cargarModalDelete(id) {
	$("#modalRemove #removeBtn").attr("onclick", "eliminar(" + id + ")");
	$("#modalRemove").modal();
}

function eliminar(id) {
	$.ajax({
		type : "GET",
		url : "/sgl/materiales/consultarMateriales/eliminar/" + id,
		success : function(response) {
			cargar(response);
		}
	})
	$('#modalRemove').modal('hide');
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
	thead.innerHTML = "<tr class=" + "active" + ">" + "<td>Nro. de Parte</td>"
		+ "<td>Designacion</td>" + "<td>Fabricante</td>"
		+ "<td>Uni.Med.</td>" + "<td>Tipo</td>" + "<td>NSN</td>" + "<td>NCM</td>"
		+ "<td>Subitems</td>" + "<td>Equiv./Altern.</td>" + "<td>Vencimientos</td>"
		+ "<td>Accion</td> </tr>";
	tbody.innerHTML = "";
	$("#tbody").css({
		"font-size" : "10px"
	});
	for (var i = 0; i < response.catalogo.length; i++) {
		var tr = "";
		if (response.catalogo[i].vigente) {
			tr += "<tr>";
		} else {
			tr += '<tr class="danger" data-toggle="tooltip" title="Material NO vigente" onclick="selectRow(this)">'
		}
		tr += "<td>" + response.catalogo[i].partNumber + "</td>" + "<td>"
			+ response.catalogo[i].designacion + "</td>" + "<td>"
			+ response.catalogo[i].producer.code + " - "
			+ response.catalogo[i].producer.name + "</td>" + "<td>"
			+ response.catalogo[i].measurementUnit.name + "</td>" + "<td>";
		if (response.catalogo[i].materialType != null) {
			tr += response.catalogo[i].materialType.code + "</td>" + "<td>"
		} else
			tr += "</td>" + "<td>";
		tr += response.catalogo[i].nsn + "</td>" + "<td>"
			+ response.catalogo[i].ncmConstable + "</td>" + "<td>";
		if (response.catalogo[i].subItemsKit.length > 0) {
			tr += '<a id="btnVerSubitems" class="glyphicon glyphicon-list-alt"'
				+ 'style="font-size: 30px" tabindex="0" data-toggle="tooltip" title="Ver Subitems" onclick="showModal('
				+ response.catalogo[i].id + ')"></a>';
		}
		tr += "</td><td>";
		if (response.catalogo[i].equivalente != null) {
			tr += '<a id="btnVerSubitems" class="glyphicon glyphicon-menu-hamburger"'
				+ 'style="font-size: 30px" tabindex="0" data-toggle="tooltip" title="Ver Equivalentes y Alternativos" onclick="showModalRelacionados('
				+ response.catalogo[i].id + ')"></a>';
		}
		
		tr += "</td><td>";
		if (response.catalogo[i].lifeLimits.length != 0 || response.catalogo[i].mtbfs.length != 0 || response.catalogo[i].tbos.length != 0) {
			tr += '<a id="btnVerSubitems" class="glyphicon glyphicon-time"'
				+ 'style="font-size: 30px" tabindex="0" data-toggle="tooltip" title="Ver Limites de Vida" onclick="showModalLifeLimit('
				+ response.catalogo[i].id + ')"></a>';
		}
		tr += "</td>"
			+ '<td>'
			+ '<a data-toggle="tooltip" title="Modificar" class="glyphicon glyphicon-edit" href=materialIndividual/'
			+ response.catalogo[i].id
			+ '></a>'
			+ '<a data-toggle="tooltip" title="Eliminar" class="glyphicon glyphicon-remove triggerRemove" onclick="cargarModalDelete('
			+ response.catalogo[i].id + ')"></a>' + '</td>' + "</tr>";
		tbody.innerHTML += tr;
		getCellToMark();
	}
	;
}

function getCellToMark() {
	var all = document.getElementsByTagName("td");
	for (var i = 0; i < all.length; i++) {
		all[i].onclick = inputClickHandler;
	}
}

function inputClickHandler(e) {
	e = e || window.event;
	var tdElm = e.target || e.srcElement;
	if (tdElm.tagName == 'TD') {
		if (tdElm.style.backgroundColor == 'rgba(0, 55, 255, 0.4)') {
			tdElm.style.backgroundColor = '';
		} else {
			tdElm.style.backgroundColor = 'rgba(0, 55, 255, 0.4)';
		}
	}
}

function showModal(idCatalogo) {
	$
		.ajax({
			type : "POST",
			url : "/sgl/materiales/consultarMateriales/findCatalogo/"
				+ idCatalogo,
			success : function(response) {
				var bodyConjunto = document
					.getElementById('divBodyConjunto');
				document.getElementById('modalTitle').innerHTML = '<label>Subitems</label>';
				bodyConjunto.innerHTML = "";
				var tabla = '<table class="table table-bordered table-hover">'
					+ '<thead style="text-align: center; font-weight: bolder">'
					+ '<tr class="active">'
					+ '<td>Nro. de Parte</td>'
					+ '<td>Designacion</td>'
					+ '<td>Fabricante</td>'
					+ '<td>Cantidad</td>'
					+ '</tr>'
					+ '</thead>'
					+ '<tbody style="font-size: 12px">';
				var subItems = response.subItemsKit;
				for (var i = 0; i < subItems.length; i++) {
					var tr = "<tr><td>" + subItems[i].catalogo.partNumber
						+ "</td>" + "<td>"
						+ subItems[i].catalogo.designacion + "</td>"
						+ "<td>" + subItems[i].catalogo.producer.code
						+ " - " + subItems[i].catalogo.producer.name
						+ "</td>" + "<td>" + subItems[i].amount
						+ "</td>" + "<tr> ";
					tabla += tr;
				}
				tabla += '</tbody></table>'
				bodyConjunto.innerHTML = tabla;
				$("#modalConjunto").modal();
			}
		})
}

function showModalRelacionados(idCatalogo) {
	$
		.ajax({
			type : "POST",
			url : "/sgl/materiales/consultarMateriales/findRelacionados/"
				+ idCatalogo,
			success : function(response) {
				if (response != null) {
					var bodyConjunto = document
						.getElementById('divBodyConjunto');
					document.getElementById('modalTitle').innerHTML = '<label>Relacionados</label>';
					bodyConjunto.innerHTML = "";
					var tablaEquivalentes = '<label>Equivalentes</label><table class="table table-bordered table-hover">'
						+ '<thead style="text-align: center; font-weight: bolder">'
						+ '<tr class="active">'
						+ '<td>Nro. de Parte</td>'
						+ '<td>Designacion</td>'
						+ '<td>Fabricante</td>'
						+ '</tr>'
						+ '</thead>'
						+ '<tbody style="font-size: 12px">';
					var tablaAlternativos = '<label>Alternativos</label><table class="table table-bordered table-hover">'
						+ '<thead style="text-align: center; font-weight: bolder">'
						+ '<tr class="active">'
						+ '<td>Nro. de Parte</td>'
						+ '<td>Designacion</td>'
						+ '<td>Fabricante</td>'
						+ '<td>Condición</td>'
						+ '</tr>'
						+ '</thead>'
						+ '<tbody style="font-size: 12px">';
					var equivalentes = response.equivalenteView.catalogos;
					if (equivalentes.length > 0) {
						for (var i = 0; i < equivalentes.length; i++) {
							if (equivalentes[i].id != idCatalogo) {
								var tr = "<tr><td>"
									+ equivalentes[i].partNumber
									+ "</td>" + "<td>"
									+ equivalentes[i].designacion
									+ "</td>" + "<td>"
									+ equivalentes[i].producer
									+ "</td>" + "</tr>";
								tablaEquivalentes += tr;
							} else {
								if (equivalentes.length == 1) {
									tablaEquivalentes += '<td colspan="3">No posee equivalentes</td>';
								}
							}
						}
					} else {
						tablaEquivalentes += '<td colspan="3">No posee equivalentes</td>';
					}
					tablaEquivalentes += '</tbody></table>'
					var alternativos = response.alternativosView.alternativos;
					if (alternativos.length > 0) {
						for (var i = 0; i < alternativos.length; i++) {
							var tr = "<tr><td>"
								+ alternativos[i].partNumber + "</td>"
								+ "<td>" + alternativos[i].designation
								+ "</td>" + "<td>"
								+ alternativos[i].producer + "</td>"
								+ "<td>" + alternativos[i].observation
								+ "</td>" + "</tr>";
							tablaAlternativos += tr;
						}
					} else {
						tablaAlternativos += '<td colspan="4">No posee alternativos</td>';
					}
					tablaAlternativos += '</tbody></table>'
					bodyConjunto.innerHTML += tablaEquivalentes;
					bodyConjunto.innerHTML += tablaAlternativos;
					$("#modalConjunto").modal();
				}
			}
		})
}
function showModalLifeLimit(idCatalogo) {
	$
		.ajax({
			type : "POST",
			url : "/sgl/materiales/consultarMateriales/findCatalogo/"
				+ idCatalogo,
			success : function(response) {
				if (response != null) {
					var bodyConjunto = document
						.getElementById('divBodyConjunto');
					document.getElementById('modalTitle').innerHTML = '<label>Vida útil</label>';
					bodyConjunto.innerHTML = "";
					if (response.lifeLimits.length > 0) {
						var tablaAux = '<label>Limite de Vida</label><table class="table table-bordered table-hover">'
							+ '<thead style="text-align: center; font-weight: bolder">'
							+ '<tr class="active">'
							+ '<td>Nombre</td>'
							+ '<td>Descripción</td>'
							+ '<td>Cantidad</td>'
							+ '<td>Unidad</td>'
							+ '</tr>'
							+ '</thead>'
							+ '<tbody style="font-size: 12px">';
						for (var i = 0; i < response.lifeLimits.length; i++) {
							var tr = "<tr><td>"
								+ response.lifeLimits[i].name
								+ "</td>" + "<td>"
								+ response.lifeLimits[i].description
								+ "</td>" + "<td>"
								+ response.lifeLimits[i].amount
								+ "</td>" + "<td>"
								+ response.lifeLimits[i].lifeIntervalUnit.name
								+ "</td>" + "</tr>";
							tablaAux += tr;
						}
						tablaAux += '</tbody></table>';
						bodyConjunto.innerHTML += tablaAux;
					}

					if (response.tbos.length > 0) {
						tablaAux = '<label>Tiempo entre Overhaul</label><table class="table table-bordered table-hover">'
							+ '<thead style="text-align: center; font-weight: bolder">'
							+ '<tr class="active">'
							+ '<td>Nombre</td>'
							+ '<td>Descripción</td>'
							+ '<td>Cantidad</td>'
							+ '<td>Unidad</td>'
							+ '</tr>'
							+ '</thead>'
							+ '<tbody style="font-size: 12px">';
						for (var i = 0; i < response.tbos.length; i++) {
							var tr = "<tr><td>"
								+ response.tbos[i].name
								+ "</td>" + "<td>"
								+ response.tbos[i].description
								+ "</td>" + "<td>"
								+ response.tbos[i].amount
								+ "</td>" + "<td>"
								+ response.tbos[i].lifeIntervalUnit.name
								+ "</td>" + "</tr>";
							tablaAux += tr;
						}
						tablaAux += '</tbody></table>';

						bodyConjunto.innerHTML += tablaAux;
					}
					if (response.mtbfs.length > 0) {
						tablaAux = '<label>Tiempo medio entre fallas</label><table class="table table-bordered table-hover">'
							+ '<thead style="text-align: center; font-weight: bolder">'
							+ '<tr class="active">'
							+ '<td>Nombre</td>'
							+ '<td>Descripción</td>'
							+ '<td>Cantidad</td>'
							+ '<td>Unidad</td>'
							+ '</tr>'
							+ '</thead>'
							+ '<tbody style="font-size: 12px">';
						for (var i = 0; i < response.mtbfs.length; i++) {
							var tr = "<tr><td>"
								+ response.mtbfs[i].name
								+ "</td>" + "<td>"
								+ response.mtbfs[i].description
								+ "</td>" + "<td>"
								+ response.mtbfs[i].amount
								+ "</td>" + "<td>"
								+ response.mtbfs[i].lifeIntervalUnit.name
								+ "</td>" + "</tr>";
							tablaAux += tr;
						}
						tablaAux += '</tbody></table>';

						bodyConjunto.innerHTML += tablaAux;
					}

					$("#modalConjunto").modal();
				}
			}
		})
}

function selectRow(row) {
}