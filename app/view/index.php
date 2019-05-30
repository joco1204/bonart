<?php include '../../config/header.php'; ?>
    <div class="wrapper">
        <header class="main-header">
            <nav class="navbar navbar-static-top">
                <div class="navbar-custom-menu">
                    <ul class="nav navbar-nav">
                        <li class="dropdown user user-menu">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <img src="../../img/logo_img.jpg" class="user-image" alt="User Image">
                                <span class="hidden-xs"><?php echo $session->getSession('nombre')." ".$session->getSession('apellido1'); ?></span>
                            </a>
                            <ul class="dropdown-menu">
                                <li class="user-header">
                                    <img src="../../img/logo_img.jpg" class="img-circle" alt="User Image">
                                    <p>
                                        <?php echo $session->getSession('nombre')." ".$session->getSession('apellido1'); ?>
                                        <br>
                                        <?php echo $session->getSession('perfil'); ?>
                                    </p>
                                </li>
                                <li class="user-footer">
                                    <div class="pull-left">
                                        <a href="#" class="btn btn-success btn-flat" data-toggle="modal" data-target="#modal_perfil">Perfil</a>
                                    </div>
                                    <div class="pull-right">
                                        <a href="#" onclick="javascript: logout();" class="btn btn-info btn-flat">Salir</a>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        <aside class="main-sidebar">
            <section class="sidebar">
                <div class="user-panel">
                    <div class="pull-left info">
                    </div>
                </div>
                <?php include 'menu.php'; ?> 
            </section>
        </aside>
        <div class="content-wrapper">
            <section class="content" id="contenido-index"></section>
        </div>
        <?php include '../../config/footer.php'; ?>
        <script type="text/javascript">
            pageContent('contenido');
        </script>
        <div id="modal_perfil" class="modal fade" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <form id="form_perfil" autocomplete="off">
                        <div class="modal-header bg-blue">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title text-center">PERFIL DE USUARIO</h4>
                            <input type="hidden" name="action" id="action" value="modificar_perfil">
                            <input type="hidden" name="id_usuario" id="id_usuario" value="<?php echo $session->getSession('id_usaurio'); ?>">
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col col-md-4">
                                    <div class="form-group has-feedback">
                                        <label class="control-label" for="nombres">NOMBRE(S):</label>
                                        <input type="text" id="nombres" name="nombres" class="form-control" value="<?php echo $session->getSession('nombre'); ?>" disabled="">
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div class="col col-md-4">
                                    <div class="form-group has-feedback">
                                        <label class="control-label" for="apellidos1">APELLIDO 1:</label>
                                        <input type="text" id="apellidos1" name="apellidos1" class="form-control" value="<?php echo $session->getSession('apellido1'); ?>"  disabled="">
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div class="col col-md-4">
                                    <div class="form-group has-feedback">
                                        <label class="control-label" for="apellidos2">APELLIDO 2:</label>
                                        <input type="text" id="apellidos2" name="apellidos2" class="form-control" value="<?php echo $session->getSession('apellido2'); ?>"  disabled="">
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col col-md-4">
                                    <div class="form-group has-feedback">
                                        <label class="control-label" for="tipo_identificacion">TIPO IDENTIFICAICON:</label>
                                        <input type="text" id="tipo_identificacion" name="tipo_identificacion" class="form-control" value="<?php echo $session->getSession('tipo_identificacion'); ?>"  disabled="">
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div class="col col-md-4">
                                    <div class="form-group has-feedback">
                                        <label class="control-label" for="identificacion">NÚMERO DE IDENTIFICACIÓN:</label>
                                        <input type="text" id="identificacion" name="identificacion" class="form-control" value="<?php echo $session->getSession('identificacion'); ?>"  disabled="">
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col col-md-6">
                                    <div class="form-group has-feedback">
                                        <label class="control-label" for="usaurio">USUARIO:</label>
                                        <input type="text" id="usaurio" name="usaurio" class="form-control" value="<?php echo $session->getSession('usuario'); ?>"  disabled="">
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div class="col col-md-6">
                                    <div class="form-group has-feedback">
                                        <label class="control-label" for="perfil">PERFIL USAURIO:</label>
                                        <input type="text" id="perfil" name="perfil" class="form-control" required="" data-error="Debe ingresar perfil" value="<?php echo $session->getSession('perfil'); ?>"  disabled="">
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col col-md-6">
                                    <div class="form-group has-feedback">
                                        <label class="control-label" for="cambiar_contrasena">CAMBIAR CONTRASEÑA:</label>
                                        <input type="password" id="cambiar_contrasena" name="cambiar_contrasena" class="form-control">
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div class="col col-md-6">
                                    <div class="form-group has-feedback">
                                        <label class="control-label" for="repetir_cambiar_contrasena">REPETIR CONTRASEÑA:</label>
                                        <input type="password" id="repetir_cambiar_contrasena" name="repetir_cambiar_contrasena" class="form-control">
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
    <script src="../../js/perfil.js"></script>
