CREATE TABLE `certificate` (
	`id_certificate` int NOT NULL AUTO_INCREMENT,
	`id_tramite` int(11) NOT NULL,
	`nombreApellido` varchar(254) NOT NULL,
    `dni` varchar(254) NOT NULL,
	`matricula` varchar(254) NOT NULL,
	`carrera` varchar(254) NOT NULL,
	`universidad` varchar(254) NOT NULL,
	`state` varchar(64) NOT NULL,
	`hash` varchar(254) NOT NULL,
	
	PRIMARY KEY (`id_certificate`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;