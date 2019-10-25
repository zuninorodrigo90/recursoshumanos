$(document).ajaxComplete(function() {
	$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="tabla"]').tooltip();
})

$(document).ready(function() {
	$('[data-toggle="tabla"]').tooltip();
	$('[data-toggle="tooltip"]').tooltip();
	document.getElementById("subItemKit.amount").disabled = true;
});

function findKit() {
	var msj = document.getElementById('alertDanger');
	hideSuccessMsj();
	hideDangerMsj();
	var partNumber = document.getElementById('partNumber');
	var codeProducer = document.getElementById('producer.code');
	var component = {
		"partNumber" : partNumber.value,
		"producer" : codeProducer.value,
	}
	$
			.ajax({
				type : "POST",
				url : "/sgl/materiales/searchCatalogoByProducerAndPartNumber",
				contentType : 'application/json; charset=utf-8',
				dataType : 'json',
				data : JSON.stringify(component),
				success : function(response) {
					var id = document.getElementById('id');
					var designacion = document.getElementById('designacion');
					var measurementUnit = document
							.getElementById('measurementUnit.id');
					var nsn = document.getElementById('nsn');
					var ncm = document.getElementById('ncmConstable');
					id.value = response.id;
					designacion.value = response.designacion;
					measurementUnit.value = response.measurementUnit.id;
					nsn.value = response.nsn;
					ncm.value = response.ncmConstable;
					designacion.disabled = true;
					measurementUnit.disabled = true;
					nsn.disabled = true;
					ncm.disabled = true;
					loadTable();
					var tbody = document.getElementById('tbody')
					validateVigencia(response, msj);
					if (response.subItemsKit.length > 0) {
						tbody.innerHTML = "";
						for (var i = 0; i < response.subItemsKit.length; i++) {
							loadSubItemsFromResponse(tbody,
									response.subItemsKit[i]);
						}
					} else {
						tbody.innerHTML = "<tr id=0><td>No posee subitems</td></tr>";
					}
				},
				error : cleanKitData()
			});
};

function findMaterial(limpio) {
	var msj = document.getElementById('alertDanger');
	hideSuccessMsj();
	hideDangerMsj();
	var partNumber = document.getElementById('subItemKit.catalogo.partNumber');
	var codeProducer = document
			.getElementById('subItemKit.catalogo.producer.code');
	var component = {
		"partNumber" : partNumber.value,
		"producer" : codeProducer.value,
	}
	$
			.ajax({
				type : "POST",
				url : "/sgl/materiales/searchCatalogoByProducerAndPartNumber",
				contentType : 'application/json; charset=utf-8',
				dataType : 'json',
				data : JSON.stringify(component),
				success : function(response) {
					validateVigencia(response, msj);
					document.getElementById("subItemKit.amount").disabled = false;
					document.getElementById('materialDesignacionHidden').value = response.designacion;
					document.getElementById('idMaterialHidden').value = response.id;
					document.getElementById('designacionLabel').innerHTML = "Designación: "
							+ response.designacion
							+ "<br>"
							+ "Unidad de medida: "
							+ response.measurementUnit.name
							+ "<br>"
							+ "NSN: "
							+ response.nsn
							+ "<br>"
							+ "NCM: "
							+ response.ncmConstable
				},
				error : function() {
					var msj = document.getElementById('alertDanger');
					msj.hidden = false;
					msj.class = "alert alert-danger";
					msj.innerHTML = "No se puede agregar un material que no se encuentre registrado.";
					// cleanMaterialData()
				}
			});
};

function addSubitem() {
	hideSuccessMsj();
	hideDangerMsj();
	var msj = document.getElementById('alertDanger');
	if (isMandatoryFieldsEmpty()) {
		msj.hidden = false;
		msj.class = "alert alert-danger";
		msj.innerHTML = "Debe completar todos los campos obligatorios (*).";
	} else {
		if (!isSameKitId()) {
			if (!isSubitemInTable("row" + idMaterialHidden.value)) {
				msj.hidden = true;
				loadTable();
				deleteRowById("0");
				var tbody = document.getElementById('tbody')
				loadSubItemsInTable(tbody);
			} else {
				msj.hidden = false;
				msj.class = "alert alert-danger";
				msj.innerHTML = "El material ya se encuentra cargado en la lista.";
			}
		} else {
			msj.hidden = false;
			msj.class = "alert alert-danger";
			msj.innerHTML = "No se puede agregar el mismo material como subitem.";
		}
	}
}

