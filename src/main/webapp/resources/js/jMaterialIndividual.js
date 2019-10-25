/**
 * 
 */

$(document).ajaxComplete(function() {
	$('[data-toggle="tooltip"]').tooltip();
	if ($('#id').val() != "") {
		document.getElementById('divVigente').style.display = 'block';
	} else {
		document.getElementById('divVigente').style.display = 'none';
	}
});

$(document).ready(
		
		function() {
			$('[data-toggle="tooltip"]').tooltip();
			$(".registrationForm").validate(
					{
						errorClass : "error-class",
						rules : {
							'partNumber' : {
								required : true
							},
							'producer.code' : {
								required : true
							},
							'designacion' : {
								required : true
							},
							'sistemaArmas' : {
								required : true
							},
							'materialType.id' : {
								required : true
							},
							'measurementUnit.id' : {
								required : true
							}
						},
						highlight : function(element) {
							$(element).closest('.form-group').removeClass(
									'has-success').addClass('has-error');
						},
						unhighlight : function(element) {
							$(element).closest('.form-group').removeClass(
									'has-error').addClass('has-successerror');
						}
					})
			if ($('#id').val() != "") {
				document.getElementById('divVigente').style.display = 'block';
			} else {
				document.getElementById('divVigente').style.display = 'none';
			}
			enableUsefulLife(document.getElementById("materialTypeId.id"));
		}
		
		
);

var app = {
	'onLoad' : function() {

	},
	'validateNotIdentifier' : function() {
		var syco = document.getElementById('codSyco');
		var docNumber = document.getElementById('docNumber');
		if ((syco.value != "" && syco.value != ("__-__-__"))
				&& docNumber.value != "") {
			var identifierError = document.getElementById('identifierError');
			if (identifierError.innerHTML == '') {
				$('#identifierError')
						.append(
								'<strong><label>Ingrese SYCO o Número de documento pero no ambos.</label></strong>');
			}
			document.getElementById('btnGuardar').disabled = true;
		} else {
			document.getElementById('btnGuardar').disabled = false;
			$('#identifierError').html('');
			$(element).closest('.form-group').removeClass('has-error')
					.addClass('has-successerror');

		}
	},
	'agregarEquivalencia' : function() {
		$.ajax({
			type : "POST",
			url : "/sgl/materiales/materialIndividual/" + sistArmas,
			success : function(response) {

			}
		})
	},

};

var validate = {

	'partNumber' : function() {
		var partNumber = document.getElementById('partNumber');
		var btnGuardar = document.getElementById('btnGuardar');
		if (partNumber.value == "") {
			alert("Debe colocar un numero de parte.");
			$(document.getElementById('partNumber')).closest('.form-group')
					.addClass('has-error');
			btnGuardar.disabled = true;
		} else {
			$(document.getElementById('partNumber')).closest('.form-group')
					.addClass('has-succes');
			btnGuardar.disabled = false;
		}

		var numero = document.getElementById('partNumber');

	},
	'producer' : function() {
		$.ajax({
			type : "POST",
			url : "/sgl/materiales/materialIndividual/producer/"
					+ partNumber.value + "/" + codeProducer.value,
			success : function(response) {
				$("#modalDialog").modal();
			}
		});

	}
};

function findMaterial() {
	var msj = document.getElementById('alertDanger');
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
						if (response != "") {
							validateVigencia(response, msj);
							document.getElementById('id').value = response.id;
							document.getElementById('designacion').value = response.designacion;
							document.getElementById('measurementUnit.id').value = response.measurementUnit.id;
							document.getElementById('nsn').value = response.nsn;
							document.getElementById('ncmConstable').value = response.ncmConstable;
							document.getElementById('divVigente').style.display = 'block';
							var vig = document.getElementById('vigente');
							vig.checked = response.vigente;
							alert("Los datos ingresados pertenecen a un material existente, para modificarlo presione Guardar.");
						} else {
							document.getElementById('id').value = null;
							document.getElementById('designacion').value = null;
							document.getElementById('measurementUnit.id').value = "";
							document.getElementById('nsn').value = null;
							document.getElementById('ncmConstable').value = null;
							var vigente = document.getElementById('divVigente');
							vigente.style = "";
							var vig = document.getElementById('vigente');
							vig.checked = true;
							alert("Los datos ingresados NO pertenecen a un material ya ingresado.");
						}
					}
				});
	}
};

function guardar() {
	var id = document.getElementById('id').value;
	$("#modalDialog #btnAceptarDialog")
			.attr("onclick", "guardarId(" + id + ")");
	$("#modalDialog #lblModalDialog").html("Guardar Material");
	$("#modalDialog #bodyDialog").html(
			"¿Esta seguro que desea guardar este material?");
	$("#modalDialog").modal();

};

function guardarId(id) {
	var vig;
	if ($('#id').val() != "") {
		vig = true;
	} else {
		vig = $('vigente').val();
	}
	var catalogo = {
		"partNumber" : $('#partNumber').val(),
		"producer" : $('#producer').val(),
		"designacion" : $('#designacion').val(),
		"measurementUnit.id" : $('#measurementUnit.id').val(),
		"materialType.id" : $('#materialType.id').val(),
		"nsn" : $('#nsn').val(),
		"ncmConstable" : $('#ncmConstable').val(),
		"vigente" : vig,
		"id" : $('#id').val()
	};
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=utf-8',
		dataType : 'json',
		url : "/sgl/materiales/materialIndividual",
		data : JSON.stringify(catalogo),
		success : function(response) {

		}
	})
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

