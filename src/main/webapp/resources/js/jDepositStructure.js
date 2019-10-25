$(document).ready(function() {

	var urlString = document.URL;
	var url = new URL(urlString);
	var idDeposito = url.searchParams.get("id");
	$.ajax({
		type : "GET",
		url : "/sgl/depositos/loadStructure/" + idDeposito,
		success : function(response) {
			response[response.length - 1].parent = '#';
			$('#jstree').jstree({
				'core' : {
					"check_callback" : true,
					'data' : response
				},
				"plugins" : [ "contextmenu" ],
				contextmenu : {
					items : customMenu
				}
			})
		}
	});
});

function customMenu(node) {
	var modalBody = document.getElementById('modalBody');
	var modalTitle = document.getElementById('modalTitle');
	// The default set of all items
	if (node.icon == "glyphicon glyphicon-folder-open") {
		var items = {
			"Agrupador" : {
				"separator_before" : true,
				"icon" : "glyphicon glyphicon-folder-open",
				"separator_after" : false,
				"label" : "Agrupador",
				"action" : false,
				"submenu" : {
					"Nuevo agrupador" : {
						"separator_before" : false,
						"separator_after" : false,
						"label" : "Nuevo agrupador",
						"action" : function(data) {
							loadModalNewGrouper(modalBody, modalTitle, node);
						}
					},
					"Modificar agrupador" : {
						"separator_before" : false,
						"separator_after" : false,
						"label" : "Modificar agrupador",
						"_disabled" : function(data) {
							return isRoot(node);
						},
						"title" : "Si es el nivel Deposito, no se puede modificar",
						"action" : function(data) {
							loadModifyGrouper(modalBody, modalTitle, node);
						}
					},
					"Eliminar agrupador" : {
						"separator_before" : false,
						"icon" : false,
						"_disabled" : function(data) {
							return hasChildren(node);
						},
						"separator_after" : false,
						"label" : "Eliminar agrupador",
						"title" : "Si el agrupador tiene contenedores, debe eliminarlos",
						"action" : function(data) {
							loadModalDeleteGrouper(node);
						}
					}
				}
			},

			"Contenedores finales" : {
				"separator_before" : true,
				"icon" : "glyphicon glyphicon-inbox",
				"separator_after" : false,
				"label" : "Contenedores finales",
				"action" : function(data) {
					loadModalNewHolders(node);
				},
			}
		};
		if ($(node).hasClass("folder")) {
			// Delete the "delete" menu item
			delete items.deleteItem;
		}
		return items;
	}
}

function loadModalNewGrouper(modalBody, modalTitle, node) {
	var btnAceptarModal = document.getElementById('btnAceptarModal');
	btnAceptarModal.onclick = function() {
		saveGrouperLevel(null);
	}
	$("#modal").modal();
	modalTitle.innerHTML = '<label>Nuevo agrupador</label>';
	modalBody.innerHTML = '<div class="form-horizontal">'
			+ '<div class="form-group">'
			+ '<div class="col-md-12">'
			+ '<label>Nombre nivel</label>'
			+ '<input type="text" class="form-control" id="levelName" placeholder="Nombre nivel">'
			+ '</div>'
			+ '</div>'
			+ '<div class="form-group">'
			+ '<div class="col-md-12">'
			+ '<label>Cantidad</label>'
			+ '<input type="number" class="form-control" id="amount" placeholder="Cantidad">'
			+ '</div>'
			+ '</div>'
			+ '<div class="form-group">'
			+ '<div class="col-md-12">'
			+ '<label>Nivel superior</label>'
			+ '<input type="text" class="form-control" id="superiorLevel" value="'
			+ node.text + '" disabled>' + '</div>' + '</div>'
			+ '<input id="parendIdHidden" type="hidden" value="' + node.id
			+ '">' + '</div>' + '</div>'

}

