import guide from "assets/img/ic_notice.svg";

export default function AnalysisGuide() {
  return (
    <div className="analysis-guide">
      <div className="guide-title">
        <img src={guide} alt="guide" className="icon" />
        <span>분석 가이드</span>
      </div>
      <ul className="guide-list">
        <li>대화 내용 전체가 잘 보이도록 캡쳐해 주세요.</li>
        <li>금전 요구, 링크 유도 부분이 포함되면 정확도가 올라갑니다.</li>
        <li>모든 데이터는 분석 후 비식별 처리됩니다.</li>
      </ul>
    </div>
  );
}
