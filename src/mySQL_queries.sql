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

DROP PROCEDURE `getEmployeeByPhone`; CREATE DEFINER=`test`@`%` PROCEDURE `getEmployeeByPhone`(IN `phoneNumber` VARCHAR(255)) NOT DETERMINISTIC NO SQL SQL SECURITY DEFINER BEGIN select id, concat(firstName, ' ', lastName) as name from employees WHERE phone = phoneNumber; END
