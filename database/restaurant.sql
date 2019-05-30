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


-- Volcando estructura de base de datos para restaurant
CREATE DATABASE IF NOT EXISTS `restaurant` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `restaurant`;

-- Volcando estructura para tabla restaurant.pa_perfiles
CREATE TABLE IF NOT EXISTS `pa_perfiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `perfil` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla restaurant.pa_perfiles: ~3 rows (aproximadamente)
DELETE FROM `pa_perfiles`;
/*!40000 ALTER TABLE `pa_perfiles` DISABLE KEYS */;
INSERT INTO `pa_perfiles` (`id`, `perfil`) VALUES
	(1, 'Administrador');
INSERT INTO `pa_perfiles` (`id`, `perfil`) VALUES
	(2, 'Cajero');
INSERT INTO `pa_perfiles` (`id`, `perfil`) VALUES
	(3, 'Mesero');
/*!40000 ALTER TABLE `pa_perfiles` ENABLE KEYS */;

-- Volcando estructura para tabla restaurant.pa_tipo_identificacion
CREATE TABLE IF NOT EXISTS `pa_tipo_identificacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_identificacion` varchar(30) NOT NULL,
  `estado` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla restaurant.pa_tipo_identificacion: ~3 rows (aproximadamente)
DELETE FROM `pa_tipo_identificacion`;
/*!40000 ALTER TABLE `pa_tipo_identificacion` DISABLE KEYS */;
INSERT INTO `pa_tipo_identificacion` (`id`, `tipo_identificacion`, `estado`) VALUES
	(1, 'C.C.', 'activo');
INSERT INTO `pa_tipo_identificacion` (`id`, `tipo_identificacion`, `estado`) VALUES
	(2, 'C.E.', 'activo');
INSERT INTO `pa_tipo_identificacion` (`id`, `tipo_identificacion`, `estado`) VALUES
	(3, 'NIT.', 'activo');
/*!40000 ALTER TABLE `pa_tipo_identificacion` ENABLE KEYS */;

-- Volcando estructura para tabla restaurant.re_kardex
CREATE TABLE IF NOT EXISTS `re_kardex` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item` text COLLATE utf8_unicode_ci NOT NULL,
  `estado` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla restaurant.re_kardex: ~1 rows (aproximadamente)
DELETE FROM `re_kardex`;
/*!40000 ALTER TABLE `re_kardex` DISABLE KEYS */;
/*!40000 ALTER TABLE `re_kardex` ENABLE KEYS */;

-- Volcando estructura para tabla restaurant.re_menu
CREATE TABLE IF NOT EXISTS `re_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_menu` date NOT NULL,
  `tipo_menu` int(11) NOT NULL,
  `nombre_menu` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `valor` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla restaurant.re_menu: ~0 rows (aproximadamente)
DELETE FROM `re_menu`;
/*!40000 ALTER TABLE `re_menu` DISABLE KEYS */;
/*!40000 ALTER TABLE `re_menu` ENABLE KEYS */;

-- Volcando estructura para tabla restaurant.re_pedido
CREATE TABLE IF NOT EXISTS `re_pedido` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_menu` int(11) NOT NULL,
  `numero_mesa` int(11) NOT NULL,
  `precio_total` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `estado` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla restaurant.re_pedido: ~0 rows (aproximadamente)
DELETE FROM `re_pedido`;
/*!40000 ALTER TABLE `re_pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `re_pedido` ENABLE KEYS */;

-- Volcando estructura para tabla restaurant.re_producto
CREATE TABLE IF NOT EXISTS `re_producto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_kardex` int(11) NOT NULL,
  `cantidad` int(6) NOT NULL DEFAULT '0',
  `estado` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla restaurant.re_producto: ~0 rows (aproximadamente)
DELETE FROM `re_producto`;
/*!40000 ALTER TABLE `re_producto` DISABLE KEYS */;
/*!40000 ALTER TABLE `re_producto` ENABLE KEYS */;

-- Volcando estructura para tabla restaurant.re_producto_menu
CREATE TABLE IF NOT EXISTS `re_producto_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_menu` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `precio_unitario` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla restaurant.re_producto_menu: ~1 rows (aproximadamente)
DELETE FROM `re_producto_menu`;
/*!40000 ALTER TABLE `re_producto_menu` DISABLE KEYS */;
/*!40000 ALTER TABLE `re_producto_menu` ENABLE KEYS */;

-- Volcando estructura para tabla restaurant.re_usuarios
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='Usuarios del sistema';

-- Volcando datos para la tabla restaurant.re_usuarios: ~2 rows (aproximadamente)
DELETE FROM `re_usuarios`;
/*!40000 ALTER TABLE `re_usuarios` DISABLE KEYS */;
INSERT INTO `re_usuarios` (`id`, `usuario`, `password`, `tipo_identificacion`, `identificacion`, `nombre`, `apellido1`, `apellido2`, `estado`) VALUES
	(1, 'admin', 'd033e22ae348aeb5660fc2140aec35850c4da997', 1, '999999999', 'Administrador', 'Aplicación', '', 'activo');
INSERT INTO `re_usuarios` (`id`, `usuario`, `password`, `tipo_identificacion`, `identificacion`, `nombre`, `apellido1`, `apellido2`, `estado`) VALUES
	(2, 'cajero', '3ea672a2112aa63512c691fd287996b2d0bb129c', 1, '888888888', 'Cajero', 'Aplicación', NULL, 'activo');
INSERT INTO `re_usuarios` (`id`, `usuario`, `password`, `tipo_identificacion`, `identificacion`, `nombre`, `apellido1`, `apellido2`, `estado`) VALUES
	(3, 'mesero', '5a280e11dcd2ad934af4dcb24b2fafc527aa550a', 1, '777777777', 'Mesero', 'Aplicación', NULL, 'activo');
/*!40000 ALTER TABLE `re_usuarios` ENABLE KEYS */;

-- Volcando estructura para tabla restaurant.re_usuario_perfil
CREATE TABLE IF NOT EXISTS `re_usuario_perfil` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_perfil` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla restaurant.re_usuario_perfil: ~1 rows (aproximadamente)
DELETE FROM `re_usuario_perfil`;
/*!40000 ALTER TABLE `re_usuario_perfil` DISABLE KEYS */;
/*!40000 ALTER TABLE `re_usuario_perfil` ENABLE KEYS */;

-- Volcando estructura para tabla restaurant.tipo_menu
CREATE TABLE IF NOT EXISTS `tipo_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_menu` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `estado` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla restaurant.tipo_menu: ~0 rows (aproximadamente)
DELETE FROM `tipo_menu`;
/*!40000 ALTER TABLE `tipo_menu` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipo_menu` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
