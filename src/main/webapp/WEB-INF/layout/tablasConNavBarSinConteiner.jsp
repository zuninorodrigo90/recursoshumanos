<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ include file="../layout/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<link href="/recursoshumanos/resources/images/favicon.ico" rel="shortcut icon" type="image/x-icon">
<link href="/recursoshumanos/resources/images/favicon.ico" rel="icon" type="image/x-icon">
<link href="/recursoshumanos/resources/css/bootstrap-3.3.7.css"
	rel="stylesheet">
<script src="/recursoshumanos/resources/js/jquery-3.1.1.min.js"></script>
<script src="/recursoshumanos/resources/js/bootstrap-3.3.7.js"></script>
<script src="/recursoshumanos/resources/js/jquery.validate.min.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title><tiles:getAsString name="title"></tiles:getAsString></title>
<style>
body {
	background-color: #d1d9e0;
	background-image: url(/recursoshumanos/resources/images/logoMarcaAgua.png);
	background-size: contain;
	background-position : right;
    background-attachment: fixed;
	background-repeat: no-repeat;
}
</style>

</head>
<body>
	<tilesx:useAttribute name="current" />
	<!-- Fixed navbar -->
	<!-- Menú -->
	<tiles:insertAttribute name="menu" />
	<br>
	<br>
	<div class="">
		<tiles:insertAttribute name="body" />
	</div>
	<div class="text-center">
		<tiles:insertAttribute name="footer" />
	</div>
	<br>
	<br>
	<br>
	<br>
</body>
</html>