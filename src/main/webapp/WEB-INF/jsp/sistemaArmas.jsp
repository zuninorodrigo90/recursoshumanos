<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ include file="../layout/taglib.jsp"%>

<div class="row">

	<div class="col-md-6">
	<h2>Administración de Sistema de Armas</h2>
		<security:authorize access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_SISTEMA_ARMAS_SAVE'))">
			<form:form commandName="sistemaArmas"
				cssClass="form-horizontal registrationForm">
				<form:hidden id="idSistemaArmas" path="id" cssClass="form-control" />
				<div class="form-group">
					<div class="col-sm-7">
						<label>Código*</label>
						<form:input id="code" path="code" cssClass="form-control"
							cssErrorClass="form-control has-error" placeholder="Código"
							data-toggle="tooltip" title="Código" />
						<strong><form:errors path="code" class="error-class" /></strong>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-7">
						<label>Designación*</label>
						<form:textarea id="description" path="description"
							cssClass="form-control" placeholder="Designación"
							data-toggle="tooltip" title="Designación" />
					</div>
				</div>
				<div id="form-vigente" style="display: none">
					<div class="form-group">
						<div class="col-sm-7">
							<label>Vigente</label>
							<form:checkbox id="vigente" path="vigente" data-toggle="tooltip"
								title="Vigente" />
						</div>
					</div>
				</div>
					<div class="form-group">
						<div class="col-sm-5">
							<input type="submit" value="Guardar"
								class="btn btn-lg btn-primary" /><br>
								(*) Campos obligatorios
						</div>
					</div>
			</form:form>
		</security:authorize>
	</div>

	<div class="col-md-6">
		<h2>Sistemas de Armas</h2>

		<c:if test="${not empty sistemasArmas}">
			<div style="background-color: rgba(255, 255, 255, 0.68)">
				<table id="myTable" class="table table-bordered table-hover">
					<thead style="text-align: center; font-weight: bolder">
						<tr class="active">
							<td>Código</td>
							<td>Designación</td>
							<security:authorize
								access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_SISTEMA_ARMAS_DELETE') or hasRole('ROLE_SISTEMA_ARMAS_SAVE'))">
								<td>Acción</td>
							</security:authorize>
						</tr>
					</thead>
					<tbody>
						<c:forEach var="s" items="${sistemasArmas}">
							<input type="hidden" id="idHidden${s.id}" value="${s.id}">
							<c:choose>
								<c:when test="${s.vigente}">
									<input type="checkbox" id="idHiddenVigente${s.id}" checked
										style="display: none">
								</c:when>
								<c:otherwise>
									<input type="checkbox" id="idHiddenVigente${s.id}"
										style="display: none">
								</c:otherwise>
							</c:choose>

							<c:choose>
								<c:when test="${!s.vigente}">
									<tr id="${s.id }" class="danger" data-toggle="tooltip"
										title="Sistema de Armas NO vigente">
										<td>${s.code}</td>
										<td>${s.description}</td>
										<security:authorize
											access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_SISTEMA_ARMAS_DELETE') or hasRole('ROLE_SISTEMA_ARMAS_SAVE'))">
											<td><security:authorize
													access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_SISTEMA_ARMAS_SAVE'))">
													<a onclick="app.findElementById(${s.id})"
														data-toggle="tabla" title="Modificar"
														class="glyphicon glyphicon-edit triggerEdit"> </a>
												</security:authorize> <security:authorize
													access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_SISTEMA_ARMAS_DELETE'))">

													<a href="sistemaArmas/eliminar/${s.id}" data-toggle="tabla"
														title="Eliminar"
														class="glyphicon glyphicon-remove triggerRemove"></a>
												</security:authorize></td>
										</security:authorize>
									</tr>
								</c:when>
								<c:otherwise>
									<tr id="${s.id }">
										<td>${s.code}</td>
										<td>${s.description}</td>
										<security:authorize
											access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_SISTEMA_ARMAS_DELETE') or hasRole('ROLE_SISTEMA_ARMAS_SAVE'))">
											<td><security:authorize
													access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_SISTEMA_ARMAS_SAVE'))">
													<a onclick="app.findElementById(${s.id})"
														data-toggle="tabla" title="Modificar"
														class="glyphicon glyphicon-edit triggerEdit"> </a>
												</security:authorize> <security:authorize
													access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_SISTEMA_ARMAS_DELETE'))">

													<a href="sistemaArmas/eliminar/${s.id}" data-toggle="tabla"
														title="Eliminar"
														class="glyphicon glyphicon-remove triggerRemove"></a>
												</security:authorize></td>
										</security:authorize>
									</tr>
								</c:otherwise>
							</c:choose>
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
				<h4 class="modal-title" id="myModalLabel">Borrar Sistema de
					Armas</h4>
			</div>
			<div class="modal-body">¿Está seguro que desea borrar este
				Sistema de Armas?</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
				<a id="removeBtn" href="" class="btn btn-danger">Borrar</a>
			</div>
		</div>
	</div>
</div>
<script src="/sgl/resources/js/jSistemaArmas.js"></script>