function saveGrouperLevel(idLevel) {
	var modalBody2 = document.getElementById('modalBody2');
	var modalTitle2 = document.getElementById('modalTitle2');
	var btnAceptarModal2 = document.getElementById('btnAceptarModal2');
	var levelName = document.getElementById('levelName').value;
	var amount = null;
	if (idLevel == null) {
		 amount = document.getElementById('amount').value;	
	} 
	if (levelName == "" || amount == "") {
		modalTitle2.innerHTML = 'Complete todos los campos';
		modalBody2.innerHTML = 'Debe completar todos los campos';
		btnAceptarModal2.onclick = function() {
			$("#modal2").modal('hide');
		}
		$("#modal2").modal();
	} else {
		var grouperLevel = {
			"id" : idLevel,
			"levelName" : levelName,
			"amount" : amount,
			"superiorId" : document.getElementById('parendIdHidden').value
		}
		$
				.ajax({
					type : "POST",
					contentType : 'application/json; charset=utf-8',
					dataType : 'json',
					data : JSON.stringify(grouperLevel),
					url : "/sgl/depositos/saveGrouper",
					success : function(response) {
						if (response == 1) {
							// &Eacutexito
							modalTitle2.innerHTML = '&Eacutexito';
							modalBody2.innerHTML = 'Nivel agrupador guardado con &eacutexito';
							btnAceptarModal2.onclick = function() {
								location.reload();
							}
							$("#modal2").modal();
						} else {
							if (response == 0) {
								modalTitle2.innerHTML = 'Error';
								modalBody2.innerHTML = 'Ha ocurrido un error';
								btnAceptarModal2.onclick = function() {
									location.reload();
								}
								$("#modal2").modal();
							}
						}
					},
					error : function(response) {
						if (response.status == 403) {
							window.location.replace("/sgl/403");
						}
					}
				});
	}
}

function hasChildren(node) {
	return node.children.length > 0 ? true : false;
}

function isRoot(node) {
	return node.parent == '#' ? true : false;
}

function loadModalDeleteGrouper(node) {
	var modalBody = document.getElementById('modalBody');
	var modalTitle = document.getElementById('modalTitle');
	var btnAceptarModal = document.getElementById('btnAceptarModal');
	if (node.parent == '#') {
		modalTitle.innerHTML = 'Imposible eliminar';
		modalBody.innerHTML = 'Este nivel no se puede eliminar. Debe modificarlo';
		$("#modal").modal();
		btnAceptarModal.onclick = function() {
			$("#modal").modal('hide');
		}
	} else {
		modalTitle.innerHTML = 'Confirmaci&oacuten';
		modalBody.innerHTML = 'Est&aacute seguro que desea eliminar este agrupador?';
		btnAceptarModal.onclick = function() {
			deleteGrouper(node.id);
		}
		$("#modal").modal();
	}
}

function deleteGrouper(id) {
	$
			.ajax({
				type : "POST",
				dataType : 'json',
				url : "/sgl/depositos/deleteGrouper/" + id,
				success : function(response) {
					if (response == 1) {
						// &Eacutexito
						modalTitle2.innerHTML = '&Eacutexito';
						modalBody2.innerHTML = 'Nivel agrupador borrado con &eacutexito';
						btnAceptarModal2.onclick = function() {
							location.reload();
						}
						$("#modal2").modal();
					} else {
						modalTitle2.innerHTML = 'Error';
						modalBody2.innerHTML = 'Ha ocurrido un error';
						btnAceptarModal2.onclick = function() {
							location.reload();
						}
						$("#modal2").modal();
					}
				},
				error : function(response) {
					if (response.status == 403) {
						window.location.replace("/sgl/403");
					}
				}
			});
}

function loadModalNewHolders(node) {
	var modalBody = document.getElementById('modalBodyHolder');
	var modalTitle = document.getElementById('modalTitleHolder');
	var btnAceptarModal = document.getElementById('btnAceptarModalHolder');
	btnAceptarModal.onclick = function() {
		$("#modalHolder").modal('hide');
	}
	$("#modalHolder").modal();
	modalTitle.innerHTML = '<label>Contenedores de ' + node.text + '</label>';
	modalBody.innerHTML = '<div class="form-horizontal">'
			+ '<div class="form-group">'
			+ '<div class="col-md-12">'
			+ '<input id="newHolder" type="text" class="form-control" placeholder="Nombre del nuevo contenedor">'
			+ '</div>'
			+ '</div>'
			+ '<div class="form-group">'
			+ '<div class="col-md-12">'
			+ '<input id="amountHolder" type="number" class="form-control" placeholder="Cantidad de contenedores">'
			+ '</div>'
			+ '</div>'
			+ '<div class="form-group">'
			+ '<div class="col-md-12">'
			+ '<input id="description" type="text" class="form-control" placeholder="Descripcion">'
			+ '</div>'
			+ '</div>'
			+ '<div class="form-group">'
			+ '<div class="col-md-4">'
			+ '<label>Largo (cm)</label>'
			+ '<input type="number" class="form-control" placeholder="Largo (cm)" id="lenght">'
			+ '</div>'
			+ '<div class="col-md-4">'
			+ '<label>Ancho (cm)</label>'
			+ '<input type="number" class="form-control" placeholder="Ancho (cm)" id="width">'
			+ '</div>'
			+ '<div class="col-md-4">'
			+ '<label>Alto (cm)</label>'
			+ '<input type="number" class="form-control" placeholder="Alto (cm)" id="high">'
			+ '</div>'
			+ '</div>' // end form-group

			+ '<div class="form-group">'
			+ '<div class="col-md-4">'

			+ '</div>'
			+ '<div class="col-md-4">'

			+ '</div>'
			+ '<div class="col-md-4">'
			+ ' <button class="btn btn-primary" type="button" onclick="addHolders()" style="float: right; width: -webkit-fill-available">Agregar</button>'
			+ '</div>' + '</div>'

			+ '</div>' + '<input id="idLevelHidden" type="hidden" value="'
			+ node.id + '">' + '</div>'
	loadTableHolders(node.id);
}

