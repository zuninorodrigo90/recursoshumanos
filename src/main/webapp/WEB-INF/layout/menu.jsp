<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1"%>
<%@ include file="../layout/taglib.jsp"%>


<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <a class="navbar-brand" href='/recursoshumanos/home' style="font-size: 30px">SGRH</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                <security:authorize
                    access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_EMPLEADO'))">
                    <li class="dropdown"><a href="#" class="dropdown-toggle"
                                            data-toggle="dropdown" role="button" aria-haspopup="true"
                                            aria-expanded="false">Empleados<span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <security:authorize
                                access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_EMPLEADO'))">
                                <li><a
                                        href='<spring:url value="/empleado"/>'>Menu empleado</a></li>
                                    </security:authorize>
                        </ul></li>
                    </security:authorize>
                    <security:authorize
                        access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_USUARIO'))">
                    <li class="dropdown"><a href="#" class="dropdown-toggle"
                                            data-toggle="dropdown" role="button" aria-haspopup="true"
                                            aria-expanded="false">Usuarios<span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <security:authorize
                                access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_USUARIO'))">
                                <li><a
                                        href='<spring:url value="/usuario"/>'>Menu usuarios</a></li>
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