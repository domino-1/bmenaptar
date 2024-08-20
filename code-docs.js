/**
 * Ebben a fileban máshol használt függvények olvashatóbb változata található
 * */

/**
 * Megadja hogy egy adott dátum hányadik héten van egy féléven belül.
 *
 * A kód használt változatát lásd itt: full-calendar.js
 * @param {Date} semesterOneStartDate
 * @param {Date} semesterTwoStartDate
 * @param {Number} springBreakWeek
 * @param {Date} currentDate
 * @returns {Number} a hét száma
 */
function semesterWeekNumber(
  semesterOneStartDate,
  semesterTwoStartDate,
  springBreakWeek,
  currentDate
) {
  //első félév
  if (date.getMonth() >= 8) {
    return weekOfSemester(new Date("September 2, 2024"), date);
  }
  //második félév
  else if (date.getMonth() >= 1) {
    let weekNumber = weekOfSemester(new Date("February 10, 2025"), date);

    //tavaszi szünet
    let spring_break_week = 11;
    if (weekNumber < spring_break_week) {
      return weekNumber;
    }
    if (weekNumber > spring_break_week) {
      return weekNumber - 1;
    }
    if (weekNumber == spring_break_week) {
      return 0;
    }
  }
  //január
  else return 0;
}
