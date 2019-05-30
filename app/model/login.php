<?php
class Login{
	function __construct(){
		$this->bsn = new Business();
	}
	//Login method
	public function login($user, $pass){
		$conn = $this->bsn->conn;
		$db = $this->bsn->db;
		$session = $this->bsn->session;
		//Validate the connection of db
		if($conn){
			$password = sha1($pass);
			$query  = "SELECT id, password, estado FROM re_usuarios WHERE usuario = '".$user."' LIMIT 1;";
			$result = $conn->query($query);
			if($result){
				if($result->rowCount() > 0){
					while($row = $result->fetch(PDO::FETCH_OBJ)){
						if($row->password != $password){
							$bool = false;
							$msg = 'Contraseña incorrecta';
						} else {
							if($row->estado == 'activo'){
								$getUser = array(
									'iduser' => $row->id,
									'token' => $session->token()
								);
								$bool = true;
								$msg = json_encode($getUser);
							} else {
								$bool = false;
								$msg = 'El usuario está inactivo';
							}
						}
					}
					$bool = $bool;
					$response = $msg;
				} else {
					$bool = false;
					$response = 'Usuario incorrecto';
				}
				$this->bsn->return->bool = $bool;
				$this->bsn->return->msg = $response;
			} else {
				$this->bsn->return->bool = false;
				$this->bsn->return->msg = 'Error de consulta (Comuníquese con el área de desarrollo)';
			}
		} else {
			$this->bsn->return->bool = false;
			$this->bsn->return->msg = 'Error de conexión de base de datos (Comuníquese con el área de desarrollo)';
		}
		return $this->bsn->return;
	}
	//Session method
	public function session($iduser, $token){
		$conn = $this->bsn->conn;
		$db = $this->bsn->db;
		$session = $this->bsn->session;
		if ($conn){
			$query  = "SELECT a.id AS id_usuario, a.usuario, d.id AS id_perfil, d.perfil, a.nombre, a.apellido1, a.apellido2, b.tipo_identificacion, a.identificacion, a.estado ";
			$query .= "FROM re_usuarios AS a ";
			$query .= "LEFT JOIN pa_tipo_identificacion AS b ON a.tipo_identificacion = b.id ";
			$query .= "LEFT JOIN re_usuario_perfil AS c ON a.id = c.id_usuario ";
			$query .= "LEFT JOIN pa_perfiles AS d ON c.id_perfil = d.id ";
			$query .= "WHERE a.estado = 'activo' AND a.id = '".$iduser."' ";
			$query .= "LIMIT 1; ";
			$result = $conn->query($query);
			if($result){
				if($result->rowCount() > 0){
					while ($row = $result->fetch(PDO::FETCH_OBJ)){
						$row->token = $token;
						$session->start();
						$session->setSession('id_usaurio', $row->id_usuario);
						$session->setSession('usuario', $row->usuario);
						$session->setSession('id_perfil', $row->id_perfil);
						$session->setSession('perfil', $row->perfil);
						$session->setSession('nombre', $row->nombre);
						$session->setSession('apellido1', $row->apellido1);
						$session->setSession('apellido2', $row->apellido2);
						$session->setSession('tipo_identificacion', $row->tipo_identificacion);
						$session->setSession('identificacion', $row->identificacion);
						$session->setSession('estado', $row->estado);
						$session->setSession('token', $row->token);
					}

					//array get sessión
					$getSession = array(
						'id_usaurio' => $session->getSession('id_usaurio'),
						'usuario' => $session->getSession('usuario'),
						'id_perfil' => $session->getSession('id_perfil'),
						'perfil' => $session->getSession('perfil'),
						'nombre' => $session->getSession('nombre'),
						'apellido1' => $session->getSession('apellido1'),
						'apellido2' => $session->getSession('apellido2'),
						'tipo_identificacion' => $session->getSession('tipo_identificacion'),
						'identificacion' => $session->getSession('identificacion'),
						'estado' => $session->getSession('estado'),
						'token' => $session->getSession('token')
					);

					$bool = true;
					$msg = json_encode($getSession);
				} else {
					$bool = false;
					$msg = "No se ha iniciado sessión (Comuníquese con el área de desarrollo)";
				}
				$this->bsn->return->bool = $bool;
				$this->bsn->return->msg = $msg;
			} else {
				$this->bsn->return->bool = false;
				$this->bsn->return->msg = 'Error de consulta (Comuníquese con el área de desarrollo)';
			}

		}else{
			$this->bsn->return->bool = false;
			$this->bsn->return->msg = 'Error de conexión de base de datos (Comuníquese con el área de desarrollo)';
		}
		return $this->bsn->return;
	}
}
?>