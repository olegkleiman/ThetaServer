var moment = require("moment");
var fs = require("fs");
var rp = require("request-promise").defaults({
  //proxy
  // proxy: "http://forticache:8080",
  // strictSSL: false
});

let dt = moment("01-01-2018", "DD-MM-YYYY");
let calendar = [];
let counter = 0;
(async () => {
  try {
    // const conn = await mysql.createConnection(config);
    let _month = 0; // force initial request
    let holidays = [];

    while (dt.isBefore(moment("01-01-2022", "DD-MM-YYYY"))) {
      const year = dt.year();
      const month = dt.month() + 1;
      if (month != _month) {
        _month = month;

        // See https://www.hebcal.com/home/195/jewish-calendar-rest-api
        // for documentation
        const _url = `https://www.hebcal.com/hebcal/?v=1&cfg=json&maj=on&min=off&mod=onf&year=${year}&month=${_month}`;
        const _res = await rp(_url);
        const __res = JSON.parse(_res);
        holidays = __res.items;
      }

      const date = dt.date();
      const dayOfYear = dt.dayOfYear();
      const dayOfWeek = dt.day();

      const dayToComapre = dt.format("YYYY-MM-DD");

      let found = holidays.find(holiday => {
        //console.log(`Holiday date: ${holiday.date} Date: ${dayToComapre}`);
        return holiday.date === dayToComapre;
      });
      let isHoliday = found ? true : false;
      let holidayName = found ? `${found.hebrew}` : "NULL";

      // See https://www.hebcal.com/home/219/hebrew-date-converter-rest-api
      // for docuentation
      const url = `https://www.hebcal.com/converter/?cfg=json&gy=${year}&gm=${month}&gd=${date}&g2h=1`;
      const res = await rp(url);
      const _res = JSON.parse(res);
      const hebrewDisplay = _res.hebrew;
      const display = dt.format("YYYY-MM-DD");

      console.log(
        `Year: ${year} DOY: ${dayOfYear} Display: ${display} Heb: ${hebrewDisplay}`
      );
      calendar[counter] = {
        year,
        dayOfYear,
        dayOfWeek,
        display,
        display_he: hebrewDisplay,
        isHoliday,
        holidayName
      };
      counter++;

      dt.add(1, "days"); // moment is mutable
    }
    fs.writeFile("calendar.json", JSON.stringify(calendar, null, 2), function(
      err
    ) {
      if (err) {
        return console.log(err);
      }

      console.log("The file was saved!");
    });
    // await conn.end();
  } catch (err) {
    console.log(err);
    // console.log(`Error`);
  }
})();