function loadTable() {
	document.getElementById("tableSubitems").hidden = false;
}

function deleteRowById(rowid) {
	var row = document.getElementById(rowid);
	if (row != null) {
		row.parentNode.removeChild(row);
	}
}

function isMandatoryFieldsEmpty() {
	var partNumber = document.getElementById('subItemKit.catalogo.partNumber').value;
	var producer = document.getElementById('subItemKit.catalogo.producer.code').value;
	var amount = document.getElementById('subItemKit.amount').value;
	var partNumber = document.getElementById('subItemKit.catalogo.partNumber').value;
	var producer = document.getElementById('subItemKit.catalogo.producer.code').value;
	var designacion = document.getElementById('designacion').value;
	var measurementUnit = document.getElementById('measurementUnit.id').value;
	if (partNumber == "" || producer == "" || amount == "" || designacion == ""
			|| measurementUnit == "") {
		return true;
	} else {
		return false;
	}
}

function isSubitemInTable(subItemId) {
	var row = document.getElementById(subItemId);
	if (row != null) {
		return true;
	} else {
		return false;
	}
}

function isSameKitId() {
	var kitId = document.getElementById('id').value;
	var materialId = document.getElementById('idMaterialHidden').value;
	if (kitId == materialId) {
		return true;
	} else {
		return false;
	}
}

function cleanKitData() {
	var designacion = document.getElementById('designacion');
	var measurementUnit = document.getElementById('measurementUnit.id');
	var nsn = document.getElementById('nsn');
	var ncm = document.getElementById('ncmConstable');
	document.getElementById("subItemKit.amount").disabled = true;
	document.getElementById('id').value = "";
	designacion.value = "";
	measurementUnit.value = "";
	nsn.value = "";
	ncm.value = "";
	document.getElementById("tableSubitems").hidden = true;
	designacion.disabled = false;
	measurementUnit.disabled = false;
	nsn.disabled = false;
	ncm.disabled = false;
	document.getElementById('tbody').innerHTML = "";
}

function cleanMaterialData() {
	document.getElementById('subItemKit.catalogo.partNumber').value = "";
	document.getElementById('subItemKit.catalogo.producer.code').value = "";
	document.getElementById('idMaterialHidden').value = "";
	document.getElementById('subItemKit.amount').value = "";
	document.getElementById('materialDesignacionHidden').value = "";
	document.getElementById('designacionLabel').innerHTML = "";
	document.getElementById("subItemKit.amount").disabled = true;

	// var msj = document.getElementById('alertDanger');
	// msj.hidden = false;
	// msj.class = "alert alert-danger";
	// msj.innerHTML = "No se puede agregar un material que no se encuentre
	// registrado.";
}

function loadSubItemsInTable(tbody) {
	tbody.innerHTML += '<tr id="' + "row"
			+ document.getElementById('idMaterialHidden').value
			+ '">'
			+ '<td>'
			+ document.getElementById('subItemKit.catalogo.partNumber').value
			+ '</td>'
			+ '<td>'
			+ document.getElementById('subItemKit.catalogo.producer.code').value
			+ '</td>'
			+ '<td>'
			+ document.getElementById('materialDesignacionHidden').value
			+ '</td>'
			+ '<td>'
			+ document.getElementById('subItemKit.amount').value
			+ '</td>'
			+ '<td>'
			+ '<a onclick="edit(this)"'
			+ 'data-toggle="tooltip" title="Modificar" class="glyphicon glyphicon-edit triggerEdit"> '
			+ '</a> <a onclick="deleteRow(this)"  data-toggle="tooltip" '
			+ 'title="Eliminar" class="glyphicon glyphicon-remove" ></a>'
			+ '</td>' + '<td style="display:none">' + null + '</td>' + "</tr>";
	cleanMaterialData();

}

