<?php
require_once 'config.php';
//Clase de conexión a MySQL 
class Connect extends PDO{
	//Parametros de conexión a la base de datos
	private $type = MOTOR_DB;
	private $host = HOST_DB;
	private $user = USER_DB;
	private $pass = PASS_DB;
	private $base = DATABASE;
	private $cset = CHARSET;
	//Constructor de conexión a la pase de datos
	public function __construct(){
		//Definicion del string de conexión a la base de datos
		$strc = $this->type.':host='.$this->host.';dbname='.$this->base.';charset='.$this->cset;
		$user = $this->user;
		$pass = $this->pass; 
		//conexión a la base de datos
		try{
			$conn = parent::__construct($strc, $user, $pass);
		} catch(PDOException $e){
			$conn = "Error al conectar la base de datos: ".$e->getMessage()."<br>";
		}
		return $conn;
	}
}


?>