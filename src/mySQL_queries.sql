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