function loadSubItemsFromResponse(tbody, subItem) {
	tbody.innerHTML += '<tr id="' + "row"
			+ subItem.catalogo.id
			+ '">'
			+ '<td>'
			+ subItem.catalogo.partNumber
			+ '</td>'
			+ '<td>'
			+ subItem.catalogo.producer.code
			+ '</td>'
			+ '<td>'
			+ subItem.catalogo.designacion
			+ '</td>'
			+ '<td>'
			+ subItem.amount
			+ '</td>'
			+ '<td>'
			+ '<a onclick="edit(this)" '
			+ 'data-toggle="tooltip" title="Modificar" class="glyphicon glyphicon-edit triggerEdit"> '
			+ '</a> <a onclick="deleteRow(this)" data-toggle="tooltip" '
			+ 'title="Eliminar" class="glyphicon glyphicon-remove"> </a>'
			+ '</td>' + '<td style="display:none">' + subItem.id + '</td>'
			+ "</tr>"
}

function save() {
	var msjDanger = document.getElementById('alertDanger');
	msjDanger.hidden = true;
	var msjSuccess = document.getElementById('alertSuccess');
	var subItemsKit = [];
	var table = document.getElementById("myTable"), cells;
	for (var i = 1; i < table.rows.length; i++) {
		var str = table.rows[i].id;
		if (str != 0) {
			cells = table.rows[i].cells;
			var subItem = {
				"id" : +cells[5].innerText,
				"catalogo" : {
					"id" : str.replace('row', ''),
				},
				"amount" : cells[3].innerText,
			}
			subItemsKit.push(subItem);
		}
	}
	var catalogo = {
		"id" : $('#id').val(),
		"partNumber" : $('#partNumber').val(),
		"producer" : {
			"code" : document.getElementById("producer.code").value,
		},
		"measurementUnit" : {
			"id" : document.getElementById("measurementUnit.id").value,
		},
		"designacion" : $('#designacion').val(),
		"nsn" : $('#nsn').val(),
		"ncmConstable" : [ $('#ncmConstable').val() ],
		"subItemsKit" : subItemsKit,
	};

	$
			.ajax({
				type : "POST",
				contentType : 'application/json; charset=utf-8',
				dataType : 'json',
				url : "/sgl/materiales/kitDeRecambio/save",
				data : JSON.stringify(catalogo),
				success : function(response) {
					if (response == 1) { // Éxito
						msjSuccess.hidden = false;
						msjSuccess.innerHTML = "Guardado con éxito.";
					} else { // Error
						if (response == 0) {
							msjDanger.hidden = false;
							msjDanger.innerHTML = "Ha ocurrido un error.";
						} else {
							if (response == 2) {// No existe producer
								msjDanger.hidden = false;
								msjDanger.innerHTML = "El fabricante ingresado no existe. Debe registrarlo o ingresar uno válido.";
							}
						}

					}
					cleanKitData();
					cleanMaterialData();
					document.getElementById('partNumber').value = "";
					document.getElementById('producer.code').value = "";
					document.getElementById('subItemKit.catalogo.partNumber').value = "";
					document
							.getElementById('subItemKit.catalogo.producer.code').value = "";
					document.getElementById('subItemKit.catalogo.partNumber').disabled = false;
					document
							.getElementById('subItemKit.catalogo.producer.code').disabled = false;
				}
			})
}

function hideSuccessMsj() {
	var msjSuccess = document.getElementById('alertSuccess');
	msjSuccess.hidden = true;
}

function hideDangerMsj() {
	var msj = document.getElementById('alertDanger');
	msj.hidden = true;
}

function edit(row) {
	var str = row.parentNode.parentNode.id;
	var idMaterial = str.replace('row', '');
	loadEditButton(idMaterial);
	row = row.parentNode.parentNode;
	document.getElementById('subItemKit.amount').value = row.cells[3].innerText;
	document.getElementById('subItemKit.catalogo.partNumber').value = row.cells[0].innerText;
	document.getElementById('subItemKit.catalogo.producer.code').value = row.cells[1].innerText;
	document.getElementById('materialDesignacionHidden').value = row.cells[2].innerText;
	document.getElementById('rowToEditHidden').value = idMaterial;
	document.getElementById('idSubitemHidden').value = row.cells[5].innerText;
	document.getElementById('subItemKit.catalogo.partNumber').disabled = true;
	document.getElementById('subItemKit.catalogo.producer.code').disabled = true;
	findMaterial(false);
}

