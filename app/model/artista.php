<?php 
class Artista{
	function __construct(){
		$this->business = new Business();
	}
	
	public function consultar(){
		$conn = $this->business->conn;
		$db = $this->business->db;
		//Valida conexión a base de datos
		if($conn){
			$arrayTabla = array();
			$query = "SELECT a.id, b.tipo_identificacion, a.identificacion, a.nombre, a.direccion, a.telefonos, a.pais, a.ciudad FROM re_datos_artista AS a LEFT JOIN pa_tipo_identificacion AS b ON a.id_tipo_identificacion = b.id;";
			$result = $conn->query($query);
			if($result){
				while($row = $result->fetch(PDO::FETCH_OBJ)){
					array_push($arrayTabla, $row);
				}
				$this->business->return->bool = true;
				$this->business->return->msg = json_encode($arrayTabla);
			} else {
				$this->business->return->bool = false;
				$this->business->return->msg = 'Erro al consultar de artista';
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
			$query  = "INSERT INTO re_datos_artista (id_tipo_identificacion, identificacion, nombre, direccion, telefonos, pais, ciudad) VALUES ('".$data->tipo_identificacion."', '".$data->numero_identificacion."', '".$data->nombre."', '".$data->direccion."', '".$data->telefono."', '".$data->pais."', '".$data->ciudad."');";
			$result = $conn->query($query);
			if($result){
				$id_artista = $conn->lastInsertId();
				for ($i = 1; $i <= $data->numero_obras; $i++){
					$tipo_obra 		= 'tipo_obra_'.$i;
					$nombre_obra 	= 'nombre_obra_'.$i;
					$en_venta 		= 'en_venta_'.$i;
					$precio 		= 'precio_'.$i;
					$sala_exposicion = 'sala_exposicion_'.$i;
					$posicion 		= 'posicion_'.$i;
					$query_obra = "INSERT INTO re_obra_arte (id_tipo_obra, nombre, id_artista, venta, precio, disponible) VALUES ('".$data->$tipo_obra."', '".$data->$nombre_obra."', '".$id_artista."', '".$data->$en_venta."', '".$data->$precio."', 'si');";
					$conn->query($query_obra);
					$id_obra = $conn->lastInsertId();
					$query_sala_obra = "INSERT INTO re_obra_sala (id_sala, id_obra, posicion, fecha_exposicion, estado) VALUES ('".$data->$sala_exposicion."', '".$id_obra."', '".$data->$posicion ."', '".$this->business->date."', 'activo');";
					$conn->query($query_sala_obra);
				}
				$this->business->return->bool = true;
				$this->business->return->msg = 'Se ha creado al artista correctamente';
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
				$this->business->return->msg = 'Se ha actualizado al artista correctamente';
			} else {
				$this->business->return->bool = false;
				$this->business->return->msg = 'Error al actualizar Menu';
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
				$this->business->return->msg = 'Se ha eliminado al artista correctamente';
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

	public function tipo_obra(){
		$conn = $this->business->conn;
		$db = $this->business->db;
		//Valida conexión a base de datos
		if($conn){
			$arrayTabla = array();
			$query = "SELECT id, tipo FROM pa_tipo_obra;";
			$result = $conn->query($query);
			if($result){
				while($row = $result->fetch(PDO::FETCH_OBJ)){
					array_push($arrayTabla, $row);
				}
				$this->business->return->bool = true;
				$this->business->return->msg = json_encode($arrayTabla);
			} else {
				$this->business->return->bool = false;
				$this->business->return->msg = 'Erro al consultar tipo de obra';
			}
		} else {
			$this->business->return->bool = false;
			$this->business->return->msg = 'Error de conexión de base de datos';
		}
		return $this->business->return;
	}

	public function sala_exposicion(){
		$conn = $this->business->conn;
		$db = $this->business->db;
		//Valida conexión a base de datos
		if($conn){
			$arrayTabla = array();
			$query = "SELECT id, sala FROM re_sala_exposicion;";
			$result = $conn->query($query);
			if($result){
				while($row = $result->fetch(PDO::FETCH_OBJ)){
					array_push($arrayTabla, $row);
				}
				$this->business->return->bool = true;
				$this->business->return->msg = json_encode($arrayTabla);
			} else {
				$this->business->return->bool = false;
				$this->business->return->msg = 'Erro al consultar tipo de obra';
			}
		} else {
			$this->business->return->bool = false;
			$this->business->return->msg = 'Error de conexión de base de datos';
		}
		return $this->business->return;
	}
}
?>

