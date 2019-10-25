$(document).ready(
		function() {
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
			;

//			$("#fechaOrigen").datepicker();
//			$("#fechaFin").datepicker();
			
			$("#fechaFin").datepicker({
				dateFormat : 'dd/mm/yy',
				changeMonth : true,
				maxDate : '0',
				changeYear: true
			});
			$("#fechaOrigen").datepicker({
				dateFormat : 'dd/mm/yy',
				changeMonth : true,
				changeYear: true,
				maxDate : '0',
				onSelect : function(date) {
					var from = date.split("/");
					var endDate = new Date(new Date(from[2], from[1] - 1, from[0]).getTime());
					$("#fechaFin").datepicker("option", "minDate", endDate);
					$("#fechaFin").datepicker("option", "maxDate", '+2y');

				}
			});
			
			
			
			
			$('[data-toggle="tooltip"]').tooltip();
			$('[data-toggle="popover"]').popover();
			$(window).keydown(function(event) {
				if (event.keyCode == 13) {
					event.preventDefault();
					return false;
				}
			});
		});
function findElementById(id) {
	document.getElementById('form-vigente').style.display = 'block';
	var Row = document.getElementById(id);
	var Cells = Row.getElementsByTagName("td");
	document.getElementById('id').value = id;
	document.getElementById('matricula').value = Cells[0].innerText;
	document.getElementById('matricula').disabled=true;
	document.getElementById('fechaOrigen').value = Cells[1].innerText;
	document.getElementById('fechaFin').value = Cells[2].innerText;
	document.getElementById('sistemaArmas').value = (Cells[3].id).substr(2);
	document.getElementById('horasVuelo').value = Cells[4].innerText;
//	document.getElementById('vigente').checked = document
//			.getElementById('idHiddenVigente' + id).checked;
}
