$(document).ready(function () {

//Oculta los fields Aportes y Categoría y los muestra según lo seleccionado en Tipo de empleado

    $("#aportes").hide();
    $("#categoria").hide();

    $("#tipoDeEmpleado").change(function () {
        if (($('#tipoDeEmpleado option[value="1"]').is(':selected'))) {
            $('#categoria').show();
            $("#aportes").hide();

        } else if (($('#tipoDeEmpleado option[value="2"]').is(':selected'))) {
            $("#aportes").show();
            $("#categoria").hide();
        }
    });

    //Modal

    $(".triggerRemove").click(function (e) {
                e.preventDefault();
                $("#modalRemove #removeBtn").attr("href",
                        $(this).attr("href"));
                $("#modalRemove").modal();
            });


});