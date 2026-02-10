import { useState } from "react";
import StepIndicator from "../../components/report/common/StepIndicator";
import ReportStepRenderer from "./ReportStepRenderer";

export default function Report() {
  const [step, setStep] = useState(1);

  return (
    <div className="Report_wrap">
      <StepIndicator current={step} onChange={setStep} />
      <ReportStepRenderer
        step={step}
        onNext={() => setStep(step + 1)}
        onPrev={() => setStep(step - 1)}
      />
    </div>
  );
}
