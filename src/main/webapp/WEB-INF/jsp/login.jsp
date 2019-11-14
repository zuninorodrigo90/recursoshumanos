<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ include file="../layout/taglib.jsp"%>
<link rel="stylesheet" href="https://getbootstrap.com/docs/3.3/components/css/bootstrap.min.css">


<style>
body {
	
	background-image: url(/recursoshumanos/resources/images/background.jpg);
	background-size: cover;
	background-position: center;
	background-attachment: fixed;
	background-repeat: no-repeat;
}

.form-signin input[type="text"] {
	margin-bottom: 10px;
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
        pointer-events: none;
        transition: .5s;
       
        
        
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
/*bordes trasnparentes*/
input.transparent-input{
       background-color:rgba(0,0,0,0) !important;
       border:none !important;
    }
    
/* enable absolute positioning */
.inner-addon { 
    position: relative; 
}

/* style icon */
.inner-addon .glyphicon {
  position: absolute;
  padding: 10px;
  pointer-events: none;
}

/* align icon */
.left-addon .glyphicon  { left:  0px;}


/* add padding  */
.left-addon input  { padding-left:  30px; }


.vertical-offset-100 {
	padding-top: 100px;
}

.img-responsive {
	display: block;
	max-width: 100%;
	height: 100px;
	margin: auto;


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
    
	<div class="col-md-4 col-md-offset-4">
          
       
        
		<div class="panel panel-info">
                   
			<div class="panel-heading">
                                                        
			
				<div class="row-fluid user-row">
					<img src="resources/images/logoSgl.png" class="img-responsive" />
                                        <form action="/action_page.php" class="container">
                                            <p class= "panel-title"> <h2 class="text-info"><strong>BIENVENIDO</strong></h2></p>
				</div>
                                
			</div>
                    
			<div class="panel-heading">
                            
				<form class="form-signin" action="login" method="POST">
                                   <i class="fas fa-user-friends"></i>
                                   
                                  
                                    <div class="form-group">
                                    <div class="inner-addon left-addon">                                          
                                       <i class="glyphicon glyphicon-user"></i>
                                     <p><input class="form-control transparent-input" type="text" name="username"size="60" class="form-control"
                                              placeholder="Usuario" required autofocus> </p>
                                     </div>
                                  
                                    
                                    <div class="form-group">
                                    <div class="inner-addon left-addon">
                                      <i class="glyphicon glyphicon-lock"></i>
                                    <p> <input class="form-control transparent-input" type="password" name="password" size="60" class="form-control" 
                                               placeholder="Contraseña" required >  </p>
                                    
						
					<c:if test="${error != null}">
						<p class="text-center error">${error}</p>
					</c:if>
                                                <p>   <button class="btn-info btn-lg btn-block " type="submit">Ingresar
                                                        »</button> </p>
                                </form>          
				</form>
                   </div>
  		</div>
              </div>
	   </div    
      </div>
    </div>
</div>
      


