<!-- sidebar menu: : style can be found in sidebar.less -->
<ul class="sidebar-menu">
    <li class="active treeview">
        <a href="#" onclick="javascript: pageContent('contenido');">
            <i class="fa fa-dashboard"></i> <span>INICIO</span>
        </a>
    </li>
    <?php if($session->getSession('id_perfil') == '1'){ ?>
        <li class="treeview bg-blue">
            <a href="#" onclick="javascript: pageContent('admin/index');">
                <i class="ion ion-android-settings"></i>
                <span class="bg-blue">ADMINISTRACIÓN</span>
            </a>
        </li>
    <?php } ?>
    <li class="treeview bg-green">
        <a href="#" onclick="javascript: pageContent('artista/index');">
            <i class="ion ion-android-color-palette"></i>
            <span class="bg-green">ARTISTA</span>
        </a>
    </li>
    <?php if($session->getSession('id_perfil') == '1' || $session->getSession('id_perfil') == '3'){ ?>
        <li class="treeview bg-yellow">
            <a href="#" onclick="javascript: pageContent('taquilla/index');">
                <i class="ion ion-android-film"></i>
                <span class="bg-yellow">TAQUILLA</span>
            </a>
        </li>
    <?php } ?>
    <?php if($session->getSession('id_perfil') == '1' || $session->getSession('id_perfil') == '4'){ ?>
        <li class="treeview bg-red">
            <a href="#" onclick="javascript: pageContent('ventas/index');">
                <i class="ion ion-android-cart"></i>
                <span class="bg-red">VENTAS</span>
            </a>
        </li>
    <?php } ?>
</ul>