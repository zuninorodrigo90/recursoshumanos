<%-- 
    Document   : empleado
    Created on : 09-nov-2019, 17:24:12
    Author     : Aye
--%>

<%@page contentType="text/html" pageEncoding="ISO-8859-1"%>

<!doctype html>
<html lang="en">
    <head>
        <title>Consulta Empleados</title>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    </head>

    <body>
        <div class="container">
            <div class="row">
                <!-- ALTA DE EMPLEADO-->
                <div class="col-md-3">
                    <h2> Alta de empleado </h2>
                    <form>
                        
                        <div class="form-group">
                            <label> Nombre </label>
                            <input class="form-control" id="nombre" placeholder="Ingrese un nombre"></input>
                        </div>
                        <div class="form-group">
                            <label> Apellido </label>
                            <input class="form-control" id="apellido" placeholder="Ingrese un apellido"></input>
                        </div>
                        <div class="form-group">
                            <label> DNI </label>
                            <input class="form-control" id="dni" placeholder="Ingrese un DNI"></input>
                        </div>
                        <div class="form-group">
                            <label> Tipo de empleado </label>
                            <select class="form-control" id="tipoDeEmpleado">
                                <option hidden>Elija un tipo de empleado</option>
                                <option value="1">Contratado</option>
                                <option value="2">Efectivo</option>
                            </select>
                        </div>

                        <div class="form-group" id="aportes">
                            <label> �Realiza aportes? </label>
                            <select class="form-control">
                                <option>S�</option>
                                <option>No</option>
                            </select>
                        </div>

                        <div class="form-group" id="categoria">
                            <label> Categor�a </label>
                            <select class="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label> Ingrese una fecha de nacimiento </label>
                            <input id="date" type="date"></input>
                        </div>

                        <div class="form-group">
                            <label> Ingrese una fecha de ingreso </label>
                            <input id="date" type="date"></input>
                        </div>



                        <div class="form-group">
                            <button type="submit" class="btn btn-primary"> Dar de alta </button>
                        </div>
                    </form>
                </div>

                <!-- TABLA-->

                <div class="col-md-9">
                    <div class="container-fluid">
                        <h2>
                            Listado de empleados
                        </h2>
                        <c:if test="${not empty empleados}">
                            <div style="background-color: rgba(255, 255, 255, 0.68)">
                                <table id="myTable" class="table table-bordered table-hover table-responsive">
                                    <thead style="text-align: center; font-weight: bolder">
                                        <tr>
                                            <th> Legajo</th>
                                            <th> Nombre</th>
                                            <th> Apellido </th>
                                            <th> Tipo </th>
                                            <th> Categor�a </th>
                                            <th> Antig�edad </th>
                                            <th> Salario </th>
                                            <th> Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <c:forEach var="s" items="${empleados}">

                                        <tr id="${s.id }">
                                            <td> ${s.legajo} </td>
                                            <td>${s.nombre} </td>
                                            <td>${s.apellido} </td>
                                            <td> </td>
                                            <td> </td>
                                            <td> </td>
                                            <td> </td>
                                            <td class="text-center">
                                          
                                                <a href="empleado/eliminar/${s.id}" data-toggle="tabla"                                           
                                                   class="btn btn-danger btn-xs" href="#">
                                                    <span class="glyphicon glyphicon-remove triggerRemove"></span></a>
                                            </td>
                                        </tr>

                                    </c:forEach>
                                    </tbody>
                                </table>
                            </div>
                        </c:if>
                    </div>
                </div>



                <!-- Modal -->
                <div class="modal fade" id="modalRemove" tabindex="-1" role="dialog"
                     aria-labelledby="myModalLabel">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal"
                                        aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 class="modal-title" id="myModalLabel">Borrar registro de empleado</h4>
                            </div>
                            <div class="modal-body">�Est� seguro que desea borrar este
                                registro de empleado?</div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                                <a id="removeBtn" href="" class="btn btn-danger">Borrar</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <script src="/recursoshumanos/resources/js/jEmpleado.js"></script>      
    </body>

</html>
