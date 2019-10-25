$('[data-toggle="tooltip"]').tooltip();

$(document).ajaxComplete(function() {
	$('[data-toggle="tooltip"]').tooltip();
})

$(document).ready(function() {

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
	var component = {
		"idSistemaArmas" : $('#sistemaArmas').val(),
		"syco" : $('#syco').val(),
		"partNumber" : $('#partNumber').val(),
		"producer" : $('#producer').val(),
		"designation" : $('#designation').val(),
		"nroFigura" : $('#nroFigura').val(),
		"order" : $('#order').val()
	}
	var sistArmas = document.getElementById('sistemaArmas').value;
	var syco = document.getElementById('syco').value;
	var partNumber = document.getElementById('partNumber').value;
	var producer = document.getElementById('producer').value;
	var designation = document.getElementById('designation').value;
	var nroFigura = document.getElementById('nroFigura').value;
	var order= document.getElementById('order').value;

	if (sistArmas == "" && syco == "" && partNumber == "" && producer == ""
			&& designation == "" && nroFigura == "" && order == "") {
		var tbody = document.getElementById('tbody');
		tbody.innerHTML = "";
		$("#modalWarning").modal();
		$(".divLoading").removeClass('show');
	} else {
		if (page == undefined) {
			page = -1;
			ban = true;

		}
		$
				.ajax({
					type : "POST",
					contentType : 'application/json; charset=utf-8',
					dataType : 'json',
					url : "/sgl/catalogacion/consultarSistemasCodificadosPost/" + page,
					data : JSON.stringify(component),
					success : function(response) {
						if (response.components.length != 0) {
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
									+ "<td>La consulta no devolvio ningun sistema.</td></tr>";
							tbody.innerHTML = "";
							document.getElementById('page-selection').innerHTML = "";
							document.getElementById('btnExportar').hidden = true;
						}
					},
					complete: function(){
						$(".divLoading").removeClass('show');
				      }
				})
	}
}

function getTotal() {
	var total2Input = document.getElementById('cantidadTotal');
	var component = {
		"idSistemaArmas" : $('#sistemaArmas').val(),
		"syco" : $('#syco').val(),
		"partNumber" : $('#partNumber').val(),
		"producer" : $('#producer').val(),
		"designation" : $('#designation').val(),
		"nroFigura" : $('#nroFigura').val()
	}
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=utf-8',
		dataType : 'json',
		url : "/sgl/catalogacion/consultarSistemasCodificados/getTotal/",
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
		url : "/sgl/catalogacion/consultarSistemasCodificados/eliminar/" + id,
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
	thead.innerHTML = "<tr class=" + "active" + ">" + "<td>Sist. Armas</td>"
			+ "<td>SYCO/NRO. DOC.</td>" + "<td>Nro. Figura</td>"
			+ "<td>Nro. Orden</td>" + "<td>Nro. de Parte</td>"
			+ "<td>Designacion</td>" + "<td>Fabricante</td>" + "<td>Cant.</td>"
			+ "<td>Uni.Med.</td>" + "<td>Usable on Code</td>"
			+ "<td>SM R Code</td>" + "<td>NSN</td>" + "<td>NCM</td>"
			+ "<td>Conjunto</td>" + "<td>Accion</td> </tr>";
	tbody.innerHTML = "";
	$("#tbody").css({
		"font-size" : "10px"
	});
	for (var i = 0; i < response.components.length; i++) {
		var fila = i;
		fila += 1;
		var tr = "<tr>";
		tr += "<td>" + response.components[i].sistemaArmas.description
				+ "</td>" + "<td>" + response.components[i].identifier
				+ "</td>" + "<td>" + response.components[i].figureNumber
				+ "</td>" + "<td>" + response.components[i].orden + "</td>"
				+ "<td>" + response.components[i].catalogo.partNumber + "</td>"
				+ "<td>" + response.components[i].catalogo.designacion
				+ "</td>" + "<td>"
				+ response.components[i].catalogo.producer.code + " - "
				+ response.components[i].catalogo.producer.name + "</td>"
				+ "<td>" + response.components[i].amount + "</td>" + "<td>"
				+ response.components[i].catalogo.measurementUnit.name
				+ "</td>" + "<td>" + response.components[i].usableOnCode
				+ "</td>" + "<td>" + response.components[i].smrCode + "</td>"
				+ "<td>" + response.components[i].catalogo.nsn + "</td>"
				+ "<td>" + response.components[i].catalogo.ncmConstable
				+ "</td>" + "<td>";
		if (response.components[i].identifier != ""
				&& response.components[i].figureNumber != ""
				&& response.components[i].orden != "") {
			tr += '<a id="btnVerEquivalentes" class="glyphicon glyphicon-menu-hamburger"'
					+ 'style="font-size: 30px" tabindex="0" data-toggle="tooltip" title="Ver Conjunto" onclick="showModal('
					+ response.components[i].id + ')"></a>';
		}
		tr += "</td>"
				+ '<td>'
				+ '<a data-toggle="tooltip" title="Modificar" class="glyphicon glyphicon-edit" href=sistemasCodificadosIndividual/'
				+ response.components[i].id
				+ '></a>'
				+ '<a data-toggle="tooltip" title="Eliminar" class="glyphicon glyphicon-remove triggerRemove" onclick="cargarModalDelete('
				+ response.components[i].id + ')"></a>' + '</td>' + "</tr>";
		tbody.innerHTML += tr;
		document.getElementById('btnExportar').hidden = false;
		getCellToMark();
		
	}
	;
}

function getCellToMark() {
	 var all = document.getElementsByTagName("td");
     for (var i=0;i<all.length;i++) {
         all[i].onclick = inputClickHandler;       
     }
}

function inputClickHandler(e){
    e = e||window.event;
    var tdElm = e.target||e.srcElement;
    if (tdElm.tagName == 'TD') {
    	if(tdElm.style.backgroundColor == 'rgba(0, 55, 255, 0.4)'){
            tdElm.style.backgroundColor = '';
        } else {
            tdElm.style.backgroundColor = 'rgba(0, 55, 255, 0.4)';
        }	
    }
}

function exportar() {
	var component = {
		"idSistemaArmas" : $('#sistemaArmas').val(),
		"syco" : $('#syco').val(),
		"partNumber" : $('#partNumber').val(),
		"producer" : $('#producer').val(),
		"designation" : $('#designation').val(),
		"nroFigura" : $('#nroFigura').val()
	}

	var sistArmas = document.getElementById('sistemaArmas').value;
	var syco = document.getElementById('syco').value;
	var partNumber = document.getElementById('partNumber').value;
	var producer = document.getElementById('producer').value;
	var designation = document.getElementById('designation').value;
	var nroFigura = document.getElementById('nroFigura').value;

	// if (sistArmas == "" && syco == "" && partNumber == "" && producer == ""
	// && designation == "" && nroFigura == "") {
	// var tbody = document.getElementById('tbody');
	// tbody.innerHTML = "";
	// $("#modalWarning").modal();
	// } else {
	// $.ajax({
	// type : "POST",
	// contentType : 'application/json; charset=utf-8',
	// dataType : 'json',
	// url : "/sgl/consultarSistemasCodificados/",
	// data : JSON.stringify(component),
	// })
	// $("#modalExcel").modal();
	// }
}

function showModal(idComponente) {
	$
			.ajax({
				type : "POST",
				url : "/sgl/catalogacion/consultarSistemasCodificados/findConjunto/"
						+ idComponente,
				success : function(response) {
					var bodyConjunto = document
							.getElementById('divBodyConjunto');
					bodyConjunto.innerHTML = "";
					var tabla = '<table class="table table-bordered table-hover">'
							+ '<thead style="text-align: center; font-weight: bolder">'
							+ '<tr class="active">'
							+ '<td>Nro. de Parte</td>'
							+ '<td>Designacion</td>'
							+ '<td>Fabricante</td>'
							+ '</tr>'
							+ '</thead>'
							+ '<tbody style="font-size: 12px">';
					if (response.length != 0) {
						for (var i = 0; i < response.length; i++) {
							var tr = "<tr><td>" + response[i].partNumber
									+ "</td>" + "<td>"
									+ response[i].designacion + "</td>"
									+ "<td>" + response[i].producer.code
									+ " - " + response[i].producer.name
									+ "</td>" + "<tr> ";
							tabla += tr;
						}
						tabla += '</tbody></table>'
						bodyConjunto.innerHTML = tabla;

					} else {
						bodyConjunto.innerHTML = "El material no pertenece a ningún conjunto."
					}
					$("#modalConjunto").modal();
				}

			})

}
