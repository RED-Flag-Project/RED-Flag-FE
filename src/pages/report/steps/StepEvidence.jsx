import EvidenceNotice from "components/report/evidence/EvidenceNotice";
import TransferSection from "components/report/evidence/TransferSection";
import EvidencePdfButton from "components/report/evidence/EvidencePdfButton";
import TimelineSection from "components/report/evidence/TimelineSection";
import StepActions from "components/report/evidence/StepActions";

export default function StepEvidence({ onNext, onPrev }) {
  return (
    <div className="step-evidence">
      <EvidenceNotice />
      <TimelineSection />
      <TransferSection />
      <EvidencePdfButton />
      <StepActions onNext={onNext} onPrev={onPrev} />
    </div>
  );
}
