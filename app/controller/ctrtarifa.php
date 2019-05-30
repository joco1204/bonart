<?php
include '../../config/business.php';
$business = new Business();
$tarifa = new Tarifa();
$post = $business->post;
//Validate the existence of the action
if(isset($post->action)){
	switch ($post->action){
		case 'consultar':
			$result = $tarifa->consultar();
			$business->return = $result;
		break;
		case 'crear':
			$result = $tarifa->crear($post);
			$business->return = $result;
		break;
		case 'modificar':
			$result = $tarifa->modificar($post);
			$business->return = $result;
		break;
		case 'eliminar':
			$result = $tarifa->eliminar($post);
			$business->return = $result;
		break;
		case 'lista_tarifa':
			$result = $tarifa->lista_tarifa();
			$business->return = $result;
		break;
		case 'tarifa_precio':
			$result = $tarifa->tarifa_precio($post);
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