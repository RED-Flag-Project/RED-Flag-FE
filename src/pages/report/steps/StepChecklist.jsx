import { useState } from "react";
import CalmNotice from "../../../components/report/checklist/CalmNotice";
import RequiredChecklist from "../../../components/report/checklist/RequiredChecklist";
import ActionButton from "../../../components/common/ActionButton";
import QuickReportActions from "../../../components/report/checklist/QuickReportActions";

export default function StepChecklist({ onNext }) {
  const [checked, setChecked] = useState([true, false, false, false]);
  const allChecked = checked.every(Boolean);
  const toggleCheck = (idx) => {
    const next = [...checked];
    next[idx] = !next[idx];
    setChecked(next);
  };

  return (
    <div className="step-checklist">
      <CalmNotice />
      <RequiredChecklist checked={checked} onToggle={toggleCheck} />
      <ActionButton
        label="증거 정리하기 →"
        disabled={!allChecked}
        onClick={onNext}
      />
      <QuickReportActions />
    </div>
  );
}
