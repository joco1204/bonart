<?php 
include '../../config/session.php'; 
$session = new Session();
$session->start();

if(!$session->getSession('token') || $session->getSession('token') == ''){
    $session->destroy();
    header('location: ../../index.php');
}
?>
<section class="content-header">
    <h1>PANEL PRINCIPAL</h1>
</section>
<section class="content">
    <div class="row">
        <?php if($session->getSession('id_perfil') == '1'){ ?>
            <div class="col-lg-3">
                <div class="small-box bg-blue" onclick="javascript: pageContent('admin/index');" style="cursor: pointer;">
                    <div class="inner">
                        <h2>ADMINISTRACIÓN</h2>
                        <p style="color: #0073b7">0</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-android-settings"></i>
                    </div>
                    <a href="#" onclick="javascript: pageContent('admin/index');" class="small-box-footer">Ver <i class="fa fa-arrow-circle-right"></i></a>
                </div>
            </div>
        <?php } ?>
        <div class="col-lg-3">
            <div class="small-box bg-green" onclick="javascript: pageContent('artista/index');" style="cursor: pointer;">
                <div class="inner">
                    <h2>ARTISTA</h2>
                    <p style="color: #00a65a;">1</p>
                </div>
                <div class="icon">
                    <i class="ion ion-android-color-palette"></i>
                </div>
                <a href="#" onclick="javascript: pageContent('artista/index');" class="small-box-footer">Ver <i class="fa fa-arrow-circle-right"></i></a>
            </div>
        </div>
        <?php if($session->getSession('id_perfil') == '1' || $session->getSession('id_perfil') == '3'){ ?>
            <div class="col-lg-3">
                <div class="small-box bg-yellow" onclick="javascript: pageContent('taquilla/index');" style="cursor: pointer;">
                    <div class="inner">
                        <h2>TAQUILLA</h2>
                        <p style="color: #f39c12;">2</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-android-film"></i>
                    </div>
                    <a href="#" onclick="javascript: pageContent('taquilla/index');" class="small-box-footer">Ver <i class="fa fa-arrow-circle-right"></i></a>
                </div>
            </div>
        <?php } ?>
        <?php if($session->getSession('id_perfil') == '1' || $session->getSession('id_perfil') == '4'){ ?>
            <div class="col-lg-3">
                <div class="small-box bg-red" onclick="javascript: pageContent('venta/index');" style="cursor: pointer;">
                    <div class="inner">
                        <h2>VENTAS</h2>
                        <p style="color: #dd4b39;">3</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-android-cart"></i>
                    </div>
                    <a href="#" onclick="javascript: pageContent('venta/index');" class="small-box-footer">Ver <i class="fa fa-arrow-circle-right"></i></a>
                </div>
            </div>
        <?php } ?>
    </div>
</section>