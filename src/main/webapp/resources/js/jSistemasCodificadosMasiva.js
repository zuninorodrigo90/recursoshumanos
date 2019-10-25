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

$(document).ready(
	function() {
		$('[data-toggle="tooltip"]').tooltip();
		// En Chrome deshabilito el botón pegar y en IE y Edge lo dejo
		// habilitado
		if (document.execCommand('paste')
			&& document.queryCommandSupported('paste')) {
			document.getElementById('btnPegar').disabled = false;
		} else {
			document.getElementById('btnPegar').disabled = true;
		}
		$(".triggerRemove").click(
			function(e) {
				e.preventDefault();
				$("#modalRemove #removeBtn").attr("href",
					$(this).attr("href"));
				$("#modalRemove").modal();
			});
	});

$('[data-toggle="tooltip"]').tooltip();
$(function() {
	$('[data-toggle="popover"]').popover()
})

$(document).ajaxComplete(function() {
	$('[data-toggle="popover"]').popover();
})

$('#myModal').on('shown.bs.modal', function() {
	$('#myInput').focus()
})

function pegar(pastedText) {
	var sistArmas = document.getElementById('sistemaArmas').value;
	if (sistArmas == "") {
		var tbody = document.getElementById('tbody');
		tbody.innerHTML = "";
		$(document.getElementById('sistemaArmas')).closest('.form-group')
			.removeClass('has-success').addClass('has-error');
		var error = document.getElementById('error');
		error.innerhtml = "Selecciona un elemento de la lista.";
	} else {
		$("#modalProgress").modal({
			backdrop : 'static',
			keyboard : false
		});
		$(document.getElementById('sistemaArmas')).closest('.form-group')
			.removeClass('has-error').addClass('has-successerror');
		//		var test1 = document.execCommand('paste');
		//		var test2 = document.queryCommandSupported('paste');
		//		var test3 = document.queryCommandEnabled('paste');
		// Si es true es IE y si es false es Chrome
		if (document.execCommand('paste')) {
			pastedText = window.clipboardData.getData('Text');
		}
		if (pastedText != undefined) {
			$
				.ajax({
					type : "POST",
					contentType : 'application/json; charset=utf-8',
					dataType : 'json',
					url : "/sgl/catalogacion/sistemasCodificadosMasiva/"
						+ sistArmas,
					data : JSON.stringify(pastedText),
					success : function(response) {
						var ban = true;
						var porc;
						var elem = document.getElementById("progressbar");
						var btnGuardar = document
							.getElementById('btnGuardar');
						btnGuardar.disabled = false;
						var tbody = document.getElementById('tbody');
						var sistArmas = document
							.getElementById('sistemaArmas');
						tbody.innerHTML = " ";
						for (var i = 0; i < response.length; i++) {
							var fila = i;
							fila += 1;
							porc = ((i * 100) / response.length);
							elem.style.width = porc + '%';
							var tr = "<tr>";
							/* Must not forget the $ sign */
							if (response[i].error) {
								tr += '<tr class="danger"> <td>'
									+ fila
									+ '</td> <td style="text-align:center"> <a class="glyphicon glyphicon-alert" style="font-size: 30px ; color: #e49393 ; text-align:center" tabindex="0" role="button" data-toggle="popover" data-trigger="focus" title="Error:" data-content="'
									+ response[i].menssage
									+ '"></a> </td>';
								if (ban) {
									ban = false;
									$("#modalRemove").modal();
									btnGuardar.disabled = true;
								}
							} else if (response[i].warning) {
								tr += '<tr class="warning"> <td>'
									+ fila
									+ '</td>'
									+ '<td style="text-align:center"> '
									+ '<a class="glyphicon glyphicon-info-sign" style="font-size: 30px; color:#cece30; text-align:center" tabindex="0" role="button" data-toggle="popover" data-trigger="focus" title="Advertencia:" data-content="'
									+ response[i].menssage + '"></a>'
									+ '</td>'
							} else {
								tr += "<td>" + fila + "</td> <td> </td>";
							}
							tr += "<td>"
								+ response[i].component.identifier
								+ "</td>"
								+ "<td>"
								+ response[i].component.figureNumber
								+ "</td>"
								+ "<td>"
								+ response[i].component.orden
								+ "</td>"
								+ "<td>"
								+ response[i].component.catalogo.partNumber
								+ "</td>"
								+ "<td>"
								+ response[i].component.catalogo.designacion
								+ "</td>"
								+ "<td>"
								+ response[i].component.catalogo.producer.name
								+ "</td>";
							if (response[i].component.amount != null) {
								tr += "<td>"
									+ response[i].component.amount
									+ "</td>";
							} else {
								tr += "<td>"
									+ '<a onclick="showModalQuantityType()" style="font-size: 25px" data-toggle="tooltip" title="Ver cantidades válidas" class="glyphicon glyphicon-option-horizontal"></a>'
									+ "</td>";
							}
							tr += "<td>"
								+ response[i].component.catalogo.measurementUnit.name
								+ "</td>"
								+ "<td>"
								+ response[i].component.usableOnCode
								+ "</td>"
								+ "<td>"
								+ response[i].component.smrCode
								+ "</td>"
								+ "<td>"
								+ response[i].component.catalogo.nsn
								+ "</td>"
								+ "<td>"
								+ response[i].component.catalogo.ncmConstable
								+ "</td>"
								// + '<td style="text-align:center">'
								// + '<a class="glyphicon
								// glyphicon-menu-hamburger"
								// style="font-size: 30px"
								// tabindex="0"></a>'
								// + "</td>"
								+ "</tr>";
							tbody.innerHTML += tr;
						}
						;
						$("#modalProgress").modal('hide');
					}
				})
		}
	}
}
function guardar() {
	$("#modalProgress").modal({
		backdrop : 'static',
		keyboard : false
	});
}


function showModalQuantityType() {
	$
		.ajax({
			type : 'POST',
			url : '/sgl/catalogacion/searchQuantityType/',
			success : function(response) {
				var modalBodyInformation = document
					.getElementById('bodyInformation');
				modalBodyInformation.innerHTML = "";
				modalBodyInformation.innerHTML = "Usted puede ingresar <strong> valores numéricos </strong> o los siguientes: "
				var tabla = '<table class="table table-bordered table-hover">'
					+ '<thead style="text-align: center; font-weight: bolder">'
					+ '<tr class="active">'
					+ '<td>Valor</td>'
					+ '<td>Descripción</td></tr>'
					+ '</thead>'
					+ '<tbody style="font-size: 12px">';
				for (var i = 0; i < response.length; i++) {
					var tr = '<tr><td style="font-weight: bolder">' + response[i].name + "</td>"
						+ "<td>" + response[i].description
						+ "</td><tr> ";
					tabla += tr;
				}
				tabla += '</tbody></table>'
				modalBodyInformation.innerHTML += tabla;
				$("#modalInformation").modal();
			}
		})
}