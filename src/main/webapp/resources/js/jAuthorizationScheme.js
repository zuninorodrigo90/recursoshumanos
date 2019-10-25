$(document).ready(function() {
	$.ajax({
		type : "GET",
		url : "/sgl/administracion/authorizationScheme/loadLevels",
		success : function(response) {
			if (response.length != 0) {
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
				}).on('hover_node.jstree', function(e, data) {
					$("#" + data.node.id).prop('title', 'Taller: ' + data.node.original.title);
				})
			} else {
				//Cargar modal definir root
				var modalBody = document.getElementById('modalBody');
				var modalTitle = document.getElementById('modalTitle');
				var btnAceptarModal = document.getElementById('btnAceptarModal');
				btnAceptarModal.onclick = function() {
					saveRootUser();
				}
				modalTitle.innerHTML = 'Usuario padre';
				modalBody.innerHTML = '<div class="form-horizontal">'
					+ '<div class="form-group">'
					+ '<div class="col-md-12">'
					+ '<label>Nombre nivel</label>'
					+ '<input type="text" class="form-control" id="levelName" placeholder="Nombre nivel">'
					+ '</div>'
					+ '</div>'
					+ '<div class="form-group">'
					+ '<div class="col-md-12">'
					+ '<label>Nuevo autorizante</label>'
					+ '<input type="text" class="form-control" id="newRootUser" placeholder="Nuevo autorizante" onkeyup="if (this.value.length == 1) loadUsers()">'
					+ '</div>'
					+ '</div>'
					+ '<div class="form-group">'
					+ '<div class="col-md-12">'
					+ '<label>C&oacutedigo de taller</label>'
					+ '<input type="number" class="form-control" id="tallerCode" placeholder="Codigo de taller">'
					+ '</div>'
					+ '</div>'
					+ '<div class="checkbox">' + '<label>'
					+ '<input type="checkbox" id="receiveEmails">Recibe emails?'
					+ '</label>' + '</div>' + '</div>' + '</div>'
					
				$("#modal").modal();
			}
		}
	});
});

function saveRootUser() {
	var newRootUser = document.getElementById('newRootUser').value;
	var btnAceptarModal2 = document.getElementById('btnAceptarModal2');
	var levelName = document.getElementById('levelName').value;
	var tallerCode = document.getElementById('tallerCode').value;
	if (levelName == "" || newRootUser == "" || tallerCode == "") {
		modalTitle2.innerHTML = 'Complete todos los campos';
		modalBody2.innerHTML = 'Debe completar todos los campos';
		btnAceptarModal2.onclick = function() {
			$("#modal2").modal('hide');
		}
		$("#modal2").modal();
	} else {
		var authorizationLevel = {
				"id" : null,
				"levelName" : levelName,
				"newAuthorizing" : newRootUser,
				"tallerCode" : tallerCode,
				"superiorAuthorizingId" : null,
				"receiveEmail" : document.getElementById('receiveEmails').checked
			}
		$.ajax({
			type:"POST",
			contentType : 'application/json; charset=utf-8',
			dataType : 'json',
			data : JSON.stringify(authorizationLevel),
			url: "/sgl/administracion/authorizationScheme/saveRootUser/",
			success(response) {
				//1 exitoso
				if (response == 1) {
					location.reload();
				}
				//0 error
				if (response == 0) {
					modalTitle2.innerHTML = 'Error';
					modalBody2.innerHTML = 'Seleccione un usuario v&aacutelido';
					btnAceptarModal2.onclick = function() {
						$("#modal2").modal('hide');
					}
					$("#modal2").modal();
				}
			},
			error : function(response) {
				if (response.status == 403) {
					window.location.replace("/sgl/403");
				}
		}
		})
	}
}

