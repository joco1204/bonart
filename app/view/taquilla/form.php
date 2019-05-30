<?php 
include '../../../config/session.php'; 
$session = new Session();
$session->start();

if(!$session->getSession('token') || $session->getSession('token') == ''){
    $session->destroy();
    header('location: ../../index.php');
}
?>
<section class="content-header text-center">
    <button type="button" class="btn btn-danger" onclick="javascript: pageContent('pedido/index'); ">Volver</button>
</section>
<section class="content">
	<div class="row">
		<div class="col-lg-8 col-lg-offset-2">
			<form id="taquilla_form" autocomplete="off">
				<div class="panel panel-primary">
					<div class="panel-heading">
						<h5>Pedido</h5>
						<input type="hidden" id="action" name="action" value="crear">
					</div>
					<div class="panel-body">
						<div class="row">
							<div class="col-lg-12">
								<div class="form-group has-feedback">
									<label for="fecha" class="control-label">Tipo de menú:</label>
									<select id="tipo_menu" name="tipo_menu" class="form-control"></select>
								</div>
							</div>
					    </div>
					</div>
				</div>
		    </form>	
		</div>
	</div>
</section>
<script src="../../js/crear_taquilla.js"></script>