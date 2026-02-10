import { useState } from "react";
import EvidenceNotice from "components/report/evidence/EvidenceNotice";
import TransferSection from "components/report/evidence/TransferSection";
import EvidencePdfButton from "components/report/evidence/EvidencePdfButton";
import TimelineSection from "components/report/evidence/TimelineSection";
import StepActions from "components/report/evidence/StepActions";

import { createTimelineItem, createTransferItem } from "utils/formFactory";

export default function StepEvidence({ onNext, onPrev }) {
  const [timelineItems, setTimelineItems] = useState([createTimelineItem()]);
  const [transferItems, setTransferItems] = useState([createTransferItem()]);

  return (
    <div className="step-evidence">
      <EvidenceNotice />
      <TimelineSection items={timelineItems} setItems={setTimelineItems} />
      <TransferSection
        transfers={transferItems}
        setTransfers={setTransferItems}
      />
      <EvidencePdfButton timeline={timelineItems} transfers={transferItems} />
      <StepActions onNext={onNext} onPrev={onPrev} />
    </div>
  );
}
