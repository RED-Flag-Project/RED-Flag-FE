import delele from "assets/img/ic_delete.svg";

export default function TimelineItem({
  time,
  value,
  onChange,
  onTimeChange,
  onDelete,
}) {
  return (
    <div className="timeline-item">
      <div className="dot" />
      <div className="content">
        <div className="time-section">
          <input
            type="datetime-local"
            className="time-input"
            value={time}
            onChange={onTimeChange}
          />
          <img src={delele} alt="delete" className="icon" onClick={onDelete} />
        </div>

        <textarea
          className="input-box"
          placeholder="어떤 일이 있었나요?"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
