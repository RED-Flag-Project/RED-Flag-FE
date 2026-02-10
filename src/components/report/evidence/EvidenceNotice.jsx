import notice from "assets/img/ic_notice.svg";

export default function EvidenceNotice() {
  return (
    <div className="evidence-notice">
      <img src={notice} alt="notice" className="icon" />
      <p>
        증거 자료는 수정이나 편집 없이 원본 그대로 보관하는 것이 법적 효력을
        갖기에 가장 좋습니다.
      </p>
    </div>
  );
}
