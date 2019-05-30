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
    <h1>Sala de exposición</h1>
</section>
<section class="content">
    <div class='box box-primary'>
        <div class='box-header with-border'>
            <h3 class='box-title'>Sala de exposición</h3>
        </div>
        <div class='box-body'>
            <section class='content'>
                <div class="row">
                    <div class="col col-md-12 text-center">
						<button type="button" class="btn btn-success" id="crear_sala" data-toggle="modal" data-target="#crear_sala_exposicion">Crear Sala de exposición</button>
                        <button type="button" class="btn btn-danger" onclick="javascript: pageContent('admin/index');">Volver</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col col-md-12">
                        <div class="table-responsive" id="data_sala_exposicion" style="font-size: 11px;"></div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</section>

<div id="crear_sala_exposicion" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <form id="crear" autocomplete="off">
                <div class="modal-header bg-blue text-center">
                    <button type="button" class="close" data-dismiss="modal"><span style="color: #fff">X</span></button>
                    <h4 class="modal-title"><b>Sala de exposición</b></h4>
                    <input type="hidden" id="action" name="action" value="crear">
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col col-md-8">
                            <div class="form-group has-feedback">
                                <label class="control-label" for="sala_exposicion">Nombre Sala</label>
                                <input type="text" id="sala_exposicion" name="sala_exposicion" class="form-control" required="" data-error="Debe ingresar tipo de menú">
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col col-md-4">
                            <div class="form-group has-feedback">
                                <label class="control-label" for="vendedor">Vendedor:</label>
                                <select class="form-control" id="vendedor" name="vendedor" style="width: 100%" data-error="Debe seccionar un vendedor"></select>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
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
<script src="../../js/sala_exposicion.js"></script>
