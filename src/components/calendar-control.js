"use client";

import { useSearchParams } from "next/navigation";

export default function CalendarControl() {
  const searchParams = useSearchParams();

  const kar = searchParams.get("kar");

  return (
    <div id="menu">
      <div>
        <input type="checkbox" defaultChecked id="check-bme"></input>
        <label htmlFor="check-bme">Egyetemi események</label>
      </div>
      <div>
        <input
          type="checkbox"
          defaultChecked={kar === "vik"}
          id="check-vik"
        ></input>
        <label htmlFor="check-vik">VIK-es események</label>
      </div>
    </div>
  );
}
