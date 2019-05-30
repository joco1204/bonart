<?php
include '../../config/business.php';
$business = new Business();
$producto = new Pedido();
$post = $business->post;
//Validate the existence of the action
if(isset($post->action)){
	switch ($post->action){
		case 'consultar':
			$result = $producto->consultar();
			$business->return = $result;
		break;
		case 'crear':
			$result = $producto->crear($post);
			$business->return = $result;
		break;
		case 'modificar':
			$result = $producto->modificar($post);
			$business->return = $result;
		break;
		case 'eliminar':
			$result = $producto->eliminar($post);
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