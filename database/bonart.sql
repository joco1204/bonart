-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         10.1.38-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win32
-- HeidiSQL Versión:             10.1.0.5464
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para bonart
CREATE DATABASE IF NOT EXISTS `bonart` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `bonart`;

-- Volcando estructura para tabla bonart.pa_perfiles
CREATE TABLE IF NOT EXISTS `pa_perfiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `perfil` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bonart.pa_perfiles: ~3 rows (aproximadamente)
DELETE FROM `pa_perfiles`;
/*!40000 ALTER TABLE `pa_perfiles` DISABLE KEYS */;
INSERT INTO `pa_perfiles` (`id`, `perfil`) VALUES
	(1, 'Administrador');
INSERT INTO `pa_perfiles` (`id`, `perfil`) VALUES
	(2, 'Vendedor');
INSERT INTO `pa_perfiles` (`id`, `perfil`) VALUES
	(3, 'Taquillero');
/*!40000 ALTER TABLE `pa_perfiles` ENABLE KEYS */;

-- Volcando estructura para tabla bonart.pa_tarifa
CREATE TABLE IF NOT EXISTS `pa_tarifa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoria` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `precio` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla bonart.pa_tarifa: ~0 rows (aproximadamente)
DELETE FROM `pa_tarifa`;
/*!40000 ALTER TABLE `pa_tarifa` DISABLE KEYS */;
/*!40000 ALTER TABLE `pa_tarifa` ENABLE KEYS */;

-- Volcando estructura para tabla bonart.pa_tipo_identificacion
CREATE TABLE IF NOT EXISTS `pa_tipo_identificacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_identificacion` varchar(30) NOT NULL,
  `estado` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bonart.pa_tipo_identificacion: ~2 rows (aproximadamente)
DELETE FROM `pa_tipo_identificacion`;
/*!40000 ALTER TABLE `pa_tipo_identificacion` DISABLE KEYS */;
INSERT INTO `pa_tipo_identificacion` (`id`, `tipo_identificacion`, `estado`) VALUES
	(1, 'C.C.', 'activo');
INSERT INTO `pa_tipo_identificacion` (`id`, `tipo_identificacion`, `estado`) VALUES
	(2, 'C.E.', 'activo');
INSERT INTO `pa_tipo_identificacion` (`id`, `tipo_identificacion`, `estado`) VALUES
	(3, 'NIT.', 'activo');
/*!40000 ALTER TABLE `pa_tipo_identificacion` ENABLE KEYS */;

-- Volcando estructura para tabla bonart.pa_tipo_obra
CREATE TABLE IF NOT EXISTS `pa_tipo_obra` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla bonart.pa_tipo_obra: ~3 rows (aproximadamente)
DELETE FROM `pa_tipo_obra`;
/*!40000 ALTER TABLE `pa_tipo_obra` DISABLE KEYS */;
INSERT INTO `pa_tipo_obra` (`id`, `tipo`) VALUES
	(1, 'pinturas');
INSERT INTO `pa_tipo_obra` (`id`, `tipo`) VALUES
	(2, 'esculturas');
INSERT INTO `pa_tipo_obra` (`id`, `tipo`) VALUES
	(3, 'grabados');
INSERT INTO `pa_tipo_obra` (`id`, `tipo`) VALUES
	(4, 'dibujos');
/*!40000 ALTER TABLE `pa_tipo_obra` ENABLE KEYS */;

-- Volcando estructura para tabla bonart.re_cliente_taquilla
CREATE TABLE IF NOT EXISTS `re_cliente_taquilla` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_tipo_identificacion` int(11) NOT NULL,
  `identificacion` int(11) NOT NULL,
  `nombre` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `telefono` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `id_tarifa` int(11) NOT NULL,
  `fecha_taquilla` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla bonart.re_cliente_taquilla: ~0 rows (aproximadamente)
DELETE FROM `re_cliente_taquilla`;
/*!40000 ALTER TABLE `re_cliente_taquilla` DISABLE KEYS */;
/*!40000 ALTER TABLE `re_cliente_taquilla` ENABLE KEYS */;

