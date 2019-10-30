<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ include file="../layout/taglib.jsp"%>
<style>
body {
/* 	background: url(resources/images/background.jpg); */
	
	background-image: url(/sgl/resources/images/background.jpg);
	background-size: cover;
	background-position: center;
	background-attachment: fixed;
	background-repeat: no-repeat;
}

.form-signin input[type="text"] {
	margin-bottom: 5px;
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
}

.form-signin input[type="password"] {
	margin-bottom: 10px;
	border-top-left-radius: 0;
	border-top-right-radius: 0;
}

.form-signin .form-control {
	position: relative;
	font-size: 16px;
	font-family: 'Open Sans', Arial, Helvetica, sans-serif;
	height: auto;
	padding: 10px;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

.vertical-offset-100 {
	padding-top: 100px;
}

.img-responsive {
	display: block;
	max-width: 100%;
	height: 160px;
	margin: auto;
}

.panel {
	margin-bottom: 20px;
	background-color: rgba(255, 255, 255, 0.75);
	border: 1px solid transparent;
	border-radius: 4px;
	-webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
	box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
}
</style>


<div class="row vertical-offset-100">
	<div class="col-md-4 ">
		<div class="panel panel-default">
			<div class="panel-heading">
			
				<div class="row-fluid user-row">
					<img src="resources/images/logoSgl.png" class="img-responsive" />
				</div>
			</div>
			<div class="panel-body">
				<form class="form-signin" action="login" method="POST">
					<input type="text" name="username" class="form-control"
						placeholder="Usuario" required autofocus> <input
						type="password" name="password" class="form-control"
						placeholder="Contraseña" required>
					<c:if test="${error != null}">
						<p class="text-center error">${error}</p>
					</c:if>
					<button class="btn btn-lg btn-primary btn-block" type="submit">Ingresar
						»</button>
				</form>
			</div>
		</div>
	</div>
</div>


