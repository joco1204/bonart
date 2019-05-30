<?php 
class SalaExposicion{
	function __construct(){
		$this->business = new Business();
	}
	
	public function consultar(){
		$conn = $this->business->conn;
		$db = $this->business->db;
		//Valida conexión a base de datos
		if($conn){
			$arrayTabla = array();
			$query = "SELECT a.id, a.sala, CONCAT(b.nombre,' ',b.apellido1) AS vendedor FROM re_sala_exposicion AS a LEFT JOIN re_usuarios AS b ON a.id_vendedor = b.id;";
			$result = $conn->query($query);
			if($result){
				while($row = $result->fetch(PDO::FETCH_OBJ)){
					array_push($arrayTabla, $row);
				}
				$this->business->return->bool = true;
				$this->business->return->msg = json_encode($arrayTabla);
			} else {
				$this->business->return->bool = false;
				$this->business->return->msg = 'Erro al consultar sala de exposición';
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
			$query  = "INSERT INTO re_sala_exposicion (sala, id_vendedor) VALUES ('".$data->sala_exposicion."', '".$data->vendedor."');";
			$result = $conn->query($query);
			if($result){
				$this->business->return->bool = true;
				$this->business->return->msg = 'Se ha creado sala de exposición';
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
				$this->business->return->msg = 'Se ha actualizado la sala de exposición';
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

	public function eliminar($data){
		$conn = $this->business->conn;
		$db = $this->business->db;
		//Valida conexión a base de datos
		if($conn){
			$query = "";
			$result = $conn->query($query);
			if($result){
				$this->business->return->bool = true;
				$this->business->return->msg = 'Se ha eliminado la sala de exposición';
			} else {
				$this->business->return->bool = false;
				$this->business->return->msg = 'Error al actualizar menú';
			}
		} else {
			$this->business->return->bool = false;
			$this->business->return->msg = 'Error de conexión de base de datos';
		}
		return $this->business->return;
	}
}
?>