-- Volcando estructura para tabla bonart.re_datos_artista
CREATE TABLE IF NOT EXISTS `re_datos_artista` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_tipo_identificacion` int(11) NOT NULL,
  `identificacion` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `nombre` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `direccion` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `telefonos` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `pais` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `ciudad` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla bonart.re_datos_artista: ~0 rows (aproximadamente)
DELETE FROM `re_datos_artista`;
/*!40000 ALTER TABLE `re_datos_artista` DISABLE KEYS */;
/*!40000 ALTER TABLE `re_datos_artista` ENABLE KEYS */;

-- Volcando estructura para tabla bonart.re_obra_arte
CREATE TABLE IF NOT EXISTS `re_obra_arte` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_tipo_obra` int(11) NOT NULL,
  `nombre` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `id_artista` int(11) NOT NULL,
  `venta` varchar(2) COLLATE utf8_unicode_ci NOT NULL,
  `precio` int(10) NOT NULL,
  `disponible` varchar(2) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla bonart.re_obra_arte: ~0 rows (aproximadamente)
DELETE FROM `re_obra_arte`;
/*!40000 ALTER TABLE `re_obra_arte` DISABLE KEYS */;
/*!40000 ALTER TABLE `re_obra_arte` ENABLE KEYS */;

-- Volcando estructura para tabla bonart.re_obra_sala
CREATE TABLE IF NOT EXISTS `re_obra_sala` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_sala` int(11) NOT NULL,
  `id_obra` int(11) NOT NULL,
  `posicion` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `fecha_exposicion` date NOT NULL,
  `estado` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla bonart.re_obra_sala: ~0 rows (aproximadamente)
DELETE FROM `re_obra_sala`;
/*!40000 ALTER TABLE `re_obra_sala` DISABLE KEYS */;
/*!40000 ALTER TABLE `re_obra_sala` ENABLE KEYS */;

-- Volcando estructura para tabla bonart.re_sala_exposicion
CREATE TABLE IF NOT EXISTS `re_sala_exposicion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sala` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `id_vendedor` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla bonart.re_sala_exposicion: ~0 rows (aproximadamente)
DELETE FROM `re_sala_exposicion`;
/*!40000 ALTER TABLE `re_sala_exposicion` DISABLE KEYS */;
/*!40000 ALTER TABLE `re_sala_exposicion` ENABLE KEYS */;

-- Volcando estructura para tabla bonart.re_usuarios
CREATE TABLE IF NOT EXISTS `re_usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(100) NOT NULL,
  `password` varchar(250) NOT NULL,
  `tipo_identificacion` int(11) NOT NULL,
  `identificacion` varchar(30) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `apellido1` varchar(250) NOT NULL,
  `apellido2` varchar(250) DEFAULT NULL,
  `estado` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='Usuarios del sistema';

-- Volcando datos para la tabla bonart.re_usuarios: ~1 rows (aproximadamente)
DELETE FROM `re_usuarios`;
/*!40000 ALTER TABLE `re_usuarios` DISABLE KEYS */;
INSERT INTO `re_usuarios` (`id`, `usuario`, `password`, `tipo_identificacion`, `identificacion`, `nombre`, `apellido1`, `apellido2`, `estado`) VALUES
	(1, 'admin', 'd033e22ae348aeb5660fc2140aec35850c4da997', 1, '999999999', 'Administrador', 'Aplicación', '', 'activo');
/*!40000 ALTER TABLE `re_usuarios` ENABLE KEYS */;

-- Volcando estructura para tabla bonart.re_usuario_perfil
CREATE TABLE IF NOT EXISTS `re_usuario_perfil` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_perfil` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bonart.re_usuario_perfil: ~2 rows (aproximadamente)
DELETE FROM `re_usuario_perfil`;
/*!40000 ALTER TABLE `re_usuario_perfil` DISABLE KEYS */;
INSERT INTO `re_usuario_perfil` (`id`, `id_usuario`, `id_perfil`) VALUES
	(1, 1, 1);
/*!40000 ALTER TABLE `re_usuario_perfil` ENABLE KEYS */;

-- Volcando estructura para tabla bonart.re_venta
CREATE TABLE IF NOT EXISTS `re_venta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_cliente` int(11) NOT NULL,
  `id_vendedor` int(11) NOT NULL,
  `id_sala` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `precio_total` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla bonart.re_venta: ~0 rows (aproximadamente)
DELETE FROM `re_venta`;
/*!40000 ALTER TABLE `re_venta` DISABLE KEYS */;
/*!40000 ALTER TABLE `re_venta` ENABLE KEYS */;

-- Volcando estructura para tabla bonart.re_venta_detalle
CREATE TABLE IF NOT EXISTS `re_venta_detalle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_obra` int(11) NOT NULL,
  `precio` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla bonart.re_venta_detalle: ~0 rows (aproximadamente)
DELETE FROM `re_venta_detalle`;
/*!40000 ALTER TABLE `re_venta_detalle` DISABLE KEYS */;
/*!40000 ALTER TABLE `re_venta_detalle` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
