export default function CalendarControl() {
  return (
    <div id="menu">
      <div>
        <input type="checkbox" defaultChecked id="check-bme"></input>
        <label htmlFor="check-bme">Egyetemi események</label>
      </div>
      <div>
        <input type="checkbox" defaultChecked id="check-vik"></input>
        <label htmlFor="check-vik">VIK-es események</label>
      </div>
    </div>
  );
}
