import CalendarFull from "@/components/full-calender";
import CalendarControl from "@/components/calendar-control";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <CalendarControl></CalendarControl>
      <CalendarFull></CalendarFull>
      <div id="links">
        <p>
          Hozzáadás saját google naptárhoz:{" "}
          <Link
            target="_blank"
            href="https://calendar.google.com/calendar/u/0?cid=MGNmNDc4ZTkxMGJjMjYwMTRjYTY4M2M4NjBmYzk4ZTZlNGVhMzJhZWRmZjA3NmQ3MTJjNGI4Y2Y5YmMzYjU3ZEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
          >
            Egyetemi események
          </Link>
          ,{" "}
          <Link
            target="_blank"
            href="https://calendar.google.com/calendar/u/0?cid=ZWYyOTI3MTFjZTQwZDQ0NWRiZWU2MmRhNWY0YjY4YTYwOWM3YzM2YzkxOWU5MDVjODM3MGIxMDgzNjUyY2EwOEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
          >
            VIK-es események
          </Link>
        </p>
      </div>
    </main>
  );
}
