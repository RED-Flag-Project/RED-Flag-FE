import check from "assets/img/ic_check.svg";

export default function ChecklistItem({ title, desc, checked, onClick }) {
  return (
    <div
      className={`checklist-item ${checked ? "checked" : ""}`}
      onClick={onClick}
    >
      <div className="check-icon">
        {checked && <img src={check} alt="checked" />}
      </div>
      <div className="content">
        <strong>{title}</strong>
        <p>{desc}</p>
      </div>
    </div>
  );
}
