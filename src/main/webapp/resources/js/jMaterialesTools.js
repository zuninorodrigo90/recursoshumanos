function loadMaterials(component) {
	var materialInput = document.getElementById('partNumber');
	materialInput = component;
	var materials = [];
	$.ajax({
		type : "POST",
		url : "/sgl/equivalentes/equivalenteIndividual/loadMaterials/"
			+ materialInput.value,
		success : function(response) {
			for(var i = 0; i < response.length; i++ ){
				var aux = {
						"value" : response[i],
						"label" : response[i],
						"desc" : response[i]
					}
				materials.push(aux);
			}
			$("#"+component.id+"").autocomplete({
				source : function(req, response) {
					term = stripNonAlphaNumeric(req.term);
					var re = $.ui.autocomplete.escapeRegex(term);
					var matcher = new RegExp("^" + re, "i");

					response($.grep(materials, function(item) {
						return matcher.test(stripNonAlphaNumeric(item.label));
					}));
				},
				focus : function(event, ui) {
					$(".autocomplete").val(ui.item.label);
					return false;
				}
			})

		}
	})
}

function stripNonAlphaNumeric(string) {
	var r = string.toLowerCase();
	r = r.replace(new RegExp("[^A-z0-9]", 'g'), "");
	return r;

}

function loadProducers(component) {
	var producerInput = component;
	var producers;
	$.ajax({
		type : "POST",
		url : "/sgl/equivalentes/equivalenteIndividual/loadProducers/"
			+ producerInput.value,
		success : function(response) {
			producers = response;
			$("#"+component.id+"").autocomplete({
				source : producers
			});
		}
	})
}

