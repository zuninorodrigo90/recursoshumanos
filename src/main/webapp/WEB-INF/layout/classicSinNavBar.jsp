<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ include file="../layout/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<link href="/recursoshumanos/resources/images/favicon.ico" rel="shortcut icon" type="image/x-icon">
<link href="/recursoshumanos/resources/images/favicon.ico" rel="icon" type="image/x-icon">
<link href="/recursoshumanos/resources/css/bootstrap-3.3.7.css" rel="stylesheet">
<script src="/recursoshumanos/resources/js/jquery-3.1.1.min.js"></script>
<script src="/recursoshumanos/resources/js/bootstrap-3.3.7.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title><tiles:getAsString name="title"></tiles:getAsString></title>
</head>
<body>
	<div class="container">
		<tiles:insertAttribute name="login" />
		<tiles:insertAttribute name="body" />
		<br> <br>
		<div class="text-center">
			<tiles:insertAttribute name="footer" />
		</div>
	</div>
	<!-- /End container -->
</body>
</html>