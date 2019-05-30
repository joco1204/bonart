<?php 
include '../../../../config/session.php';
$session = new Session();
$session->start();
$get = ((object) $_GET);

if(!$session->getSession('token') || $session->getSession('token') == ''){
    $session->destroy();
    header('location: ../../index.php');
}
?>
<section class="content-header">
    <h1>Usuarios</h1>
</section>
<section class="content">
    <div class='box box-primary'>
        <div class='box-header with-border'>
            <h3 class='box-title'>Listado de Usuarios</h3>
        </div>
        <div class='box-body'>
            <section class='content'>
                <div class="row">
                    <div class="col col-md-12 text-center">
						<button type="button" class="btn btn-success" data-toggle="modal" data-target="#crear_usuario">Crear Usuario</button>
                        <button type="button" class="btn btn-danger" onclick="javascript: pageContent('admin/index');">Volver</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col col-md-12">
                        <div class="table-responsive" id="data_usuarios" style="font-size: 11px;"></div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</section>

<div id="crear_usuario" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="crear" autocomplete="off">
                <div class="modal-header bg-blue text-center">
                    <button type="button" class="close" data-dismiss="modal"><span style="color: #fff">X</span></button>
                    <h4 class="modal-title"><b>Usuarios</b></h4>
                    <input type="hidden" id="action" name="action" value="crear">
                </div>
                <div class="modal-body">
                    <div class="row">

                        
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-success btn-sm" >GUARDAR</button>
                    <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">CERRAR</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script src="../../js/usuarios.js"></script>