function addHolders() {
	var modalBody2 = document.getElementById('modalBody2');
	var modalTitle2 = document.getElementById('modalTitle2');
	var btnAceptarModal2 = document.getElementById('btnAceptarModal2');
	var amountHolder = document.getElementById("amountHolder").value;
	var btnNo = document.getElementById('btnNoModal2');
	var holderName = document.getElementById("newHolder").value;
	var idLevel = document.getElementById("idLevelHidden").value;
	var lenght = document.getElementById("lenght").value;
	var width = document.getElementById("width").value;
	var high = document.getElementById("high").value;
	var description = document.getElementById("description").value;
	if (holderName != "" && amountHolder != "") {
		var holder = {
			"id" : idLevel,
			"amountHolder" : amountHolder,
			"nameHolder" : holderName,
			"lenghtHolder" : lenght,
			"widthHolder" : width,
			"highHolder" : high,
			"descriptionHolder" : description
		}
		$.ajax({
			type : "POST",
			contentType : 'application/json; charset=utf-8',
			dataType : 'json',
			data : JSON.stringify(holder),
			url : "/sgl/depositos/addHolders",
			success : function(response) {
				switch (response) {
				case 0: // error
					btnNo.style.display = 'none';
					btnAceptarModal2.textContent = "Aceptar";
					modalTitle2.innerHTML = 'Error';
					modalBody2.innerHTML = 'Ha ocurrido un error';
					btnAceptarModal2.onclick = function() {
						location.reload();
					}
					$("#modal2").modal();
					break;
				case 1: // registro correcto
					loadTableHolders(idLevel);
					document.getElementById("amountHolder").value = "";
					document.getElementById("newHolder").value = "";
					document.getElementById("idLevelHidden").value = "";
					document.getElementById("lenght").value = "";
					document.getElementById("width").value = "";
					document.getElementById("high").value = "";
					document.getElementById("description").value = "";
					break;
				}
			},
			error : function(response) {
				if (response.status == 403) {
					window.location.replace("/sgl/403");
				}
			}
		});
	} else {
		modalTitle2.innerHTML = 'Campos obligatorios';
		modalBody2.innerHTML = 'Debe ingresar nombre y cantidad';
		btnAceptarModal2.onclick = function() {
			$("#modal2").modal('hide');
		}
		$("#modal2").modal();
	}
}