function loadEditButton(idMaterial) {
	buttonEdit = document.getElementById('buttonAdd');
	buttonEdit.className = 'glyphicon glyphicon-ok-sign';
	buttonEdit.style.color = "green";
	$("#buttonAdd").attr("onclick",
			'editSubitemButton("' + "row" + idMaterial + '")');
}

function loadAddButton() {
	buttonAdd = document.getElementById('buttonAdd');
	buttonAdd.className = 'glyphicon glyphicon-plus-sign';
	$("#buttonAdd").attr("onclick", "addSubitem()");
	buttonEdit.style.color = "#337ab7";
}

function editSubitemButton(rowId) {
	hideSuccessMsj();
	hideDangerMsj();
	var idMaterialHidden = document.getElementById('idMaterialHidden').value;
	var msj = document.getElementById('alertDanger');
	if (isMandatoryFieldsEmpty()) {
		msj.hidden = false;
		msj.class = "alert alert-danger";
		msj.innerHTML = "Debe completar todos los campos obligatorios (*).";
	} else {
		if (isSameIdMaterialWithRowToEdit(idMaterialHidden)) {
			msj.hidden = true;
			var rowToEdit = document.getElementById(rowId);
			rowToEdit.id = "row"
					+ document.getElementById('idMaterialHidden').value
			rowToEdit.cells[0].innerText = document
					.getElementById('subItemKit.catalogo.partNumber').value;
			rowToEdit.cells[1].innerText = document
					.getElementById('subItemKit.catalogo.producer.code').value;
			rowToEdit.cells[2].innerText = document
					.getElementById('materialDesignacionHidden').value;
			rowToEdit.cells[3].innerText = document
					.getElementById('subItemKit.amount').value;
			var msjSuccess = document.getElementById('alertSuccess');
			msjSuccess.hidden = false;
			msjSuccess.innerHTML = "Subitem modificado con éxito. Deber presionar Guardar para hacer efectivos los cambios";
			loadAddButton();
			cleanMaterialData();
			document.getElementById('rowToEditHidden').value = "";
			document.getElementById('idSubitemHidden').value = "";
			document.getElementById('subItemKit.catalogo.partNumber').value = "";
			document.getElementById('subItemKit.catalogo.producer.code').value = "";
			document.getElementById('subItemKit.catalogo.partNumber').disabled = false;
			document.getElementById('subItemKit.catalogo.producer.code').disabled = false;
		} else {
			if (isSubitemInTable("row" + idMaterialHidden)) {
				msj.hidden = false;
				msj.class = "alert alert-danger";
				msj.innerHTML = "El material ya se encuentra cargado en la tabla.";
			}
		}
	}
}

function isSameIdMaterialWithRowToEdit(idMaterialHidden) {
	var idRowToEditHidden = document.getElementById('rowToEditHidden').value;
	if (idMaterialHidden == idRowToEditHidden) {
		return true;
	} else {
		return false;
	}
}

function deleteRow(row) {
	var d = row.parentNode.parentNode.rowIndex;
	document.getElementById('myTable').deleteRow(d);
	var table = document.getElementById("myTable");
	var msjSuccess = document.getElementById('alertSuccess');
	msjSuccess.hidden = false;
	msjSuccess.innerHTML = "Deber presionar Guardar para hacer efectivos los cambios";
}

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

function validateProducer() {
	var designacion = document.getElementById('designacion');
	var measurementUnit = document.getElementById('measurementUnit.id');
	var nsn = document.getElementById('nsn');
	var ncm = document.getElementById('ncmConstable');
	var msjDanger = document.getElementById('alertDanger');
	msjDanger.hidden = true;
	var producerCode = document.getElementById('producer.code').value;
	$
			.ajax({
				type : "POST",
				url : "/sgl/materiales/kitDeRecambio/validateProducer/"
						+ producerCode,
				success : function(response) {
					if (response == "") {
						msjDanger.hidden = false;
						msjDanger.innerHTML = "El fabricante ingresado no existe. Debe registrarlo o ingresar uno válido.";
						designacion.disabled = true;
						measurementUnit.disabled = true;
						nsn.disabled = true;
						ncm.disabled = true;
					} else {
						esignacion.disabled = false;
						measurementUnit.disabled = false;
						nsn.disabled = false;
						ncm.disabled = false;
					}
				}
			})
}
