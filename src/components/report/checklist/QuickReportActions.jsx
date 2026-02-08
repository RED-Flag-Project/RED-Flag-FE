import emg from "assets/img/ic_emg.svg";
import gray_call from "assets/img/ic_gray_call.svg";
import red_call from "assets/img/ic_red_call.svg";
import wall from "assets/img/ic_wall.svg";
import open from "assets/img/ic_open.svg";

export default function QuickReportActions() {
  return (
    <div className="quick-report">
      <h4>
        <img src={emg} alt="" />
        경찰에 바로 신고하기
      </h4>

      <div className="quick-buttons">
        <button className="quick-btn">
          <img src={red_call} alt="" />
          <span>긴급신고 112</span>
        </button>

        <button className="quick-btn">
          <img src={gray_call} alt="" />
          <span>민원상담 182</span>
        </button>
      </div>

      <div className="cyber-report">
        <div className="left">
          <img src={wall} alt="" />
          <div>
            <strong>사이버수사국 신고</strong>
            <p>온라인으로 즉시 접수 가능</p>
          </div>
        </div>
        <img src={open} alt="" className="arrow" />
      </div>

      <p className="hint">
        피해 금액이 크거나 가해자가 지속적으로 연락하는 경우 망설이지 말고 112에
        도움을 요청하세요.
      </p>
    </div>
  );
}
