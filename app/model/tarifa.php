<?php 
class Tarifa{
	function __construct(){
		$this->business = new Business();
	}
	
	public function consultar(){
		$conn = $this->business->conn;
		$db = $this->business->db;
		//Valida conexión a base de datos
		if($conn){
			$arrayTabla = array();
			$query = "SELECT id, categoria, precio FROM pa_tarifa;";
			$result = $conn->query($query);
			if($result){
				while($row = $result->fetch(PDO::FETCH_OBJ)){
					array_push($arrayTabla, $row);
				}
				$this->business->return->bool = true;
				$this->business->return->msg = json_encode($arrayTabla);
			} else {
				$this->business->return->bool = false;
				$this->business->return->msg = 'Erro al consultar producto';
			}
		} else {
			$this->business->return->bool = false;
			$this->business->return->msg = 'Error de conexión de base de datos';
		}
		return $this->business->return;
	}

	public function crear($data){
		$conn = $this->business->conn;
		$db = $this->business->db;
		//Valida conexión a base de datos
		if($conn){
			$query  = "INSERT INTO pa_tarifa (categoria, precio) VALUES ('".$data->categoria."', '".$data->precio."');";
			$result = $conn->query($query);
			if($result){
				$this->business->return->bool = true;
				$this->business->return->msg = 'Se ha creado tarifa correctamente';
			} else {
				$this->business->return->bool = false;
				$this->business->return->msg = 'Error query';
			}
		} else {
			$this->business->return->bool = false;
			$this->business->return->msg = 'Error de conexión de base de datos';
		}
		return $this->business->return;
	}

	public function modificar($data){
		$conn = $this->business->conn;
		$db = $this->business->db;
		//Valida conexión a base de datos
		if($conn){
			$query = "";
			$result = $conn->query($query);
			if($result){
				$this->business->return->bool = true;
				$this->business->return->msg = 'Se ha actualizado la tarifa correctamente';
			} else {
				$this->business->return->bool = false;
				$this->business->return->msg = 'Error al actualizar tarifa';
			}
		} else {
			$this->business->return->bool = false;
			$this->business->return->msg = 'Error de conexión de base de datos';
		}
		return $this->business->return;
	}

	public function eliminar($data){
		$conn = $this->business->conn;
		$db = $this->business->db;
		//Valida conexión a base de datos
		if($conn){
			$query = "";
			$result = $conn->query($query);
			if($result){
				$this->business->return->bool = true;
				$this->business->return->msg = 'Se ha eliminado la tarifa correctamente';
			} else {
				$this->business->return->bool = false;
				$this->business->return->msg = 'Error al actualizar producto';
			}
		} else {
			$this->business->return->bool = false;
			$this->business->return->msg = 'Error de conexión de base de datos';
		}
		return $this->business->return;
	}

	public function lista_tarifa(){
		$conn = $this->business->conn;
		$db = $this->business->db;
		//Valida conexión a base de datos
		if($conn){
			$arrayTabla = array();
			$query = "SELECT id, categoria FROM pa_tarifa;";
			$result = $conn->query($query);
			if($result){
				while($row = $result->fetch(PDO::FETCH_OBJ)){
					array_push($arrayTabla, $row);
				}
				$this->business->return->bool = true;
				$this->business->return->msg = json_encode($arrayTabla);
			} else {
				$this->business->return->bool = false;
				$this->business->return->msg = 'Erro al consultar tarifa';
			}
		} else {
			$this->business->return->bool = false;
			$this->business->return->msg = 'Error de conexión de base de datos';
		}
		return $this->business->return;
	}
}
?>