function loadModalMtbf() {
	var idMaterial = document.getElementById('id').value;
	if (idMaterial != "") {
		var partNumber = document.getElementById('partNumber').value;
		$(".intervals").each(function() {
			var rowIntervalId = $(this).attr("id");
			document.getElementById(rowIntervalId).checked = false;
		});
		document.getElementById('titleModalMTBF').innerHTML = 'Intervalos de MTBF asignados a Número de Parte '
				+ partNumber;
		var idMaterial = document.getElementById('id').value;
		$
				.ajax({
					type : "POST",
					url : "/sgl/materiales/materialIndividual/loadMtbf/"
							+ idMaterial,
					success : function(response) {
						for (var i = 0; i < response.length; i++) {
							document
									.getElementById('interval' + response[i].id).checked = true;
						}
					}
				});
	}

	$("#modalMTBF").modal();
}

function loadModalTbo() {
	var idMaterial = document.getElementById('id').value;
	if (idMaterial != "") {
		var partNumber = document.getElementById('partNumber').value;
		$(".intervalsTbo").each(function() {
			var rowIntervalId = $(this).attr("id");
			document.getElementById(rowIntervalId).checked = false;
		});
		document.getElementById('titleModalTBO').innerHTML = 'Intervalos de TBO asignados a Número de Parte '
				+ partNumber;
		var idMaterial = document.getElementById('id').value;
		$
				.ajax({
					type : "POST",
					url : "/sgl/materiales/materialIndividual/loadTbo/"
							+ idMaterial,
					success : function(response) {
						for (var i = 0; i < response.length; i++) {
							document
									.getElementById('intervalTBO' + response[i].id).checked = true;
						}
					}
				});
	}
	$("#modalTBO").modal();
}

function loadModalLifeLimit() {
	var idMaterial = document.getElementById('id').value;
	if (idMaterial != "") {
		var partNumber = document.getElementById('partNumber').value;
		$(".intervalsLifeLimit").each(function() {
			var rowIntervalId = $(this).attr("id");
			document.getElementById(rowIntervalId).checked = false;
		});
		document.getElementById('titleModalMTBF').innerHTML = 'Intervalos de Límite de vida asignados a Número de Parte '
				+ partNumber;
		var idMaterial = document.getElementById('id').value;
		$
				.ajax({
					type : "POST",
					url : "/sgl/materiales/materialIndividual/loadLifeLimit/"
							+ idMaterial,
					success : function(response) {
						for (var i = 0; i < response.length; i++) {
							document
									.getElementById('intervalLifeLimit' + response[i].id).checked = true;
						}
					}
				});
	}
	$("#modalLifeLimit").modal();
}

function addOrRemoveMtbf(idInterval) {
	var idMaterial = document.getElementById('id');
	if (idMaterial != null) {
		var material = {
			id : idMaterial.value,
			mtbfs : [ {
				id : idInterval
			} ]
		};
	}
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=utf-8',
		dataType : 'json',
		data : JSON.stringify(material),
		url : "/sgl/materiales/materialIndividual/assingMtbf"
	})
}

function addOrRemoveTbo(idInterval) {
	var idMaterial = document.getElementById('id');
	if (idMaterial != null) {
		var material = {
			id : idMaterial.value,
			tbos : [ {
				id : idInterval
			} ]
		};
	}
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=utf-8',
		dataType : 'json',
		data : JSON.stringify(material),
		url : "/sgl/materiales/materialIndividual/assingTbo"
	})
}

function addOrRemoveLifeLimit(idInterval) {
	var idMaterial = document.getElementById('id');
	if (idMaterial != null) {
		var material = {
			id : idMaterial.value,
			lifeLimits : [ {
				id : idInterval
			} ]
		};
	}
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=utf-8',
		dataType : 'json',
		data : JSON.stringify(material),
		url : "/sgl/materiales/materialIndividual/assingLifeLimit"
	})
}

function checkUnit(numeroDeLista) {
	$
	.ajax({
		type : "POST",
		url : "/sgl/materiales/materialIndividual/checkUnit/" + numeroDeLista,
		success : function(response) {
			if (response == 0) {
				$("#modalSameUnit").modal();
			} else {
				$("#modalMTBF").modal('hide');
				$("#modalTBO").modal('hide');
				$("#modalLifeLimit").modal('hide');
			}
		}
	});
}

function enableUsefulLife(selected) {
	$
	.ajax({
		type : "POST",
		url : "/sgl/materiales/materialIndividual/getMaterialType/" + selected.value,
		success : function(response) {
			if (response.haveUsefulLife) {
				//Habilito
				document.getElementById("mtbf").disabled = false;
				document.getElementById("tbo").disabled = false;
				document.getElementById("lifeLimit").disabled = false;
			} else {//Deshabilito
				document.getElementById("mtbf").disabled = true;
				document.getElementById("tbo").disabled = true;
				document.getElementById("lifeLimit").disabled = true;
			}
		}
	});
}
