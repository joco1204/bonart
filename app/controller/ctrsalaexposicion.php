<?php
include '../../config/business.php';
$business = new Business();
$salaexposicion = new SalaExposicion();
$post = $business->post;
//Validate the existence of the action
if(isset($post->action)){
	switch ($post->action){
		case 'consultar':
			$result = $salaexposicion->consultar();
			$business->return = $result;
		break;
		case 'crear':
			$result = $salaexposicion->crear($post);
			$business->return = $result;
		break;
		case 'modificar':
			$result = $salaexposicion->modificar($post);
			$business->return = $result;
		break;
		case 'eliminar':
			$result = $salaexposicion->eliminar($post);
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