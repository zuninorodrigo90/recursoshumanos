$(document).ajaxComplete(function() {
	$('[data-toggle="tooltip"]').tooltip();
});

$(document).ready(
		function() {
			$('[data-toggle="tooltip"]').tooltip();
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
			$("#entryDate").datepicker();
			$("#purchaseDate").datepicker();
			var partNumber = document.getElementById('partNumber').value;
			var codeProducer = document.getElementById('producer.code').value;
			if (partNumber != "" && codeProducer != "") {
				findMaterial();
			}
		});

function findMaterial() {
	alertCorrect = document.getElementById('alertCorrect');
	alertIncorrect = document.getElementById('alertIncorrect');
	var alertDanger = document.getElementById('alertDanger');
	var alertSucces = document.getElementById('alertSuccess');
	var partNumber = document.getElementById('partNumber');
	var codeProducer = document.getElementById('producer.code');
	if (partNumber.value == "" || codeProducer.value == "") {
		alert("Debe ingresar el numero de parte y el codigo de fabricante para poder buscar.");
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
					url : "/sgl/materiales/searchCatalogoByProducerAndPartNumber/",
					data : JSON.stringify(component),
					success : function(response) {
						if (response.materialType != null) {
							alertSuccess.hidden = true;
							alertDanger.hidden = true;
							validateVigencia(response, alertDanger);
							if (response.materialType.id == 13) {
								document.getElementById('purchaseDateHidden').hidden = false;
								document.getElementById('usageHidden').hidden = false;
								document.getElementById('serialNumberHidden').hidden = false;
							}
							if (response.materialType.id != 13) {
								document.getElementById('purchaseDateHidden').hidden = true;
								document.getElementById('usageHidden').hidden = true;
								document.getElementById('serialNumberHidden').hidden = true;
							}
							if (alertCorrect != null) {
								alertCorrect.hidden = true;
							}
							if (alertIncorrect != null) {
								alertIncorrect.hidden = true;
							}
							document.getElementById('locationHidden').hidden = false;
							document.getElementById('amountHidden').hidden = false;
							document.getElementById('entryDateHidden').hidden = false;
							document.getElementById('guardarHidden').hidden = false;
							document.getElementById('btnGuardar').disabled = false;
							document.getElementById('idCatalogo').value = response.id;
							document.getElementById('designation').innerHTML = "Designaci&oacuten: "
									+ response.designacion
									+ "<br>"
									+ "Unidad de Medida: "
									+ response.measurementUnit.name
									+ "<br>"
									+ "Tipo de material: "
									+ response.materialType.code
									+ " - "
									+ response.materialType.name + "<br>"
						} else {
							alertSuccess.hidden = true;
							alertDanger.hidden = false;
							alertDanger.innerHTML = "El material no tiene un tipo. No podr&aacute continuar.";
						}

					},
					error : function() {
						if (alertCorrect != null) {
							alertCorrect.hidden = true;
						}
						if (alertIncorrect != null) {
							alertIncorrect.hidden = true;
						}
						document.getElementById('locationHidden').hidden = true;
						document.getElementById('purchaseDateHidden').hidden = true;
						document.getElementById('usageHidden').hidden = true;
						document.getElementById('serialNumberHidden').hidden = true;
						document.getElementById('amountHidden').hidden = true;
						document.getElementById('entryDateHidden').hidden = true;
						document.getElementById('guardarHidden').hidden = true;
						alertSuccess.hidden = true;
						alertDanger.hidden = false;
						alertDanger.innerHTML = "No se encontr&oacute el material correspondiente.";
						document.getElementById('idCatalogo').value = null;
						document.getElementById('designation').innerHTML = "";
					}
				});
	}
};

function validateVigencia(response, msj) {
	if (!response.vigente && !response.producer.vigente) {
		msj.hidden = false;
		msj.class = "alert alert-danger";
		msj.innerHTML = "Material y fabricante se encuentran dados de baja.";
	} else {
		if (!response.producer.vigente) {
			msj.hidden = false;
			msj.class = "alert alert-danger";
			msj.innerHTML = "El fabricante se encuentra dado de baja.";
		} else {
			if (!response.vigente) {
				msj.hidden = false;
				msj.class = "alert alert-danger";
				msj.innerHTML = "El material se encuentra dado de baja.";
			}
		}
	}
}

function loadModalUnits() {
	$("#modalUnits").modal();
}

function saveUnits() {
	var resultadoView = [];
	var table = document.getElementById("unitsTable"), cells;
	// A la fila 0 no la tengo en cuenta porque es el encabezado de la tabla y a
	// la columna 0 no la tengo en cuenta porque son los nombres de los roles
	for (var i = 1; i < table.rows.length; i++) {
		cells = table.rows[i].cells;
		for (c = 1; c < cells.length; c++) {
			cell = cells[c];
			var idUnit = table.rows[i].id.replace("unit", "");
			var resultadoViewIndividual = {
				"idUnit" : +idUnit,
				"amount" : document.getElementById("amount" + idUnit).value
			}
			if (resultadoViewIndividual.amount != "") {
				resultadoView.push(resultadoViewIndividual);
			}

		}
	}
	var jsonParameter = encodeURIComponent(JSON.stringify(resultadoView));
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=utf-8',
		dataType : 'json',
		data : JSON.stringify(resultadoView),
		url : "/sgl/materiales/saveUnits/" + jsonParameter,
	})
	$("#modalUnits").modal('hide');
}
