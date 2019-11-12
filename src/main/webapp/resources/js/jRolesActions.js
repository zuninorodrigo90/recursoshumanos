$(document).ready(
		function() {
			$('[data-toggle="tabla"]').tooltip();
			$('[data-toggle="tooltip"]').tooltip();
		});

function loadModal(idPage) {
	$('#a'+ idPage).addClass('active');
	$.ajax({
		type : "GET",
		url : "/recursoshumanos/rolesActions/loadRolesActions/" + idPage,
		success : function(response) {
			if (response != "") {
				var columns='<td>'+"Roles/Acciones"+'</td>';
				var fila = '';				
				for(var i = 0; i<response.length; i++) {
					fila+= '<tr id="'+ response[i].role.id +'"><td>'+response[i].role.name+'</td>'
					for(var j = 0; j<response[i].pagePerActionsAuxList.length; j++) {
						if (response[i].pagePerActionsAuxList[j].permission) {
							fila+='<td>'+'<input type="checkbox" name="'+response[i].pagePerActionsAuxList[j].pagePerAction.id+'" checked>'+'</td>'
						} else {
							fila+='<td>'+'<input type="checkbox" name="'+response[i].pagePerActionsAuxList[j].pagePerAction.id+'">'+'</td>'	
						}
					}
					fila+='</tr>'
				}
				for (var j = 0; j<response[0].pagePerActionsAuxList.length; j++) {
					columns+= '<td>'+response[0].pagePerActionsAuxList[j].pagePerAction.action.name+'</td>'
				}
				var modalBody = document.getElementById('modalBody');
				var tabla = '<table id="myTable" class="table table-bordered table-hover">'
					+ '<thead style="text-align: center; font-weight: bolder">'
					+ '<tr class="active">'
					+columns+
					+ '</tr>'
					+ '</thead>'
					+ '<tbody style="font-size: 12px">'
				+fila	
				tabla += '</tbody></table>'
				modalBody.innerHTML = tabla;
				showModal();
			}
			error: alert("");
		}
	})
}


function save() {
	var resultadoView=[];
	var table = document.getElementById("myTable"), cells;
	//A la fila 0 no la tengo en cuenta porque es el encabezado de la tabla (acciones) y a la columna 0 no la tengo en cuenta porque son los nombres de los roles
	for(var i = 1; i < table.rows.length; i++) {
	    cells = table.rows[i].cells;
	    for( c=1; c<cells.length; c++) {
	        cell = cells[c];
	        var resultadoViewIndividual={
	        	"idRole" : + table.rows[i].id,
				"idPagePerAction" : cell.getElementsByTagName('input')[0].name,
				"permission" : cell.getElementsByTagName('input')[0].checked
	        }
	        resultadoView.push(resultadoViewIndividual);
	    }
	}
	var jsonParameter = encodeURIComponent(JSON.stringify(resultadoView));
	$.ajax({
		type : "POST",
		contentType : 'application/json; charset=utf-8',
		dataType : 'json',
		data : JSON.stringify(resultadoView),
		url : "/recursoshumanos/rolesAcciones/" + jsonParameter,
	})
	hideModal();
}

function showModal() {
	$("#myModal").modal();
}

function hideModal() {
	$("a").removeClass('active');
	$("#myModal").modal('hide');
}