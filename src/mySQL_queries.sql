SELECT
	d.display,
    s.groupSymbol,
    s.stationNumber,
    s.role,
    r.employeeId,
    r.date,
    TIMEDIFF(r.out, r.in) AS _time
FROM
    `stations` AS s
INNER JOIN
    reports AS r
ON
    s.stationNumber = r.stationNumber
LEFT JOIN days as d
ON
	d.display = r.date
WHERE
    r.in IS NOT NULL AND r.out IS NOT NULL AND s.groupSymbol IN(114306, 114397)
ORDER BY
    s.groupSymbol,
    d.year,
    d.dayOfYear
    
SELECT * FROM `reports` as r 
RIGHT JOIN days as d 
on r.date = d.display
WHERE r.in is null AND r.out is null
ORDER by d.display    


DELIMITER $$
CREATE DEFINER=`test`@`%` PROCEDURE `applyReportOut`(IN `emplId` VARCHAR(9), IN `stationNum` INT(5), IN `timeReportred` TIME, IN `dateReported` DATE)
    NO SQL
BEGIN
    DECLARE _status int(1);
      
    SELECT checkStationStatus (stationNum) into _status;
    CASE
    	when _status = 1 then
    	BEGIN
        	insert INTO failed_reports (`out`, createdAt, updatedAt, `date`, employeeId, stationNumber)            VALUES(timeReportred, NOW(), NOW(), dateReported, emplId, stationNum);
        END;
    	when _status = 2 THEN
        	BEGIN
      
                UPDATE reports 
                SET `out` = timeReportred, updatedAt = NOW()
                WHERE employeeId = emplId
                AND stationNumber = stationNum
                AND DATE(date) = DATE(dateReported);
			END;
     END CASE;
END$$
DELIMITER ;

DROP PROCEDURE `getEmployeeByPhone`; CREATE DEFINER=`test`@`%` PROCEDURE `getEmployeeByPhone`(IN `phoneNumber` VARCHAR(255)) NOT DETERMINISTIC NO SQL SQL SECURITY DEFINER BEGIN select id, concat(firstName, ' ', lastName) as name from employees WHERE phone = phoneNumber; END

DROP FUNCTION `checkStationStatus`; CREATE DEFINER=`test`@`%` FUNCTION `checkStationStatus`(`stationNum` INT(11)) RETURNS INT(11) DETERMINISTIC READS SQL DATA SQL SECURITY DEFINER BEGIN DECLARE cnt int(11); SET cnt = 0; select count(*) into cnt from stations where stationNumber = stationNum; return cnt; END

DROP FUNCTION `checkStationStatus`; CREATE DEFINER=`test`@`%` FUNCTION `checkStationStatus`(`stationNum` INT(11)) RETURNS INT(11) DETERMINISTIC READS SQL DATA SQL SECURITY DEFINER BEGIN DECLARE cnt int(11); DECLARE _in time; DECLARE _out time; SET cnt = 0; select count(*) into cnt from stations where stationNumber = stationNum; if cnt = 0 then return 0; end if; select `in`, `out` into _in, _out from reports where stationNumber = stationNum and date = DATE( NOW() ); return cnt; END


DELIMITER $$
CREATE DEFINER=`test`@`%` PROCEDURE `applyReportIn`(IN `emplId` VARCHAR(9), IN `stationNum` INT(5), IN `timeReportred` TIME, IN `dateReported` DATE)
    NO SQL
BEGIN
    DECLARE _status int(1);
      
    SELECT checkStationStatus (stationNum) into _status;
    CASE
    	when _status = 2 then
    	BEGIN
        	insert INTO failed_reports (`in`, createdAt, updatedAt, `date`, employeeId, stationNumber)            VALUES(timeReportred, NOW(), NOW(), dateReported, emplId, stationNum);
        END;
    	when _status = 1 THEN
        	BEGIN
                      	insert INTO reports (`in`, createdAt, updatedAt, `date`, employeeId, stationNumber)            VALUES(timeReportred, NOW(), NOW(), dateReported, emplId, stationNum);
			END;
     END CASE;
END$$
DELIMITER ;
