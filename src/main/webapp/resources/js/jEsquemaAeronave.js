
$(document).ready(function() {
	$('[data-toggle="tooltip"]').tooltip();
//	var id = document.getElementById('id').value;
//	if (id != "") {
//		findMaterial();
//	}
});

function findComponents() {
	document.getElementById('btnGuardar').disabled = true;
	$
		.ajax({
			type : "POST",
			contentType : 'application/json; charset=utf-8',
			dataType : 'json',
			url : "/sgl/catalogacion/esquemaAeronave/findComponents/" + document.getElementById('idAeronave').value,
			success : function(response) {
				document.getElementById('materials').innerHTML = "";
				document.getElementById('components').innerHTML ="";
				if (response.length != 0) {
					var div = '<h3>Componentes Aeronave</h3>'
						+ '<div style="background-color: rgba(255, 255, 255, 0.68)">'
						+ '<table id="componentTable" class="table table-hover ">'
						+ '<thead style="text-align: center; font-weight: bolder">'
						+ '<tr class="active">'
						+ '<td>SYCO/NRO. DOC.</td>'
						+ '<td>Nro. Figura</td>'
						+ '<td>Nro. Orden</td>'
						+ '<td>Nro. de Parte</td>'
						+ '<td>Designación</td>'
						+ '<td>Fabricante</td>'
						+ '<td>Cant.</td>'
						+ '</tr>'
						+ '</thead>'
						+ '<tbody>';
					for (var i = 0; i < response.length; i++) {
						div += "<tr onclick='findMaterials(" + response[i].id + ")'>"
						+"<td>" + response[i].identifier
						+ "</td>" + "<td>" + response[i].figureNumber
						+ "</td>" + "<td>" + response[i].orden + "</td>"
						+ "<td>" + response[i].catalogo.partNumber + "</td>"
						+ "<td>" + response[i].catalogo.designacion
						+ "</td>" + "<td>"
						+ response[i].catalogo.producer.code + "</td>"
						+ "<td>" + response[i].amount + "</td>";
					}
					div += '</tbody>'
						+ '</table>'
						+ '</div>';
					document.getElementById('components').innerHTML = div;
					$('#componentTable').DataTable({bInfo: false });
				}
			}
		})
}

function findMaterials(idComponent) {
	document.getElementById('btnGuardar').disabled = true;
	var component = {
			"id" : null,
			"material":null,
			"component" : {
				"id" : idComponent
			},
			"aeronave" : {
				"id" : document.getElementById('idAeronave').value,
			}
		}
	
	$
		.ajax({
			type : "POST",
			contentType : 'application/json; charset=utf-8',
			dataType : 'json',
			url : "/sgl/catalogacion/esquemaAeronave/findMaterials",
			data : JSON.stringify(component),
			success : function(response) {
				document.getElementById('component').value = idComponent;
				if (response.mountedMaterials.length != 0) {
					var div = '<h3>Materiales Montados</h3>'
						+ '<div style="background-color: rgba(255, 255, 255, 0.68)">'
						+ '<table id="mountedMaterials" class="table table-hover ">'
						+ '<thead style="text-align: center; font-weight: bolder">'
						+ '<tr class="active">'
						+ '<td>Nro. Serie</td>'
						+ '<td>Nro. Figura</td>'
						+ '<td>Estado</td>'
						+ '</tr>'
						+ '</thead>'
						+ '<tbody>';
					for (var i = 0; i < response.mountedMaterials.length; i++) {
						div += "<tr onclick='selectMaterial(" + response.mountedMaterials[i].id + ")'>"
						+"<td>" + response.mountedMaterials[i].serialNumber
						+ "</td>" + "<td>" 
						+ "</td>" + "<td>" + "</td>";
					}
					div += '</tbody></table></div>';
					document.getElementById('materialsAeronave').innerHTML = div;
					$('#mountedMaterials').DataTable({bInfo: false});
				}
				
				if (response.availableMaterials.length != 0) {
					var div = '<h3>Materiales Disponibles</h3>'
						+ '<div style="background-color: rgba(255, 255, 255, 0.68)">'
						+ '<table id="availableMaterials" class="table table-hover ">'
						+ '<thead style="text-align: center; font-weight: bolder">'
						+ '<tr class="active">'
						+ '<td>Nro. Serie</td>'
						+ '<td>Nro. Figura</td>'
						+ '<td>Estado</td>'
						+ '</tr>'
						+ '</thead>'
						+ '<tbody>';
					for (var i = 0; i < response.availableMaterials.length; i++) {
						div += "<tr onclick='selectMaterial(" + response.availableMaterials[i].id + ")'>"
						+"<td>" + response.availableMaterials[i].serialNumber
						+ "</td>" + "<td>" 
						+ "</td>" + "<td>" + "</td>";
					}
					div += '</tbody></table></div>';
					document.getElementById('materials').innerHTML += div;
					$('#availableMaterials').DataTable({bInfo: false});
				}
				
			}
		})
}

function selectMaterial(idMaterial) { 
	document.getElementById('material').value = idMaterial;
	document.getElementById('btnGuardar').disabled = false;
}