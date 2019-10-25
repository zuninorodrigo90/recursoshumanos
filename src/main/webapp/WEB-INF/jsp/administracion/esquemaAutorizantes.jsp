<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ include file="../../layout/taglib.jsp"%>

<div class="row">
	<div class="col-md-6 col-md-4 col-md-offset-4 sidebar-offcanvas"
		style="background-color: rgba(255, 255, 255, 0.68)" id="sidebar">
		<div class="list-group">
			<h1>Esquema autorizantes</h1>
			
			<div id="jstree"></div>
		</div>
		<label style="font-weight: normal; font-size: 10px;">Click derecho para visualizar submenu</label>
	</div>
	
</div>

<!-- Modal level-->
<div class="modal fade" id="modal" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="modalTitle"></h4>
			</div>
			<div class="modal-body" id="modalBody"></div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
				<a id="btnAceptarModal" class="btn btn-primary">Aceptar</a>
			</div>
		</div>
	</div>
</div>



<!-- ModalUsers -->
<div class="modal fade" id="modalUsers" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="modalTitleUsers"></h4>
			</div>
			<div class="modal-body" id="modalBodyUsers"></div>
			<div class="modal-body" id="modalBodyUsers2"></div>
			<div class="modal-footer">
				<a id="btnAceptarModalUsers" href="esquemaAutorizantes"
					class="btn btn-primary">Cerrar</a>
			</div>
		</div>
	</div>
</div>

<!-- Modal2 -->
<div class="modal fade" id="modal2" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="modalTitle2"></h4>
			</div>
			<div class="modal-body" id="modalBody2"></div>
			<div class="modal-footer">
				<button id="btnNoModal2" type="button" class="btn btn-primary"
					style="display: none;">No</button>
				<button id="btnAceptarModal2" type="button" class="btn btn-primary">Aceptar</button>
			</div>
		</div>
	</div>
</div>


<script src="/sgl/resources/js/jAuthorizationScheme.js"></script>
<script src="/sgl/resources/js/jstree.js"></script>
<link rel="stylesheet" href="/sgl/resources/css/styleTree.css" />
<script src="/sgl/resources/js/typeahead.js"></script>
<script src="/sgl/resources/js/typeahead.jquery.js"></script>
<link rel="stylesheet"
	href="/sgl/resources/css/jquery-ui-1-12-1.css" rel="stylesheet">
<script src="/sgl/resources/js/jquery-ui-1.12.1.js"></script>
