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
    <h1>ADMINISTRACIÓN</h1>
    <div class="row">
        <div class="col col-md-12 text-center">
            <button type="button" class="btn btn-danger" onclick="javascript: pageContent('contenido');">Volver</button>
        </div>
    </div>
</section>

<section class="content">
    <div class="row">    
        <div class="col-lg-4">
            <div class="small-box bg-blue" onclick="javascript: pageContent('admin/usuarios/index');" style="cursor: pointer;">
                <div class="inner">
                    <h2>USUARIOS</h2>
                    <p style="color: #0073b7">1</p>
                </div>
                <div class="icon">
                    <i class=""></i>
                </div>
                <a href="#" onclick="javascript: pageContent('admin/usuarios/index');" class="small-box-footer">Ver <i class="fa fa-arrow-circle-right"></i></a>
            </div>
        </div>

        <div class="col-lg-4">
            <div class="small-box bg-blue" onclick="javascript: pageContent('admin/tarifas/index');" style="cursor: pointer;">
                <div class="inner">
                    <h2>TARIFAS</h2>
                    <p style="color: #0073b7">2</p>
                </div>
                <div class="icon">
                    <i class=""></i>
                </div>
                <a href="#" onclick="javascript: pageContent('admin/tarifas/index');" class="small-box-footer">Ver <i class="fa fa-arrow-circle-right"></i></a>
            </div>
        </div>

        <div class="col-lg-4">
            <div class="small-box bg-blue" onclick="javascript: pageContent('admin/sala_exposicion/index');" style="cursor: pointer;">
                <div class="inner">
                    <h2>SALAS DE EXPOSICIÓN</h2>
                    <p style="color: #0073b7">3</p>
                </div>
                <div class="icon">
                    <i class=""></i>
                </div>
                <a href="#" onclick="javascript: pageContent('admin/sala_exposicion/index');" class="small-box-footer">Ver <i class="fa fa-arrow-circle-right"></i></a>
            </div>
        </div>
            
    </div>
</section>