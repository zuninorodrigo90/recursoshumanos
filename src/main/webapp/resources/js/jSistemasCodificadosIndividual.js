$(document).ready(
		function() {
			var idMaterial = document.getElementById('catalogo.id').value;
			if (idMaterial != "") {
				disableMaterial();
						document.getElementById('catalogo.partNumber').disabled = true;
						document.getElementById('catalogo.producer.code').disabled = true;
			}
			$("#codSyco").mask("99-99-99");
			
			$('[data-toggle="tooltip"]').tooltip();
			
			if (document.getElementById('codSyco').value != "__-__-__"
					&& document.getElementById('codSyco').value != "") {
				document.getElementById('docNumber').value = "";
				document.getElementById('docNumber').disabled = true;
			}
			app.validateIdentifier();
			$(".registrationForm").validate(
					{
						errorClass : "error-class",
						rules : {
							'partNumber' : {
								required : true
							},
							'producerCode' : {
								required : true
							},
							'designation' : {
								required : true
							},
							'sistemaArmasId' : {
								required : true
							},
							'materialTypeId' : {
								required : true
							},
							'measurementUnitId' : {
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
					});
		}

);

var app = {
	'onLoad' : function() {

	},
	'findCatalogo' : function() {
		var partNumber = document.getElementById('catalogo.partNumber');
		var codeProducer = document.getElementById('catalogo.producer.code');
		var component = {
			"partNumber" : document.getElementById('catalogo.partNumber').value,
			"producer" : document.getElementById('catalogo.producer.code').value,
		}
		var msj = document.getElementById('alertDanger');
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
							document.getElementById('catalogo.designacion').value = response.designacion;
							document.getElementById('catalogo.measurementUnit').value = response.measurementUnit.id;
							document.getElementById('nsn').value = response.nsn;
							document.getElementById('ncmConstable').value = response.ncmConstable;
							document.getElementById('catalogo.id').value = response.id;
							disableMaterial();
						}
					},
					error : function() {
						cleanMaterialData();
						enableMaterial();
					}
				})
	},
	'validateIdentifier' : function() {
		var syco = document.getElementById('codSyco');
		var docNumber = document.getElementById('docNumber');
		if ((syco.value != "" && syco.value != ("__-__-__"))
				&& docNumber.value != "") {
			var identifierError = document.getElementById('identifierError');
			if (identifierError.innerHTML == '') {
				$('#identifierError')
						.append(
								'<strong><label class="error-class">Ingrese SYCO o Número de documento pero no ambos.</label></strong>');
			}
			document.getElementById('btnGuardar').disabled = true;
		} else {
			document.getElementById('btnGuardar').disabled = false;
			$('#identifierError').html('');
		}
	},
	'showModalQuantityType' : function() {
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
							var tr = '<tr><td style="font-weight: bolder">'
									+ response[i].name + "</td>" + "<td>"
									+ response[i].description + "</td><tr> ";
							tabla += tr;
						}
						tabla += '</tbody></table>'
						modalBodyInformation.innerHTML += tabla;
						$("#modalInformation").modal();
					}
				})

	},
	'disableDocumentNumber' : function() {
		if (document.getElementById('codSyco').value != "") {
			document.getElementById('docNumber').disabled = true;
		}
	},
	'disableSyco' : function() {
		if (document.getElementById('docNumber').value != "") {
			document.getElementById('codSyco').disabled = true;
		}
	},
	'enableDocumentNumber' : function() {
		if (document.getElementById('codSyco').value == "__-__-__"
				|| document.getElementById('codSyco').value == "") {
			document.getElementById('docNumber').disabled = false;
		}
	},
	'enableSyco' : function() {
		if (document.getElementById('docNumber').value == "") {
			document.getElementById('codSyco').disabled = false;
		}
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

function cleanMaterialData() {
	document.getElementById('catalogo.designacion').value = "";
	document.getElementById('catalogo.measurementUnit').value = "";
	document.getElementById('nsn').value = "";
	document.getElementById('ncmConstable').value = "";
}

function enableMaterial() {
	document.getElementById('catalogo.partNumber').disabled = false;
	document.getElementById('catalogo.producer.code').disabled = false;
	document.getElementById('catalogo.designacion').disabled = false;
	document.getElementById('catalogo.measurementUnit').disabled = false;
	document.getElementById('nsn').disabled = false;
	document.getElementById('ncmConstable').disabled = false;
}

function disableMaterial() {
	document.getElementById('catalogo.designacion').disabled = true;
	document.getElementById('catalogo.measurementUnit').disabled = true;
	document.getElementById('nsn').disabled = true;
	document.getElementById('ncmConstable').disabled = true;
}