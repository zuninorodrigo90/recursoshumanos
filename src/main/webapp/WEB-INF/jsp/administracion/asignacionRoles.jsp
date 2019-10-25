<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ include file="../../layout/taglib.jsp"%>
<script src="/sgl/resources/js/jAsignacionRoles.js"></script>
<h1>Asignación de roles</h1>
<div class="row">
	<div class="col-md-6 col-md-6 col-md-offset-4 sidebar-offcanvas">
		Haga click en el usuario que desee asignar un rol
		<div style="background-color: rgba(255, 255, 255, 0.68)">
		
			<table id="myTable" class="table table-bordered table-hover ">
				<thead style="text-align: center; font-weight: bolder">
					<tr class="active">
						<td>Usuario</td>
					</tr>
				</thead>
				<tbody>
					<c:forEach items="${users}" var="user">
						<tr>
							<c:choose>
								<c:when test="${user.enabled}">
									<td onclick='loadModal(${user.id}, "${user.name}")'>${user.name}</td>
								</c:when>
								<c:otherwise>
									<td class="danger"
										>${user.name}</td>
								</c:otherwise>
							</c:choose>
						</tr>
					</c:forEach>
				</tbody>
			</table>
		</div>
	</div>
</div>
<!-- Modal Eliminar-->
<div class="modal fade" id="modalDialog" tabindex="-1" role="dialog"
	aria-labelledby=" Equivalente">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-label="Cerrar">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="lblModalDialog">Asignar Roles</h4>
			</div>
			<div class="modal-body" id="bodyDialog">
				<input type="hidden" id="idUser" />
				<table class="table table-bordered table-hover">
					<thead style="text-align: center; font-weight: bolder">
						<tr class="active">
							<td align="center">Rol</td>
							<td align="center">Asignado</td>
						</tr>
					</thead>
					<tbody>
						<c:forEach items="${roles}" var="role">
							<tr>
								<td>${role.name}</td>
								<td align="center"><input class="roles" id="role${role.id}"
									onclick="addOrRemoveRole(${role.id})" type="checkbox"></td>
							</tr>
						</c:forEach>
					</tbody>
				</table>
			</div>
			<div class="modal-footer">
				<a id="btnAceptarDialog" class="btn btn-default" onclick="showHistorial()">Mostrar Historial</a>
				<a id="btnAceptarDialog" class="btn btn-primary"
					data-dismiss="modal">Aceptar</a>
			</div>
		</div>
	</div>
</div>
<!-- Modal Historial-->
<div class="modal fade" id="modalHistorial" tabindex="-1" role="dialog"
	aria-labelledby=" Equivalente">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-label="Cerrar">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="lblModalDialog">Historial roles</h4>
			</div>
			<div class="modal-body" id="bodyDialog">
				<input type="hidden" id="idUser" />
				<table id="tableHistorial" class="table table-bordered table-hover">
					<thead style="text-align: center; font-weight: bolder">
						<tr class="active">
							<td align="center">Rol</td>
							<td align="center">Acción</td>
							<td align="center">Fecha</td>
							<td align="center">Responsable</td>
						</tr>
					</thead>
					<tbody id="tbodyHistorial">
						
					</tbody>
				</table>
			</div>
			<div class="modal-footer">
				<a class="btn btn-primary"
					data-dismiss="modal">Aceptar</a>
			</div>
		</div>
	</div>
</div>

