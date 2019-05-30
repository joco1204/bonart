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
    <h1>LISTADO DE TAQUILLA</h1>
</section>

<section class="content">
    <div class='box box-primary'>
        <div class='box-header with-border'>
            <h3 class='box-title'>Listado de taquilla por día</h3>
        </div>
        <div class='box-body'>
            <section class='content'>
                <div class="row">
                    <div class="col col-md-12 text-center">
						<button type="button" class="btn btn-success" onclick="javascript: pageContent('taquilla/form');">Nueva taquilla</button>
        				<button type="button" class="btn btn-danger" onclick="javascript: pageContent('contenido');">Volver</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col col-md-12">
                        <div class="table-responsive" id="data_taquilla" style="font-size: 11px;"></div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</section>
<script src="../../js/taquilla.js"></script>