function loadTableHolders(idLevel) {
	var btnAceptarModalHolder = document
			.getElementById('btnAceptarModalHolder');
	btnAceptarModalHolder.onclick = function() {
		location.reload();
	}
	var modalBody = document.getElementById('modalBodyHolder2');
	var tabla = "";
	modalBody.innerHTML = "";
	$
			.ajax({
				type : "POST",
				url : "/sgl/depositos/loadHolders/" + idLevel,
				success : function(response) {
					if (response.length != 0) {
						tabla = '<br><table class="table table-bordered table-hover">'
								+ '<thead style="text-align: center; font-weight: bolder">'
								+ '<tr class="active">'
								+ '<td>Contenedor</td>'
								+ '<td>Descripcion</td>'
								+ '<td>Largo (cm)</td>'
								+ '<td>Ancho (cm)</td>'
								+ '<td>Alto (cm)</td>'
								+ '<td>Eliminar</td>'
								+ '</tr>'
								+ '</thead>'
								+ '<tbody style="font-size: 12px">';
						for (var i = 0; i < response.length; i++) {
							var name = response[i].nameHolder;
							var lenght = "-";
							if (response[i].lenghtHolder != null) {
								lenght = response[i].lenghtHolder;
							}
							var width = "-";
							if (response[i].widthHolder != null) {
								width = response[i].widthHolder;
							}
							var high = "-";
							if (response[i].highHolder != null) {
								high = response[i].highHolder;
							}
							var description = "-";
							if (response[i].descriptionHolder != null) {
								description = response[i].descriptionHolder;
							}
							var tr = '<tr style="text-align: center;"><td>'
									+ name
									+ "</td>"
									+ '<td>'
									+ description
									+ "</td>"
									+ '<td>'
									+ lenght
									+ "</td>"
									+ '<td>'
									+ width
									+ "</td>"
									+ '<td>'
									+ high
									+ "</td>"
									+ '<td >'
									+ '<a style="color: red;" onclick="loadModalDeleteHolder('
									+ response[i].idHolder
									+ ','
									+ idLevel
									+ ')"'
									+ 'title="Quitar contenedor"'
									+ 'class="glyphicon glyphicon-remove "></a>'
									+ "</td>" + "<tr> ";
							tabla += tr;
						}
						tabla += '</tbody></table>';
						modalBody.innerHTML = tabla;
					}
				}
			})
}

function loadModalDeleteHolder(idHolder, idLevel) {
	var modalBody = document.getElementById('modalBody2');
	var modalTitle = document.getElementById('modalTitle2');
	var btnAceptarModal2 = document.getElementById('btnAceptarModal2');
	var btnNo = document.getElementById('btnNoModal2');
	modalTitle.innerHTML = 'Confirmaci&oacuten';
	modalBody.innerHTML = 'Est&aacute seguro que desea eliminar este contenedor?';
	btnNo.style.display = '';
	btnAceptarModal2.textContent = "Si";
	btnAceptarModal2.onclick = function() {
		deleteHolder(idHolder, idLevel);
		$("#modal2").modal('hide');
	}
	btnNo.onclick = function() {
		// Reset del modal2 a su estado inicial
		btnNo.style.display = 'none';
		btnAceptarModal2.textContent = "Aceptar";
		$("#modal2").modal('hide');
	}
	$("#modal2").modal();
}

function deleteHolder(idHolder, idLevel) {
	$.ajax({
		type : "POST",
		url : "/sgl/depositos/deleteHolder/" + idHolder + "/" + idLevel,
		success : function(response) {
			loadTableHolders(idLevel);
		},
		error : function(response) {
			if (response.status == 403) {
				window.location.replace("/sgl/403");
			}
		}
	})
}

function loadModifyGrouper(modalBody, modalTitle, node) {
	$
			.ajax({
				type : "POST",
				url : "/sgl/depositos/loadGrouperData/" + node.id,
				success : function(response) {
					var htmlLevelName;
					if (response.levelName == "Deposito") {// Si es depósito
															// que no se pueda
															// modificar
						htmlLevelName = '<input type="text" class="form-control" id="levelName" placeholder="Nombre nivel" value="'
								+ response.levelName + '" disabled>';
					} else {
						htmlLevelName = '<input type="text" class="form-control" id="levelName" placeholder="Nombre nivel" value="'
								+ response.levelName + '" >';
					}
					modalTitle.innerHTML = '<label>Modificar agrupador</label>';
					modalBody.innerHTML = '<div class="form-horizontal">'
							+ '<div class="form-group">'
							+ '<div class="col-md-12">'
							+ '<label>Nombre nivel</label>'
							+ htmlLevelName
							+ '</div>'
							+ '</div>'
							+ '<div class="form-group">'
							+ '<div class="col-md-12">'
							+ '<label>Nivel superior</label>'
							+ '<input type="text" class="form-control" id="superiorAuthorizing" value="'
							+ response.parentText
							+ '" disabled>'
							+ '</div>'
							+ '</div>'
							+ '<input id="parendIdHidden" type="hidden" value="'
							+ response.parent + '">' + '</div>' + '</div>'
				}
			})
	var btnAceptarModal = document.getElementById('btnAceptarModal');
	btnAceptarModal.onclick = function() {
		saveGrouperLevel(node.id);
	}
	$("#modal").modal();
}