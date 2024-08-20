"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import huLocale from "@fullcalendar/core/locales/hu";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import Link from "next/link";

function daysIntoYear(date) {
  return (
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
      Date.UTC(date.getFullYear(), 0, 0)) /
    24 /
    60 /
    60 /
    1000
  );
}

function weekOfSemester(semesterStartDate, currentDate) {
  return (
    Math.floor(
      (daysIntoYear(currentDate) - daysIntoYear(semesterStartDate)) / 7
    ) + 1
  );
}

/**
 * Megadja hogy egy adott dátum hányadik héten van egy féléven belül.
 *
 * A kód egyszerűbb/olvashatóbb változatát lásd itt: code-docs.js
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
  if (
    currentDate.getMonth() >= semesterOneStartDate.getMonth() &&
    currentDate.getMonth() <= semesterOneStartDate.getMonth() + 3
  ) {
    let weekNumber = weekOfSemester(semesterOneStartDate, currentDate);

    //max hét/félév
    if (weekNumber > 14) {
      return 0;
    }

    return weekNumber;
  }
  //második félév (február-május)
  else if (
    currentDate.getMonth() >= semesterTwoStartDate.getMonth() &&
    currentDate.getMonth() <= semesterTwoStartDate.getMonth() + 3
  ) {
    let weekNumber = weekOfSemester(semesterTwoStartDate, currentDate);

    //max hét/félév +1 a tavaszi szünet miatt
    if (weekNumber > 15) {
      return 0;
    }

    //tavaszi szünet
    if (weekNumber < springBreakWeek) {
      if (weekNumber < 14) {
        return weekNumber;
      } else return 0;
    }
    if (weekNumber > springBreakWeek) {
      return weekNumber - 1;
    }
    if (weekNumber == springBreakWeek) {
      return 0;
    }
  }
  //január
  else return 0;
}

export default function CalendarFull() {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, googleCalendarPlugin]}
      locale={huLocale}
      firstDay={1}
      height={"auto"}
      headerToolbar={{
        start: "title", // will normally be on the left. if RTL, will be on the right
        center: "",
        end: "today prev,next", // will normally be on the right. if RTL, will be on the left
      }}
      initialView="dayGridMonth"
      googleCalendarApiKey="AIzaSyBHTr9Egok_NIaLNLMRVu8bKQnyodc_aR8" //{process.env.GOOGLE_CALENDAR_API_KEY}
      eventSources={[
        {
          googleCalendarId:
            "0cf478e910bc26014ca683c860fc98e6e4ea32aedff076d712c4b8cf9bc3b57d@group.calendar.google.com",
          className: "events-bme",
        },
        {
          googleCalendarId:
            "ef292711ce40d445dbee62da5f4b68a609c7c36c919e905c8370b1083652ca08@group.calendar.google.com",
          className: "events-vik",
        },
      ]}
      eventClick={function (info) {
        info.jsEvent.preventDefault();

        if (
          confirm(
            info.event.title +
              "\n\nSzeretnéd megnyitni az eseményt? Egy új tab-on fog megnyílni!"
          )
        ) {
          open(info.event.url);
        }
      }}
      validRange={{
        start: "2024-08-01",
        end: "2025-07-31",
      }}
      weekNumbers={true}
      weekNumberFormat={{ week: "long" }}
      weekNumberCalculation={function (date) {
        return semesterWeekNumber(
          new Date("September 2, 2024"),
          new Date("February 10, 2025"),
          11,
          date
        );
      }}
      weekNumberContent={function (arg) {
        if (arg.num > 0) return arg.num + ". hét";
      }}
    />
  );
}
