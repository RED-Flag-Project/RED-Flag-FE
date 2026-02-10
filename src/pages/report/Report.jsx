import { useLayoutEffect, useRef, useState } from "react";
import StepIndicator from "../../components/report/common/StepIndicator";
import ReportStepRenderer from "./ReportStepRenderer";

export default function Report() {
  const [step, setStep] = useState(1);
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    pageRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="Report_wrap" ref={pageRef}>
      <StepIndicator current={step} onChange={setStep} />
      <ReportStepRenderer
        step={step}
        onNext={() => setStep(step + 1)}
        onPrev={() => setStep(step - 1)}
      />
    </div>
  );
}
