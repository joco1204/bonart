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
							<div class="col-lg-6">
								<div class="form-group has-feedback">
			                        <label for="tipo_identificacion" class="control-label">Tipo de identificación:</label>
			                        <select name="tipo_identificacion" id="tipo_identificacion" class="form-control" data-error="Debe seleccionar tipo de identificación" required="">
			                        </select>
			                        <div class="help-block with-errors"></div>
			                    </div>
							</div>
							<div class="col-lg-6">
								<div class="form-group has-feedback">
									<label for="numero_identificacion" class="control-label">Número de identificación:</label>
				                    <input type="number" class="form-control" id="numero_identificacion" name="numero_identificacion" required="" data-error="Debe ingresar número de identificación">
				                    <div class="help-block with-errors"></div>
								</div>
							</div>
					    </div>

					    <div class="row">
							<div class="col-lg-6">
								<div class="form-group has-feedback">
									<label for="nombre" class="control-label">Nombre:</label>
				                    <input type="text" class="form-control" id="nombre" name="nombre" placeholder="Ingrese nombre de artista" required="" data-error="Debe ingresar nombre del artista">
				                    <div class="help-block with-errors"></div>
								</div>
							</div>
							<div class="col-lg-6">
								<div class="form-group has-feedback">
									<label for="telefono" class="control-label">Teléfono:</label>
				                    <input type="text" class="form-control" id="telefono" name="telefono" placeholder="Ingrese teléfono" required="" data-error="Debe ingresar teléfono">
				                    <div class="help-block with-errors"></div>
								</div>
							</div>
					    </div>

					    <div class="row">
							<div class="col-lg-6">
								<div class="form-group has-feedback">
									<label for="email" class="control-label">Email:</label>
				                    <input type="email" class="form-control" id="email" name="email" required="" data-error="Debe ingresar email">
				                    <div class="help-block with-errors"></div>
								</div>
							</div>
							<div class="col-lg-6">
								<div class="form-group has-feedback">
									<label for="tarifa" class="control-label">Tarifa:</label>
				                    <select name="tipo_identificacion" id="tarifa" class="form-control" data-error="Debe seleccionar tarifa" required="">
			                        </select>
				                    <div class="help-block with-errors"></div>
								</div>
							</div>
					    </div>
					    <hr>
					    <div class="row">
							<div class="col-lg-12">
								<div class="form-group has-feedback">
									<label for="total" class="control-label">Total:</label>
				                    <input type="number" class="form-control" id="total" name="total" readonly="" value="0">
				                    <div class="help-block with-errors"></div>
								</div>
							</div>
					    </div>
					    <hr>
					    <div class="row">
							<div class="col-lg-12">
								<button type="submit" class="btn btn-success" id="guardar">Guardar</button>
							</div>
						</div>
						<br>
					</div>
				</div>
		    </form>	
		</div>
	</div>
</section>
<script src="../../js/crear_taquilla.js"></script>