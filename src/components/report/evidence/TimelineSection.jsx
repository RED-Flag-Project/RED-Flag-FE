import { useState } from "react";
import TimelineItem from "./TimelineItem";
import clock from "assets/img/ic_clock.svg";

export default function TimelineSection() {
  const [items, setItems] = useState([
    { time: "2026-02-01T14:30", text: "" },
    { time: "2026-02-01T14:00", text: "" },
  ]);

  const addItem = () => {
    const now = new Date().toISOString().slice(0, 16);
    setItems([...items, { time: now, text: "" }]);
  };

  const updateText = (idx, value) => {
    const next = [...items];
    next[idx].text = value;
    setItems(next);
  };

  const updateTime = (idx, value) => {
    const next = [...items];
    next[idx].time = value;
    setItems(next);
  };

  const deleteItem = (idx) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  return (
    <section className="section">
      <div className="section-header">
        <div className="header">
          <img src={clock} alt="clock" className="icon" />
          <h3 className="title">사건 타임라인</h3>
        </div>
        <button className="add-btn" onClick={addItem}>
          + 추가
        </button>
      </div>

      {items.map((item, idx) => (
        <TimelineItem
          key={idx}
          time={item.time}
          value={item.text}
          onChange={(e) => updateText(idx, e.target.value)}
          onTimeChange={(e) => updateTime(idx, e.target.value)}
          onDelete={() => deleteItem(idx)}
        />
      ))}
    </section>
  );
}
