$(document).ready(function() {
	BuscarPermisos();
});

/**
 * Busca los permisos de los distintos perfiles. Recorre todos los td de la
 * clase permiso y para cada uno de ellos hace un request ajax donde va y busca
 * que dibujito tiene que mostrar, si el de la X o el del tick.
 * 
 * @returns
 */
function BuscarPermisos() {
	var prefijoPath = "${pageContext.request.contextPath}";
	$(".permiso")
			.each(
					function() {
						var permisoBuscar = $(this).attr("id");
						var url = "/recursoshumanos/administracion/informar?permiso="
								+ permisoBuscar;
						// Para cada uno, pido un json
						$
								.getJSON(
										url,
										{},
										function(permiso) {
											if (permiso != null) {
												if (permiso)
													$('#' + permisoBuscar)
															.html(
																	'<input onclick="cambiarPermiso(this)" type="checkbox" checked>');
												else
													$('#' + permisoBuscar)
															.html(
																	'<input onclick="cambiarPermiso(this)" type="checkbox">');
											}
										});
					});
}
/**
 * Recibe sobre que TD se hizo click. Con eso busco el id, y mando un request al
 * sistema para modificar el permiso.
 * 
 * @param item
 * @returns
 */
function cambiarPermiso(node) {
	var permisoBuscar = node.parentElement.id;
	var url = "/recursoshumanos/administracion/modificar?permiso=" + permisoBuscar;
	// Para cada uno, pido un json
	$.ajax({
		type : "POST",
		url : url,
		success : function(permiso) {
			if (permiso !== null) {
				if (permiso == "true")
					$('#' + permisoBuscar).html(
							'<input type="checkbox" checked>');
				else if (permiso == "false")
					$('#' + permisoBuscar).html('<input type="checkbox">');

			}
		}
	})
}
