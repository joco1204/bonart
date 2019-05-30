<?php 
include '../../../config/session.php'; 
$session = new Session();
$session->start();

if(!$session->getSession('token') || $session->getSession('token') == ''){
    $session->destroy();
    header('location: ../../index.php');
}
?>
<section class="content-header">
    <h1></h1>
</section>
<section class="content">
    <div class="row">
        <div class="col-lg-12 text-center">
        	<h1>404 Not Found</h1>
        	<h3>Contacte con el administrador</h3>
        	<button type="button" class="btn btn-danger" onclick="javascript: pageContent('contenido');">Volver</button>
        </div>
    </div>
</section>