import TimelineItem from "./TimelineItem";
import clock from "assets/img/ic_clock.svg";
import { createTimelineItem } from "utils/formFactory";

export default function TimelineSection({ items, setItems }) {
  const addItem = () => {
    setItems([...items, createTimelineItem()]);
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id, field, value) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
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

      {items.map((item) => (
        <TimelineItem
          key={item.id}
          time={item.time}
          value={item.text}
          onChange={(e) => updateItem(item.id, "text", e.target.value)}
          onTimeChange={(e) => updateItem(item.id, "time", e.target.value)}
          onDelete={() => removeItem(item.id)}
        />
      ))}
    </section>
  );
}
