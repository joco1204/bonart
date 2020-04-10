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
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <form id="usuario_form" autocomplete="off">
                <div class="modal-header bg-blue text-center">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title text-center"><b>CREAR USAURIO</b></h4>
                    <input type="hidden" name="action" id="action" value="crear_usuario">
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col col-md-4">
                            <div class="form-group has-feedback">
                                <label class="control-label" for="nombres">NOMBRE(S):</label>
                                <input type="text" id="nombres" name="nombres" class="form-control" required="" data-error="Debe ingresar nombre(s)">
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col col-md-4">
                            <div class="form-group has-feedback">
                                <label class="control-label" for="apellidos1">APELLIDO 1:</label>
                                <input type="text" id="apellidos1" name="apellidos1" class="form-control" required="" data-error="Debe ingresar apellidos 1">
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col col-md-4">
                            <div class="form-group has-feedback">
                                <label class="control-label" for="apellidos2">APELLIDO 2:</label>
                                <input type="text" id="apellidos2" name="apellidos2" class="form-control" required="" data-error="Debe ingresar apellidos 2">
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-md-4">
                            <div class="form-group has-feedback">
                                <label class="control-label" for="tipo_identificacion">TIPO IDENTIFICAICON:</label>
                                <select class="form-control" id="tipo_identificacion" name="tipo_identificacion" style="width: 100%" required="" data-error="Debe seccionar tipo de identificaicón"></select>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col col-md-4">
                            <div class="form-group has-feedback">
                                <label class="control-label" for="identificacion">NÚMERO DE IDENTIFICACIÓN:</label>
                                <input type="text" id="identificacion" name="identificacion" class="form-control" required="" data-error="Debe ingresar número de identificación">
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-md-4">
                            <div class="form-group has-feedback">
                                <label class="control-label" for="usaurio">USUARIO:</label>
                                <input type="text" id="usaurio" name="usaurio" class="form-control" required="" data-error="Debe ingresar usaurio">
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col col-md-4">
                            <div class="form-group has-feedback">
                                <label class="control-label" for="contrasena">CONTRASEÑA:</label>
                                <input type="password" id="contrasena" name="contrasena" class="form-control" required="" data-error="Debe ingresar contraseña">
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col col-md-4">
                            <div class="form-group has-feedback">
                                <label class="control-label" for="perfil">PERFIL USAURIO:</label>
                                <select class="form-control" id="perfil" name="perfil" style="width: 100%" required="" data-error="Debe seccionar perfil"></select>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-success">Guardar</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                </div>
            </form>
        </div> 
    </div>
</div>

<script src="../../js/usuarios.js"></script>