function customMenu(node) {
	var modalBody = document.getElementById('modalBody');
	var modalTitle = document.getElementById('modalTitle');
	// The default set of all items
	if (node.icon == "glyphicon glyphicon-folder-open") {
		var items = {
			"Autorizantes" : {
				"separator_before" : true,
				"icon" : "glyphicon glyphicon-folder-open",
				"separator_after" : false,
				"label" : "Autorizantes",
				"action" : false,
				"submenu" : {
					"Nuevo autorizante" : {
						"separator_before" : false,
						"separator_after" : false,
						"label" : "Nuevo autorizante",
						"action" : function(data) {
							loadModalNewAuthorizing(modalBody, modalTitle, node);
						}
					},
					"Modificar autorizante" : {
						"separator_before" : false,
						"separator_after" : false,
						"label" : "Modificar autorizante",
						"action" : function(data) {
							loadModifyAuthorizing(modalBody, modalTitle, node);
						}
					},
					"Eliminar autorizante" : {
						"separator_before" : false,
						"icon" : false,
						"_disabled" : function(data) {
							return hasChildren(node);
						},
						"separator_after" : false,
						"label" : "Eliminar autorizante",
						"title" : "Si el autorizante tiene usuarios a cargo, debe reasignarlos a otro autorizante",
						"action" : function(data) {
							loadModalDeleteAuthorizing(node);
						}
					}
				}
			},

			"Usuarios" : {
				"separator_before" : true,
				"icon" : "glyphicon glyphicon-user",
				"separator_after" : false,
				"label" : "Usuarios",
				"action" : function(data) {
					loadModalNewUsers(node);
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

function loadModalNewAuthorizing(modalBody, modalTitle, node) {
	var btnAceptarModal = document.getElementById('btnAceptarModal');
	btnAceptarModal.onclick = function() {
		saveAuthorizationLevel(null);
	}
	$("#modal").modal();
	modalTitle.innerHTML = '<label>Nuevo autorizante</label>';
	modalBody.innerHTML = '<div class="form-horizontal">'
			+ '<div class="form-group">'
			+ '<div class="col-md-12">'
			+ '<label>Nombre nivel</label>'
			+ '<input type="text" class="form-control" id="levelName" placeholder="Nombre nivel">'
			+ '</div>'
			+ '</div>'
			+ '<div class="form-group">'
			+ '<div class="col-md-12">'
			+ '<label>Nuevo autorizante</label>'
			+ '<input type="text" class="form-control" id="newAuthorizing" placeholder="Nuevo autorizante" onkeyup="if (this.value.length == 1) loadUsers()">'
			+ '</div>'
			+ '</div>'
			+ '<div class="form-group">'
			+ '<div class="col-md-12">'
			+ '<label>C&oacutedigo de taller</label>'
			+ '<input type="number" class="form-control" id="tallerCode" placeholder="Codigo de taller">'
			+ '</div>'
			+ '</div>'
			+ '<div class="form-group">'
			+ '<div class="col-md-12">'
			+ '<label>Autorizante superior</label>'
			+ '<input type="text" class="form-control" id="superiorAuthorizing" value="'
			+ node.text + '" disabled>' + '</div>' + '</div>'
			+ '<input id="parendIdHidden" type="hidden" value="' + node.id
			+ '">' + '<div class="checkbox">' + '<label>'
			+ '<input type="checkbox" id="receiveEmails">Recibe emails?'
			+ '</label>' + '</div>' + '</div>' + '</div>'

}

function saveAuthorizationLevel(idLevel) {
	var modalBody2 = document.getElementById('modalBody2');
	var modalTitle2 = document.getElementById('modalTitle2');
	var btnAceptarModal2 = document.getElementById('btnAceptarModal2');
	var levelName = document.getElementById('levelName').value;
	var newAuthorizing = document.getElementById('newAuthorizing').value;
	var tallerCode = document.getElementById('tallerCode').value;
	if (levelName == "" || newAuthorizing == "" || tallerCode == "") {
		modalTitle2.innerHTML = 'Complete todos los campos';
		modalBody2.innerHTML = 'Debe completar todos los campos';
		btnAceptarModal2.onclick = function() {
			$("#modal2").modal('hide');
		}
		$("#modal2").modal();
	} else {
		var authorizationLevel = {
			"id" : idLevel,
			"levelName" : levelName,
			"newAuthorizing" : newAuthorizing,
			"tallerCode" : tallerCode,
			"superiorAuthorizingId" : document.getElementById('parendIdHidden').value,
			"receiveEmail" : document.getElementById('receiveEmails').checked
		}
		$
				.ajax({
					type : "POST",
					contentType : 'application/json; charset=utf-8',
					dataType : 'json',
					data : JSON.stringify(authorizationLevel),
					url : "/sgl/administracion/authorizationScheme/save",
					success : function(response) {
						if (response == 2) {
							// Nivel existente
							modalTitle2.innerHTML = 'Nivel existente';
							modalBody2.innerHTML = 'El usuario ya se encuentra en otro nivel. Debe seleccionar otro usuario';
							btnAceptarModal2.onclick = function() {
								$("#modal2").modal('hide');
							}
							$("#modal2").modal();
						} else {
							if (response == 1) {
								// &Eacutexito
								modalTitle2.innerHTML = '&Eacutexito';
								modalBody2.innerHTML = 'Nivel de autorizacion guardado con &eacutexito';
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

function loadUsers() {
	var newAuthorizingInput = document.getElementById('newAuthorizing');
	var users;
	$
			.ajax({
				type : "POST",
				url : "/sgl/administracion/authorizationScheme/loadUsers/"
						+ newAuthorizingInput.value,
				success : function(response) {
					users = response;
					$("#newAuthorizing").autocomplete({
						source : users
					});
					$("#newUser").autocomplete({
						source : users
					});
					$("#newAuthorizing").autocomplete("option", "appendTo",
							"#modal");
					$("#newUser").autocomplete("option", "appendTo",
							"#modalUsers");
				}
			})
}

function loadUsers2() {
	var newUser = document.getElementById('newUser');
	var users;
	$.ajax({
		type : "POST",
		url : "/sgl/administracion/authorizationScheme/loadUsers/" + newUser.value,
		success : function(response) {
			users = response;
			$("#newUser").autocomplete({
				source : users
			});
			$("#newUser").autocomplete("option", "appendTo", "#modalUsers");
		}
	})
}

function hasChildren(node) {
	return node.children.length > 0 ? true : false;
}

function loadModalDeleteAuthorizing(node) {
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
		modalTitle.innerHTML = 'Confirmac&oacuten';
		modalBody.innerHTML = 'Est&aacute seguro que desea eliminar este autorizante?';
		btnAceptarModal.onclick = function() {
			deleteAuthorizing(node.id);
		}
		$("#modal").modal();
	}
}

function deleteAuthorizing(id) {
	$
			.ajax({
				type : "POST",
				dataType : 'json',
				url : "/sgl/administracion/authorizationScheme/delete/" + id,
				success : function(response) {
					if (response == 1) {
						// &Eacutexito
						modalTitle2.innerHTML = '&Eacutexito';
						modalBody2.innerHTML = 'Nivel de autorizacion borrado con &eacutexito';
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

function loadModalModifyAuthorizing(node, modalTitle, modalBody) {
	var btnAceptarModal = document.getElementById('btnAceptarModal');
	$
			.ajax({
				type : "POST",
				url : "/sgl/administracion/authorizationScheme/getAuthorizationLevel/"
						+ node.id,
				success : function(response) {
					btnAceptarModal.onclick = function() {
						// modifyAuthorizationLevel();
					}
					$("#modal").modal();
					var checkbox = "";
					if (response.receiveEmail) {
						checkbox = '<input type="checkbox" id="receiveEmails" checked>';
					} else {
						checkbox = '<input type="checkbox" id="receiveEmails">';
					}
					modalTitle.innerHTML = '<label>Modificar autorizante</label>';
					modalBody.innerHTML = '<div class="form-horizontal">'
							+ '<div class="form-group">'
							+ '<div class="col-md-12">'
							+ '<label>Nombre nivel</label>'
							+ '<input type="text" class="form-control" placeholder="Nombre nivel" id="levelName" value="'
							+ response.levelName
							+ '">'
							+ '</div>'
							+ '</div>'
							+ '<div class="form-group">'
							+ '<div class="col-md-12">'
							+ '<label>Autorizante</label>'
							+ '<input type="text" class="form-control" id="newAuthorizing" placeholder="Autorizante" value="'
							+ response.managerText
							+ '" onkeyup="if (this.value.length == 1) loadUsers()">'
							+ '</div>'
							+ '</div>'
							+ '<div class="form-group">'
							+ '<div class="col-md-12">'
							+ '<label>C&oacutedigo de taller</label>'
							+ '<input type="number" class="form-control" id="tallerCode" placeholder="Codigo de taller" value="'
							+ response.tallerCode
							+ '">'
							+ '</div>'
							+ '</div>'
							+ '<div class="form-group">'
							+ '<div class="col-md-12">'
							+ '<label>Autorizante superior</label>'
							+ '<input type="text" class="form-control" id="superiorAuthorizing" value="'
							+ response.parentText
							+ '" disabled>'
							+ '</div>'
							+ '</div>'
							+ '<input id="parendIdHidden" type="hidden" value="'
							+ response.parent
							+ '">'
							+ '<div class="checkbox">'
							+ '<label>'
							+ checkbox
							+ 'Recibe emails?'
							+ '</label>' + '</div>' + '</div>' + '</div>'

				}
			});
}

function loadModalNewUsers(node) {
	var modalBody = document.getElementById('modalBodyUsers');
	var modalTitle = document.getElementById('modalTitleUsers');
	var btnAceptarModal = document.getElementById('btnAceptarModalUsers');
	btnAceptarModal.onclick = function() {
		$("#modalUsers").modal('hide');
	}
	$("#modalUsers").modal();
	modalTitle.innerHTML = '<label>Usuarios de ' + node.text + '</label>';
	modalBody.innerHTML = '<div class="form-horizontal">'
			+ '<div class="input-group">'
			+ '<input id="newUser" type="text" class="form-control" placeholder="Nuevo usuario" onkeyup="if (this.value.length == 1) loadUsers2()">'
			+ '<span class="input-group-btn">'
			+ ' <button class="btn btn-info" type="button" title="Agregar" onclick="addUser()">+</button>'
			+ '</span>' + '</div>'
			+ '<input id="idLevelHidden" type="hidden" value="' + node.id
			+ '">' + '</div>'
	loadTableUsers(node.id);
}

function loadTableUsers(idLevel) {
	var modalBody = document.getElementById('modalBodyUsers2');
	var tabla = "";
	modalBody.innerHTML = "";
	$
			.ajax({
				type : "POST",
				url : "/sgl/administracion/authorizationScheme/loadDependents/" + idLevel,
				success : function(response) {

					if (response.length != 0) {
						tabla = '<br><table class="table table-bordered table-hover">'
								+ '<thead style="text-align: center; font-weight: bolder">'
								+ '<tr class="active">'
								+ '<td>Usuario</td>'
								+ '<td>Eliminar</td>'
								+ '</tr>'
								+ '</thead>'
								+ '<tbody style="font-size: 12px">';
						for (var i = 0; i < response.length; i++) {
							var tr = '<tr style="text-align: center;"><td>'
									+ response[i].name
									+ "</td>"
									+ '<td >'
									+ '<a style="color: red;" onclick="loadModalDeleteDependent('
									+ response[i].id
									+ ','
									+ idLevel
									+ ')"'
									+ 'title="Quitar usuario de autorizante"'
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

function addUser() {
	var modalBody2 = document.getElementById('modalBody2');
	var modalTitle2 = document.getElementById('modalTitle2');
	var btnAceptarModal2 = document.getElementById('btnAceptarModal2');
	var btnNo = document.getElementById('btnNoModal2');
	var username = document.getElementById("newUser").value;
	var idLevel = document.getElementById("idLevelHidden").value;
	var newUser = document.getElementById("newUser");
	if (username != "") {
		$
				.ajax({
					type : "POST",
					url : "/sgl/administracion/authorizationScheme/addUser/" + username + "/"
							+ idLevel,
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
							loadTableUsers(idLevel);
							newUser.value = "";
							break;
						case 2: // el usuario no está en bd
							modalTitle2.innerHTML = 'Usuario no registrado en base de datos';
							modalBody2.innerHTML = 'Debe ingresar un nombre de usuario cargado en el sistema';
							btnAceptarModal2.onclick = function() {
								$("#modal2").modal('hide');
							}
							$("#modal2").modal();
							break;
						case 3: // user en otro level
							modalTitle2.innerHTML = 'Usuario en otro nivel';
							modalBody2.innerHTML = 'El usuario se encuentra asignado a otro nivel. ¿Desea reasignarlo a este autorizante?';
							btnNo.style.display = '';
							btnAceptarModal2.textContent = "Si";
							btnAceptarModal2.onclick = function() {
								reassignUser(username, idLevel);
								newUser.value = "";
							}
							btnNo.onclick = function() {
								// Reset del modal2 a su estado inicial
								btnNo.style.display = 'none';
								btnAceptarModal2.textContent = "Aceptar";
								$("#modal2").modal('hide');
							}
							$("#modal2").modal();
							
							break;
						case 4: // si ya está en ese level
							modalTitle2.innerHTML = 'Usuario ya cargado';
							modalBody2.innerHTML = 'El usuario ya pertenece al autorizante o es el mismo autorizante';
							btnAceptarModal2.onclick = function() {
								$("#modal2").modal('hide');
							}
							$("#modal2").modal();
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
		modalTitle2.innerHTML = 'Ingrese un usuario';
		modalBody2.innerHTML = 'Debe ingresar un usuario existente. Comience a tipear y se listaran los usuarios cargados';
		btnAceptarModal2.onclick = function() {
			$("#modal2").modal('hide');
		}
		$("#modal2").modal();
	}
}

function reassignUser(username, idLevel) {
	var modalBody2 = document.getElementById('modalBody2');
	var modalTitle2 = document.getElementById('modalTitle2');
	var btnAceptarModal2 = document.getElementById('btnAceptarModal2');
	var btnNo = document.getElementById('btnNoModal2');
	$.ajax({
		type : "POST",
		url : "/sgl/administracion/authorizationScheme/reassignUser/" + username + "/"
				+ idLevel,
		success : function(response) {
			if (response == 1) {
				// &Eacutexito
				loadTableUsers(idLevel);
				$("#modal2").modal('hide');
			} else {
				if (response == 0) {
					btnNo.style.display = 'none';
					btnAceptarModal2.textContent = "Aceptar";
					modalTitle2.innerHTML = 'Error';
					modalBody2.innerHTML = 'Ha ocurrido un error';
					btnAceptarModal2.onclick = function() {
						location.reload();
					}
					$("#modal2").modal();
				}
			}
		}
	})
}

function loadModalDeleteDependent(idDependent, idLevel) {
	var modalBody = document.getElementById('modalBody2');
	var modalTitle = document.getElementById('modalTitle2');
	var btnAceptarModal2 = document.getElementById('btnAceptarModal2');
	var btnNo = document.getElementById('btnNoModal2');
	modalTitle.innerHTML = 'Confirmaci&oacuten';
	modalBody.innerHTML = 'Est&aacute seguro que desea eliminar este usuario?';
	btnNo.style.display = '';
	btnAceptarModal2.textContent = "Si";
	btnAceptarModal2.onclick = function() {
		deleteDependent(idDependent, idLevel);
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

function deleteDependent(idDependent, idLevel) {
	$.ajax({
		type : "POST",
		url : "/sgl/administracion/authorizationScheme/deleteDependent/" + idDependent + "/"
				+ idLevel,
		success : function(response) {
			loadTableUsers(idLevel);
		},
		error : function(response) {
			if (response.status == 403) {
				window.location.replace("/sgl/403");
			}
		}
	})
}

function loadModifyAuthorizing(modalBody, modalTitle, node) {
	$
			.ajax({
				type : "POST",
				url : "/sgl/administracion/authorizationScheme/loadAuthorizingData/" + node.id,
				success : function(response) {
					var receiveMail = "";
					if (response.receiveEmail) {
						receiveMail = '<input type="checkbox" checked id="receiveEmails">Recibe emails?'
					} else {
						receiveMail = '<input type="checkbox" id="receiveEmails">Recibe emails?'
					}
					modalTitle.innerHTML = '<label>Modificar autorizante</label>';
					modalBody.innerHTML = '<div class="form-horizontal">'
							+ '<div class="form-group">'
							+ '<div class="col-md-12">'
							+ '<label>Nombre nivel</label>'
							+ '<input type="text" class="form-control" id="levelName" placeholder="Nombre nivel" value="'
							+ response.levelName
							+ '">'
							+ '</div>'
							+ '</div>'
							+ '<div class="form-group">'
							+ '<div class="col-md-12">'
							+ '<label>Autorizante</label>'
							+ '<input type="text" class="form-control" id="newAuthorizing" placeholder="Nuevo autorizante" value="'
							+ response.managerText
							+ '" onkeyup="if (this.value.length == 1) loadUsers()">'
							+ '</div>'
							+ '</div>'
							+ '<div class="form-group">'
							+ '<div class="col-md-12">'
							+ '<label>C&oacutedigo de taller</label>'
							+ '<input type="number" class="form-control" id="tallerCode" placeholder="Codigo de taller" value="'
							+ response.tallerCode
							+ '">'
							+ '</div>'
							+ '</div>'
							+ '<div class="form-group">'
							+ '<div class="col-md-12">'
							+ '<label>Autorizante superior</label>'
							+ '<input type="text" class="form-control" id="superiorAuthorizing" value="'
							+ response.parentText
							+ '" disabled>'
							+ '</div>'
							+ '</div>'
							+ '<input id="parendIdHidden" type="hidden" value="'
							+ response.parent
							+ '">'
							+ '<div class="checkbox">'
							+ '<label>'
							+ receiveMail
							+ '</label>'
							+ '</div>'
							+ '</div>' + '</div>'
				}
			})
	var btnAceptarModal = document.getElementById('btnAceptarModal');
	btnAceptarModal.onclick = function() {
		saveAuthorizationLevel(node.id);
	}
	$("#modal").modal();
}