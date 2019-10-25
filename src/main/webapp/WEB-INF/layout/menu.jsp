<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ include file="../layout/taglib.jsp"%>


<nav class="navbar navbar-inverse navbar-fixed-top">
	<div class="container">
		<div class="navbar-header">
			<a class="navbar-brand" href='/recursoshumanos/home' style="font-size: 30px">RH</a>
		</div>
		<div id="navbar" class="navbar-collapse collapse">
			<ul class="nav navbar-nav">
				<security:authorize
					access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_CONSULTAR_MATERIALES') or hasRole('ROLE_MATERIAL_INDIVIDUAL') 
					or hasRole('ROLE_KIT_RECAMBIO') or hasRole('ROLE_EQUIVALENTE_INDIVIDUAL') or hasRole('ROLE_EQUIVALENTE_MASIVO')
					or hasRole('ROLE_ALTERNATIVOS') or hasRole('ROLE_PRODUCER'))">
					<li class="dropdown"><a href="#" class="dropdown-toggle"
						data-toggle="dropdown" role="button" aria-haspopup="true"
						aria-expanded="false">Materiales<span class="caret"></span></a>
						<ul class="dropdown-menu">
							<security:authorize
								access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_MATERIAL_INDIVIDUAL'))">
								<li><a
									href='<spring:url value="/materiales/materialIndividual"/>'>Alta
										material</a></li>
							</security:authorize>
							<security:authorize
								access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_CONSULTAR_MATERIALES'))">
								<li><a
									href='<spring:url value="/materiales/consultarMateriales"/>'>Consultar</a></li>
							</security:authorize>
							<security:authorize
								access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_USEFUL_LIFE_INTERVAL'))">
								<li><a
									href='<spring:url value="/materiales/usefulLifeInterval"/>'>Intervalos de vida útil</a></li>
							</security:authorize>
							<security:authorize
								access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_MATERIAL_REGISTRAR_INGRESO'))">
								<li><a
									href='<spring:url value="/materiales/registrarIngreso"/>'>Registrar ingreso</a></li>
							</security:authorize>
							<security:authorize
								access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_DEPOSITO'))">
								<li><a
									href='<spring:url value="/depositos"/>'>Depósitos</a></li>
							</security:authorize>
							<security:authorize
								access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_KIT_RECAMBIO'))">
								<li class="divider"></li>
								<li><a
									href='<spring:url value="/materiales/kitDeRecambio"/>'>Kit
										de recambio</a></li>
							</security:authorize>
							
							<security:authorize
								access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_EQUIVALENTE_INDIVIDUAL'))">
								<li class="divider"></li>
								<li><a
									href='<spring:url value="/equivalentes/equivalenteIndividual"/>'>Alta
										individual de equivalentes</a></li>
							</security:authorize>
							<security:authorize
								access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_EQUIVALENTE_MASIVO'))">
								<li><a
									href='<spring:url value="/equivalentes/equivalenteMasivo"/>'>Alta
										masiva de equivalentes</a></li>
							</security:authorize>
							<security:authorize
								access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_ALTERNATIVOS'))">
								<li class="divider"></li>
								<li><a
									href='<spring:url value="/materiales/alternativos"/>'>Alternativos</a></li>
							</security:authorize>
							<security:authorize
								access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_PRODUCER'))">
								<li class="divider"></li>
								<li class="${current == 'fabricantes' ? 'active' :  ''}"><a
									href='<spring:url value="/fabricantes"/>'>Fabricantes</a></li>
							</security:authorize>
						</ul></li>
				</security:authorize>
				<security:authorize
					access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_GENERAR_REQUERIMIENTO') or hasRole('ROLE_CONSULTAR_REQUERIMIENTO')
					or hasRole('ROLE_AUTORIZAR_REQUERIMIENTO') or hasRole('ROLE_ACTUALIZAR_ESTADO_REQUERIMIENTO'))">
					<li class="dropdown"><a href="#" class="dropdown-toggle"
						data-toggle="dropdown" role="button" aria-haspopup="true"
						aria-expanded="false">Requerimiento<span class="caret"></span></a>
						<ul class="dropdown-menu">
							<security:authorize
								access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_GENERAR_REQUERIMIENTO'))">
								<li><a
									href='<spring:url value="/requerimientos/generarRequerimiento"/>'>Generar
										requerimiento</a></li>
							</security:authorize>
							<security:authorize
								access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_CONSULTAR_REQUERIMIENTO'))">
								<li><a
									href='<spring:url value="/requerimientos/consultarRequerimiento"/>'>Consultar</a></li>
							</security:authorize>
							<security:authorize
								access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_AUTORIZAR_REQUERIMIENTO'))">
								<li><a
									href='<spring:url value="/requerimientos/autorizarRequerimiento"/>'>Autorizar
										requerimiento</a></li>
							</security:authorize>

							<security:authorize
								access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_ACTUALIZAR_ESTADO_REQUERIMIENTO'))">
								<li><a
									href='<spring:url value="/requerimientos/actualizarEstadoRequerimiento"/>'>Actualizar
										estado requerimiento</a></li>
							</security:authorize>
						</ul></li>
				</security:authorize>
				<security:authorize
					access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_CONSULTAR_SISTEMAS_CODIFICADOS') or hasRole('ROLE_SISTEMAS_CODIFICADOS') 
					or hasRole('ROLE_SISTEMAS_CODIFICADOS_MASIVO') or hasRole('ROLE_SISTEMA_ARMAS'))">
					<li class="dropdown"><a href="#" class="dropdown-toggle"
						data-toggle="dropdown" role="button" aria-haspopup="true"
						aria-expanded="false">Catalogación de Sistemas <span
							class="caret"></span></a>
						<ul class="dropdown-menu">
							<security:authorize
								access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_SISTEMA_ARMAS'))">
								<li class="${current == 'sistemaArmas' ? 'active' :  ''}"><a
									href='<spring:url value="/sistemaArmas"/>'>Sistemas de
										Armas</a></li>
							</security:authorize>
							<security:authorize
								access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_AERONAVE'))">
								<li class="${current == 'aeronave' ? 'active' :  ''}"><a
									href='<spring:url value="/aeronave"/>'>Aeronaves</a></li>
							</security:authorize>
							<security:authorize
								access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_ESQUEMA_AERONAVE'))">
								<li class="${current == 'aeronave' ? 'active' :  ''}"><a
									href='<spring:url value="/catalogacion/esquemaAeronave"/>'>Esquema aeronave</a></li>
							</security:authorize>
							<security:authorize
								access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_SISTEMAS_CODIFICADOS_MASIVO'))">
								<li class="divider"></li>
								<li><a
									href='<spring:url value="/catalogacion/sistemasCodificadosMasiva"/>'>Catalogación
										masiva</a></li>
							</security:authorize>
							<security:authorize
								access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_SISTEMAS_CODIFICADOS'))">
								<li><a
									href='<spring:url value="/catalogacion/sistemasCodificadosIndividual"/>'>Catalogación
										individual</a></li>
							</security:authorize>
							<security:authorize
								access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_CONSULTAR_SISTEMAS_CODIFICADOS'))">
								<li><a
									href='<spring:url value="/catalogacion/consultarSistemasCodificados"/>'>Consultar</a></li>
							</security:authorize>
						</ul></li>
				</security:authorize>
				<security:authorize
					access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_ROLES') or hasRole('ROLE_PERMISOS_MODIFICAR')
					or hasRole('ROLE_PER_USER') or hasRole('ROLE_AUTHORIZATION_SCHEME'))">
					<li class="dropdown"><a href="#" class="dropdown-toggle"
						data-toggle="dropdown" role="button" aria-haspopup="true"
						aria-expanded="false">Administración <span class="caret"></span></a>
						<ul class="dropdown-menu">
							<security:authorize
								access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_ROLES'))">
								<li><a href='<spring:url value="/administracion/roles"/>'>Administración
										de roles</a></li>
							</security:authorize>
							<security:authorize
								access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_PERMISOS_MODIFICAR'))">
								<li><a
									href='<spring:url value="/administracion/permisos/"/>'>Administración
										de permisos</a></li>
							</security:authorize>
							<security:authorize
								access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_PER_USER'))">
								<li><a
									href='<spring:url value="/administracion/asignarRoles"/>'>Asignar
										roles</a></li>
							</security:authorize>
							<security:authorize
								access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_AUTHORIZATION_SCHEME'))">
								<li><a
									href='<spring:url value="/administracion/esquemaAutorizantes"/>'>Esquema
										autorizantes</a></li>
							</security:authorize>
						</ul></li>
				</security:authorize>
			</ul>
			<ul class="nav navbar-nav navbar-right">
				<li class="dropdown"><security:authorize access="isAnonymous()">
						<li><a href="/recursoshumanos/login">Iniciar sesión</a></li>
					</security:authorize> <security:authorize access="isAuthenticated()">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown"> <span
							class="glyphicon glyphicon-user"></span><strong
							id="principalUserName"><security:authentication
									property="principal.username" /></strong><span
							class="glyphicon glyphicon-chevron-down"></span>
						</a>
						<ul class="dropdown-menu">
							<li>
								<div class="navbar-login navbar-login-session">
									<div class="row">
										<div class="col-lg-12">
											<p>
												<a href="/recursoshumanos/logout" class="btn btn-default btn-block">Cerrar
													Sesión</a>
											</p>
										</div>
									</div>
								</div>
							</li>
						</ul>
					</security:authorize>
			</ul>
		</div>
		<!--/.nav-collapse -->
	</div>
	<!--/.container-fluid -->
</nav>