<%-- 
    Document   : empleado
    Created on : 09-nov-2019, 17:24:12
    Author     : Aye
--%>

<%@page contentType="text/html" pageEncoding="ISO-8859-1"%>

<!doctype html>
<html lang="en">
  <head>
    <title>Empleados</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">


    <!-- CSS-->
    <link rel="stylesheet" href="bootstrap-4.3.1-dist\css\bootstrap.min.css">
    </link>
    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    </link>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>


</head>

<body>
    <div class="container">
        <div class="row">
            <!-- ALTA DE EMPLEADO-->
            <div class="col-3">
                <h2> Alta de empleado </h2>
                <form>
                    
                    
                    
                    <div class="form-group">
                        <label> Legajo </label>
                        <input class="form-control" id="legajo" placeholder="" readonly></input>
                    </div>
                    <div class="form-group">
                        <label> Nombre </label>
                        <input class="form-control" id="nombre" placeholder="Ingrese un nombre"></input>
                    </div>
                    <div class="form-group">
                        <label> Apellido </label>
                        <input class="form-control" id="apellido" placeholder="Ingrese un apellido"></input>
                    </div>
                    <div class="form-group">
                        <label> DNI </label>
                        <input class="form-control" id="dni" placeholder="Ingrese un DNI"></input>
                    </div>
                    <div class="form-group">
                        <label> Tipo de empleado </label>
                        <select class="form-control">
                            <option>Contratado</option>
                            <option>Efectivo</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label> ¿Realiza aportes? </label>
                        <select class="form-control">
                            <option>Sí</option>
                            <option>No</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label> Categoría </label>
                        <select class="form-control">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label> Ingrese una fecha de nacimiento </label>
                        <input id="date" type="date"></input>
                    </div>

                    <div class="form-group">
                        <label> Ingrese una fecha de ingreso </label>
                        <input id="date" type="date"></input>
                    </div>
                                      
                    

                    <div class="form-group">
                        <button type="submit" class="btn btn-primary"> Dar de alta </button>
                    </div>
                </form>
            </div>

            <!-- TABLA-->

            <div class="col-9">
                <div class="container">
                    <h2>
                        Listado de empleados
                    </h2>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th> Legajo</th>
                                <th> Nombre</th>
                                <th> Apellido </th>
                                <th> Tipo </th>
                                <th> Categoría </th>
                                <th> Antigüedad </th>
                                <th> Salario </th>
                                <th> Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>  </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td class="text-center">
                                      <a class="btn btn-danger btn-xs" href="#">
                                        <span class="glyphicon glyphicon-edit triggerEdit"></span>
                                    </a>
                                    <a class="btn btn-info btn-xs" href="#">
                                        <span class="glyphicon glyphicon-remove triggerRemove"></span>
                                    </a>
                                  
                                </td>
                            </tr>
                            <tr>
                                <td>  </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td class="text-center">
                                            <a class="btn btn-danger btn-xs" href="#">
                                        <span class="glyphicon glyphicon-edit triggerEdit"></span>
                                    </a>
                                    <a class="btn btn-info btn-xs" href="#">
                                        <span class="glyphicon glyphicon-remove triggerRemove"></span>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>  </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td class="text-center">
                                            <a class="btn btn-danger btn-xs" href="#">
                                        <span class="glyphicon glyphicon-edit triggerEdit"></span>
                                    </a>
                                    <a class="btn btn-info btn-xs" href="#">
                                        <span class="glyphicon glyphicon-remove triggerRemove"></span>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>


            <!-- FIN TABLA-->
        </div>
    </div>



</body>

</html>
