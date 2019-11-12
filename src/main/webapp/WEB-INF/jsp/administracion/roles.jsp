<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1"%>
<%@ include file="../../layout/taglib.jsp"%>

<div class="row">
    <div class="col-md-6">
        <h1>Administración de Roles</h1>
        <form:form commandName="role"
                   cssClass="form-horizontal registrationForm">
            <form:hidden id="idRole" path="id" cssClass="form-control" />
            <div class="form-group">
                <div class="col-sm-7">
                    <label>Nombre*</label>
                    <form:input id="name" path="name" cssClass="form-control"
                                cssErrorClass="form-control has-error" placeholder="Nombre"
                                data-toggle="tooltip" title="Nombre" />
                    <strong><form:errors path="name" class="error-class" /></strong>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-7">
                    <label>Descripción*</label>
                    <form:textarea id="description" path="description"
                                   cssClass="form-control" placeholder="Descripción"
                                   data-toggle="tooltip" title="Descripción" />
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-5">
                    <input type="submit" id="guardar" value="Guardar"
                           class="btn btn-lg btn-primary" /><br>
                    (*) Campos obligatorios
                </div>
            </div>
        </form:form>


    </div>
    <div class="col-md-6">
        <h1>Roles</h1>




        <c:if test="${not empty roles}">
            <div style="background-color: rgba(255, 255, 255, 0.68)">
                <table id="myTable" class="table table-bordered table-hover">
                    <thead style="text-align: center; font-weight: bolder">
                        <tr class="active">
                            <td>Nombre</td>
                            <td>Descripción</td>
                            <security:authorize
                                access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_ROLES_DELETE') or hasRole('ROLE_ROLES_SAVE'))">
                                <td>Acción</td>
                            </security:authorize>
                        </tr>
                    </thead>
                    <tbody>
                        <c:forEach var="r" items="${roles}">
                            <tr id="${r.id }">
                                <td>${r.name}</td>
                                <td>${r.description}</td>
                                <security:authorize
                                    access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_ROLES_DELETE') or hasRole('ROLE_ROLES_SAVE'))">
                                    <td>
                                        <security:authorize
                                            access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_ROLES_SAVE'))">
                                            <a onclick="app.findElementById(${r.id})"
                                               data-toggle="tabla" title="Modificar"
                                               class="glyphicon glyphicon-edit triggerEdit"> </a>
                                        </security:authorize>
                                        <security:authorize
                                            access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_ROLES_DELETE'))">
                                            <a
                                                id="${r.id}" data-toggle="tabla" title="Eliminar"
                                                class="glyphicon glyphicon-remove triggerRemove"></a>
                                        </security:authorize></td>
                                    </security:authorize>
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
                <h4 class="modal-title" id="myModalLabel">Borrar rol</h4>
            </div>
            <div class="modal-body">¿Está seguro que desea borrar este rol?</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                <a id="removeBtn" onclick="" class="btn btn-danger">Borrar</a>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="modalRemoveForced" tabindex="-1"
     role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">Borrar rol</h4>
            </div>
            <div class="modal-body">El rol se encuentra asignado en al
                menos un usuario. No podrá continuar</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>
<script src="/recursoshumanos/resources/js/jRoles.js"></script>
