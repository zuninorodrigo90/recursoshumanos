<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<div class="footer navbar-inverse navbar-fixed-bottom">
	<div class="container">
		<p class="text-muted">FAdeA S.A - Sistema de Gestión Logística SGL. v1.5. Tel: 0351-4668700 int. 2265. www.fadeasa.com.ar. COPYRIGHT <a onclick= "showModalContact()">|&nbsp;Contacto</a></p>
	</div>
</div>
<script type="text/javascript">
function showModalContact() {
	$("#modalContact").modal();
}
</script>

<!-- Modal contact-->
<div class="modal fade" id="modalContact" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h3 class="modal-title" id="myModalLabel">Sistema de Gestión Logística</h3>
			</div>
			<div class="modal-body" id="modalBody">
				<p style="font-size:11px">Click para enviar mail</p>
				<a href="mailto:percello@fadeasa.com.ar?cc=zunino@fadeasa.com.ar; soriai@fadeasa.com.ar&subject=SGL%20-%20Sistema%20de%20Gestión%20Logística">Percello, Karina </a><label style="font-size:11px; font-weight: normal">(percello@fadeasa.com.ar)</label><br>
				<a href="mailto:soriai@fadeasa.com.ar?cc=zunino@fadeasa.com.ar; percello@fadeasa.com.ar&subject=SGL%20-%20Sistema%20de%20Gestión%20Logística">Soria, Isaac </a><label style="font-size:11px; font-weight: normal">(soriai@fadeasa.com.ar)</label><br>
				<a href="mailto:zunino@fadeasa.com.ar?cc=soriai@fadeasa.com.ar; percello@fadeasa.com.ar&subject=SGL%20-%20Sistema%20de%20Gestión%20Logística">Zunino, Rodrigo </a><label style="font-size:11px; font-weight: normal">(zunino@fadeasa.com.ar)</label><br><br>
				Tel: 0351-4668700 int. 2265<br>
				FAdeA S.A &copy;
			</div>
			<div class="modal-footer">
				<a id="btnModalAceptar" data-dismiss="modal" class="btn btn-primary">Cerrar</a>
			</div>
		</div>
	</div>
</div>
