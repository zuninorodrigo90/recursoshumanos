<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1"%>
<%@ include file="../layout/taglib.jsp"%>

<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">

        <title>Usuario</title>

    </head>

    <body>
        <div class="container">
            <div class="row">
                <!-- ALTA DE USUARIO-->
                <div class="col-md-3">
                    <h2> Alta de usuario </h2>
                    <form:form commandName="usuario">
                        <form:hidden id="idUsuario" path="id"/>
                        <div class="form-group">
                            <label> Nombre de usuario </label>s
                            <form:input path="name" class="form-control"
                                        placeholder="Ingrese un nombre de usuario"
                                        data-toggle="tooltip" title="Ingrese un nombre de usuario"
                                        ></form:input>
                            </div>

                            <!-- contraseña-->
                            <div class="form-group">
                                <label for="inputPassword" class="control-label">Ingrese una contraseña</label>
                                <div class="form-group">
                                    <div class="form-group">
                                    <form:password path="password" class="form-control" id="pass"
                                                   placeholder="Contraseña"
                                                   data-toggle="tooltip" title="Ingrese una contraseña"
                                                   ></form:password>

                                    </div>
                                    <div class="form-group">
                                        <label> Por favor, confirme su contraseña </label>
                                        <input type="password" class="form-control" id="confirmPass"
                                               placeholder="Confirmar"
                                               data-toggle="tooltip" title="Confirmar contraseña"
                                               >

                                    </div>
                                </div>
                            </div>                                        

                            <div class="form-group">
                                <button type="submit" class="btn btn-primary" id="alta">Dar de alta</button>
                            </div>

                    </form:form>
                </div>

                <!-- TABLA-->

                <div class="col-md-9">
                    <div class="container-fluid">
                        <h2>
                            Listado de usuarios
                        </h2>
                        <%--<sc:if test="${not empty usuarios}"--%>
                        <div style="background-color: rgba(255, 255, 255, 0.68)">
                            <table id="myTable" class="table table-bordered table-hover table-responsive">
                                <thead style="text-align: center; font-weight: bolder">
                                    <tr>
                                        <th> Usuario</th>
                                        <th> Legajo</th>
                                        <th> Nombre</th>
                                        <th> Apellido </th>
                                        <th> Estado </th>
                                        <th> Rol </th>                                  
                                        <th> Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <%--<c:forEach var="s" items="${usuarios}"--%>
                                    <tr>
                                        <td> </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td class="text-center">
                                            <a onclick="app.findElementById(${s.id})" data-toggle="tabla"title="Modificar"
                                               class="btn btn-info btn-xs" href="#">
                                                <span class="glyphicon glyphicon-edit triggerEdit"></span> </a>

                                            <a href="/usuario/eliminar/{id}" data-toggle="tabla" title="Eliminar"
                                               class="btn btn-danger btn-xs" href="#">
                                                <span class="glyphicon glyphicon-remove triggerRemove"></span></a>
                                        </td>
                                    </tr>
                                    
                                     <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td class="text-center">
                                            <a onclick="app.findElementById(${s.id})" data-toggle="tabla"title="Modificar"
                                               class="btn btn-info btn-xs" href="#">
                                                <span class="glyphicon glyphicon-edit triggerEdit"></span> </a>

                                            <a href="/usuario/eliminar/{id}" data-toggle="tabla" title="Eliminar"
                                               class="btn btn-danger btn-xs" href="#">
                                                <span class="glyphicon glyphicon-remove triggerRemove"></span></a>
                                        </td>
                                    </tr>
                                    
                                     <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td class="text-center">
                                            <a onclick="app.findElementById(${s.id})" data-toggle="tabla"title="Modificar"
                                               class="btn btn-info btn-xs" href="#">
                                                <span class="glyphicon glyphicon-edit triggerEdit"></span> </a>

                                            <a href="/usuario/eliminar/{id}" data-toggle="tabla" title="Eliminar"
                                               class="btn btn-danger btn-xs" href="#">
                                                <span class="glyphicon glyphicon-remove triggerRemove"></span></a>
                                        </td>
                                    </tr>

                                    <%--</c:forEach--%>
                                </tbody>
                            </table>
                        </div>
                        <%--</c:if--%>
                    </div>
                </div>

                <!-- Modal eliminar usuario-->
                <div class="modal fade" id="modalRemove" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 class="modal-title" id="myModalLabel">Eliminar usuario</h4>
                            </div>
                            <div class="modal-body">¿Está seguro que desea eliminar este usuario?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                                <a id="removeBtn" href="" class="btn btn-danger">Eliminar</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <script src="/recursoshumanos/resources/js/jUsuario.js"></script>
    </body>

</html>