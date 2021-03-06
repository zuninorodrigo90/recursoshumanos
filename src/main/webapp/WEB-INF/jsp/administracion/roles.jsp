<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ include file="../../layout/taglib.jsp"%>

<div class="row">
	<div class="col-md-6">
		<h1>Administraci�n de Roles</h1>
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
					<label>Descripci�n*</label>
					<form:textarea id="description" path="description"
						cssClass="form-control" placeholder="Descripci�n"
						data-toggle="tooltip" title="Descripci�n" />
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

<!-- 		<div id="draggable" class="ui-widget-content draggable"> -->
<!-- 			<p>Drag me to my target</p> -->
<!-- 		</div> -->

<!-- 		<div id="droppable" class="ui-widget-header droppable"> -->
<!-- 			<p>Drop here</p> -->
<!-- 		</div> -->

	</div>
	<div class="col-md-6">
		<h1>Roles</h1>




		<c:if test="${not empty roles}">
			<div style="background-color: rgba(255, 255, 255, 0.68)">
				<table id="myTable" class="table table-bordered table-hover">
					<thead style="text-align: center; font-weight: bolder">
						<tr class="active">
							<td>Nombre</td>
							<td>Descripci�n</td>
							<td>Acci�n</td>
						</tr>
					</thead>
					<tbody>
						<c:forEach var="r" items="${roles}">
							<tr id="${r.id }">
								<td>${r.name}</td>
								<td>${r.description}</td>
								<td><a onclick="app.findElementById(${r.id})"
									data-toggle="tabla" title="Modificar"
									class="glyphicon glyphicon-edit triggerEdit"> </a> <a
									id="${r.id}" data-toggle="tabla" title="Eliminar"
									class="glyphicon glyphicon-remove triggerRemove"></a></td>
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
			<div class="modal-body">�Est� seguro que desea borrar este rol?</div>
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
				menos un usuario. No podr� continuar</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
			</div>
		</div>
	</div>
</div>
<script src="/sgl/resources/js/jRoles.js"></script>
<!-- <link rel="stylesheet" -->
<!-- 	href="/sgl/resources/css/jquery-ui-1-12-1.css" rel="stylesheet"> -->
<!-- <script src="/sgl/resources/js/jquery-ui-1.12.1.js"></script> -->
