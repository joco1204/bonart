<?php
include '../../config/business.php';
$business = new Business();
$artista = new Artista();
$post = $business->post;
//Validate the existence of the action
if(isset($post->action)){
	switch ($post->action){
		case 'consultar':
			$result = $artista->consultar();
			$business->return = $result;
		break;
		case 'crear':
			$result = $artista->crear($post);
			$business->return = $result;
		break;
		case 'modificar':
			$result = $artista->modificar($post);
			$business->return = $result;
		break;
		case 'eliminar':
			$result = $artista->eliminar($post);
			$business->return = $result;
		break;
		case 'tipo_obra':
			$result = $artista->tipo_obra();
			$business->return = $result;
		break;
		case 'sala_exposicion':
			$result = $artista->sala_exposicion();
			$business->return = $result;
		break;
		default:
			$business->return->bool = false;
			$business->return->msg = 'Acción No Encontrada';
		break;
	}
} else {
	$business->return->bolean = false;
	$business->return->msg = 'Acción No Encontrada';		
}
echo json_encode((array) $business->return);
?>