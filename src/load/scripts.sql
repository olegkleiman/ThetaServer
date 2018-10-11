
#ALTER USER 'thetaWeb'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Day1!2$$';
#GRANT SELECT,INSERT,UPDATE,DELETE ON `theta`.* TO 'thetaWeb'@'localhost'

CREATE TABLE `employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tz` varchar(45) DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `birthDay` datetime DEFAULT NULL,
  `registrationDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `days` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` int(11) NOT NULL,
  `dayOfYear` int(11) NOT NULL,
  `dayOfWeek` int(11) NOT NULL,
  `display` varchar(45) NOT NULL,
  `display_he` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `isHoliday` tinyint(4) DEFAULT NULL,
  `holidayName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2849 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `groupRoles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `groupSymbol` int(11) NOT NULL,
  `employeeId` int(11) NOT NULL,
  `roleName` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `employeeId_UNIQUE` (`employeeId`),
  KEY `idx_groupRoles_employeeId` (`employeeId`),
  CONSTRAINT `fk_groupRoles_employees` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `schedules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dayId` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `groupSymbol` int(11) NOT NULL,
  `employeeId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_schedules_employees1_idx` (`employeeId`),
  KEY `fk_schedules_days1_idx` (`year`),
  KEY `fk_schedules_days2_idx` (`dayId`),
  CONSTRAINT `fk_schedules_days1` FOREIGN KEY (`year`) REFERENCES `days` (`year`),
  CONSTRAINT `fk_schedules_days2` FOREIGN KEY (`dayId`) REFERENCES `days` (`dayofyear`),
  CONSTRAINT `fk_schedules_employees1` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
