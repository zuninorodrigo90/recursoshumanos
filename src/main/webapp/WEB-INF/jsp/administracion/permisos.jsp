<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<%@ include file="../../layout/taglib.jsp"%>
<script src="/sgl/resources/js/jPermission.js"></script>
<link href="/sgl/resources/css/jquery.dataTables.min.css"
	rel="stylesheet">
<script src="/sgl/resources/js/jquery.dataTables.min.js"></script>
<h1>Administración de permisos</h1>

<div style="background-color: rgba(255, 255, 255, 0.68)">
	<table id="myTable" class="table table-bordered table-hover">
		<thead style="text-align: center; font-weight: bolder">
			<tr class="active">
				<td align="center">M&oacute;dulo</td>
				<td align="center">Permiso</td>
				<td align="center">Descripción</td>
				<c:forEach items="${roles}" var="role">
					<c:if test="${role.id != 1 }">
						<td align="center"><c:out value="${role.name}" /></td>
					</c:if>
				</c:forEach>

			</tr>
		</thead>
		<tbody>
		<c:forEach items="${controllers}" var="controllerItem">
			<c:forEach items="${controllerItem.value}" var="metodo">
				<tr>
					<td><c:out value="${controllerItem.key.descriptionClass}" /></td>
					<%-- 					<td><c:out value="${metodo.nombrePermiso}" /></td> --%>
					<td><c:out value="${metodo.nombrePermiso}" /></td>
					<td><c:out value="${metodo.descripcionPermiso}" /></td>
					<c:forEach items="${roles}" var="role">
						<c:if test="${role.id != 1 }">
							<td class="permiso" align="center"
								id="<c:out value="${role.id}"/>-<c:out value="${metodo.role}"/>"><img
								src="${pageContext.request.contextPath}/resources/images/ui-anim_basic_16x16.gif">
							</td>
						</c:if>
					</c:forEach>
				</tr>
			</c:forEach>
		</c:forEach>
		</tbody>
	</table>
</div>

