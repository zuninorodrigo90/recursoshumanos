$(document).ready(function() {
	$('#myTable').DataTable();
});

function addOrRemoveRole(cell) {

}

function loadModal(id, name) {
	$(".roles").each(function() {
		var rowRoleId = $(this).attr("id");
		document.getElementById(rowRoleId).checked = false;
	});
	document.getElementById('lblModalDialog').innerHTML = 'Roles asignados a '
			+ name;
	document.getElementById('idUser').value = id;
	$
			.ajax({
				type : "POST",
				url : "/sgl/administracion/asignarRoles/findRoles/" + id,
				success : function(response) {
					for (var i = 0; i < response.length; i++) {
						document.getElementById('role' + response[i].id).checked = true;
					}
				}
			});

	$("#modalDialog").modal();
}

function addOrRemoveRole(idRole) {
	var user = {
		id : document.getElementById('idUser').value,
		roles : [ {
			id : idRole
		} ]
	};
	var role = {
		id : idRole
	}
	// A la fila 0 no la tengo en cuenta porque es el encabezado de la tabla
	// (acciones) y a la columna 0 no la tengo en cuenta porque son los nombres
	// de los roles

	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=utf-8',
		dataType : 'json',
		data : JSON.stringify(user),
		url : "/sgl/administracion/asignarRoles/assingRole"
	// success : function(response) {
	//			
	// }
	})
}

function showHistorial() {
	var body = document.getElementById('tbodyHistorial');
	body.innerHTML = "";
	$
			.ajax({
				type : "POST",
				contentType : 'application/json; charset=utf-8',
				dataType : 'json',
				data : JSON.stringify(document.getElementById('idUser').value),
				url : "/sgl/administracion/asignarRoles/showHistorial",
				success : function(response) {
					if (response.length != 0) {
						for (var i = 0; i < response.length; i++) {
							body.innerHTML += '<tr><td>'
									+ response[i].role.name + '</td><td>'
									+ response[i].accion + '</td><td>'
									+ dateFormatter(new Date(response[i].date))
									+ '</td><td>'
									+ response[i].userActuator.name
									+ '</td></tr>';
						}
					} else {
						var tbodyHistorial = document.getElementById('tbodyHistorial');
						tbodyHistorial.innerHTML = '<tr><td colspan="4">El usuario NO posee asignación de roles</td></tr>';
					}
					$("#modalHistorial").modal();
				}
			})
}

function dateFormatter(date) {
	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
	var hour = date.getHours();
	var minutes = date.getMinutes();
	if (day < 10) {
		day = '0' + day;
	}
	if (month < 10) {
		month = '0' + month;
	}
	if (hour < 10) {
		hour = '0' + hour;
	}
	if (minutes < 10) {
		minutes = '0' + minutes;
	}
	return day + '/' + month + '/' + year + ' ' + hour + ':' + minutes;
}