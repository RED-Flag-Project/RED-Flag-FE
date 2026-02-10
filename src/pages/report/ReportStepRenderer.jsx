import StepChecklist from "./steps/StepChecklist";
import StepEvidence from "./steps/StepEvidence";
import StepSubmit from "./steps/StepSubmit";

export default function ReportStepRenderer({ step, onNext, onPrev }) {
  switch (step) {
    case 1:
      return <StepChecklist onNext={onNext} />;
    case 2:
      return <StepEvidence onNext={onNext} onPrev={onPrev} />;
    case 3:
      return <StepSubmit onNext={() => {}} onPrev={onPrev} />;
    default:
      return null;
  }
}
