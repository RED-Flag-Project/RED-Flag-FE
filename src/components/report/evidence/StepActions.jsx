import ActionButton from "components/common/ActionButton";

export default function StepActions({ onPrev, onNext }) {
  return (
    <div className="step-actions">
      <ActionButton
        className="prev"
        label={"← 이전"}
        variant="gray"
        onClick={onPrev}
      />

      <ActionButton
        className="next"
        label={"정리 완료, 신고 하기 →"}
        variant="primary"
        onClick={onNext}
      />
    </div>
  );
}
