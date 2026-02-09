export default function StepIndicator({ current }) {
  return (
    <div className="step-indicator">
      <div className="steps">
        <span className={`step ${current >= 1 ? "active" : ""}`}>
          1. 체크리스트
        </span>
        <span className={`step ${current >= 2 ? "active" : ""}`}>
          2. 증거 정리
        </span>
        <span className={`step ${current >= 3 ? "active" : ""}`}>
          3. 신고 하기
        </span>
      </div>

      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${(current / 3) * 100}%` }}
        />
      </div>
    </div>
  );
}
