/**
 * 
 */

$(document).ajaxComplete(function() {
	$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="popover"]').popover();
})

$('#modalRemove').on('shown.bs.modal', function() {
	$('#myInput').focus();
})

$(document).ready(function() {
	$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="popover"]').popover();
	if (!document.execCommand('paste')) {
		document.getElementById('btnPegar').disabled = true;
	} else {
		document.getElementById('btnPegar').disabled = false;
	}
});

document.addEventListener("paste", function(e) {
	var pastedText = undefined;
	if (window.clipboardData && window.clipboardData.getData) { // IE
		pastedText = window.clipboardData.getData('Text');
	} else if (e.clipboardData && e.clipboardData.getData) {
		pastedText = e.clipboardData.getData('text/plain');
	}
	e.preventDefault();
	pegar(pastedText);
});

function pegar(pastedText) {
	document.getElementById('tbody').innerHTML = "";
	document.getElementById('thead').innerHTML = "";
	if (document.execCommand('paste')) {
		pastedText = window.clipboardData.getData('Text');
	}
	if (pastedText != undefined || pastedText !="") {
		$
				.ajax({
					type : "POST",
					contentType : 'application/json; charset=utf-8',
					dataType : 'json',
					url : "/sgl/equivalentes/equivalenteMasivo/pegar",
					data : JSON.stringify(pastedText),
					success : function(response) {
						var ban = true;
						var btnGuardar = document.getElementById('btnGuardar');
						btnGuardar.disabled = false;
						var tbody = document.getElementById('tbody');
						tbody.innerHTML = "";
						var max = 0
						for (var i = 0; i < response.length; i++) {
							var fila = i;
							fila += 1;
							var tr = "<tr>";
							if (response[i].materialesEquivalentes.length > max) {
								max = response[i].materialesEquivalentes.length;
							}
							if (response[i].error) {
								tr = '<tr class="danger"> <td>' + fila
										+ '</td>';
								tr += '<td style="text-align:center"> <a class="glyphicon glyphicon-alert" style="font-size: 30px ; color: #e49393 ; text-align:center" tabindex="0" role="button" data-toggle="popover" data-trigger="focus" title="Error:" data-content="Error en alguno de los materiales cargados. ';
								if (response[i].warning) {
									tr += 'Esta fila es una combinacíon de dos o mas filas del Excel.';
								}
								tr += '"></a> </td>';
								if (ban) {
									ban = false;
									$("#modalRemove").modal();
									btnGuardar.disabled = true;
								}
							} else if (response[i].materialesEquivalentes.length == 1) {
								tr = '<tr class="warning"> <td>'
										+ fila
										+ '</td>'
										+ '<td style="text-align:center"> '
										+ '<a class="glyphicon glyphicon-info-sign" style="font-size: 30px; color:#cece30; text-align:center" tabindex="0" role="button" data-toggle="popover" data-trigger="focus" title="Advertencia:" data-content="'
										+ 'Debe ingresar al menos dos materiales para establecer una equivalencia."></a>'
										+ '</td>'
							} else if (response[i].warning) {
								tr = '<tr class="warning"> <td>'
										+ fila
										+ '</td>'
										+ '<td style="text-align:center"> '
										+ '<a class="glyphicon glyphicon-info-sign" style="font-size: 30px; color:#cece30; text-align:center" tabindex="0" role="button" data-toggle="popover" data-trigger="focus" title="Advertencia:" data-content="'
										+ 'Esta fila es una combinacíon de dos o mas filas del Excel."></a>'
										+ '</td>'
							} else
								tr += "<td>" + fila + "</td> <td> </td>";
							for (var j = 0; j < response[i].materialesEquivalentes.length; j++) {
								tr += "<td>"
										+ response[i].materialesEquivalentes[j].partNumber
										+ "</td>"
										+ "<td>"
										+ response[i].materialesEquivalentes[j].designacion
										+ "</td>"
										+ "<td>"
										+ response[i].materialesEquivalentes[j].producer.code
										+ "</td>" + "</td>";
							}
							tr += "</tr>";
							tbody.innerHTML += tr;
						}
						if (tbody.innerHTML != ""){
						var thead = document.getElementById('thead');
						thead.innerHTML = " ";
						var tr = "";
						tr = '<tr><td rowspan="2"></td>'
								+ '<td rowspan="2"> Resultado</td>'
						for (var i = 0; i < max; i++) {
							tr += '<td colspan="3"> Material ' + (i + 1)
									+ '</td>'
						}
						tr += '</tr><tr>'
						for (var i = 0; i < max; i++) {
							tr += '<td>Nro Parte</td>' + '<td>Designacion</td>'
									+ '<td>Fabricante</td>'
						}
						tr += '</tr>'
						thead.innerHTML += tr;
						}else {
							var msj = document.getElementById('alertDanger');
							msj.hidden = false;
							msj.innerHTML = "Error en el pegado.";
							document.getElementById('alertSuccess').hidden = true;
						}
					}
				})
	}
}
function guardar() {
	var tbody = document.getElementById('tbody');
	if (tbody.innerHTML == "") {
		var msj = document.getElementById('alertDanger');
		msj.hidden = false;
		msj.innerHTML = "¡Debe pegar Materiales antes de guardar!";
		document.getElementById('alertSuccess').hidden = true;
	} else {
		$.ajax({
			type : "POST",
			url : "/sgl/equivalentes/equivalenteMasivo/Guardar",
			success : function(response) {
				if (response) {
					document.getElementById('tbody').innerHTML = "";
					document.getElementById('thead').innerHTML = "";
					var msj = document.getElementById('alertSuccess');
					document.getElementById('alertDanger').hidden = true;
					msj.hidden = false;
					msj.innerHTML = "Se guardo la relacion de equivalencia con exito.";
				} else {
					var msj = document.getElementById('alertDanger');
					msj.hidden = false;
					msj.innerHTML = "Error al guardar la tabla.";
					document.getElementById('alertSuccess').hidden = true;
				}
			}
		})
	}
}