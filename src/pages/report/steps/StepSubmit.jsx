import React from "react";
import wall from "assets/img/ic_red_wall.svg";
import open from "assets/img/ic_open.svg";
import check from "assets/img/ic_check.svg";
import ActionButton from "components/common/ActionButton";

export default function StepSubmit({ onNext, onPrev }) {
  const reportChannels = [
    {
      id: 1,
      title: "경찰청 사이버수사국",
      desc: "ecrm.cyber.go.kr (온라인 신고)",
      type: "link",
      url: "https://ecrm.police.go.kr/minwon/main",
    },
    {
      id: 2,
      title: "통합대응단 (통신금융사기)",
      desc: "범정부 합동 원스톱 신고 상담 (112)",
      type: "link",
      url: "https://www.counterscam112.go.kr/",
    },
    {
      id: 3,
      title: "경찰민원콜센터 (유선)",
      desc: "국번없이 182번 (전문 상담)",
      type: "link",
      url: "https://www.police.go.kr/www/security/report/report01.jsp",
    },
    {
      id: 4,
      title: "가까운 경찰서 방문",
      desc: "준비한 증거물을 지참하여 방문하세요.",
      type: "visit",
      url: "",
    },
  ];

  const checkList = [
    "증거 리포트 PDF를 다운로드했나요?",
    "신분증을 지참했나요? (방문 신고 시 필수)",
    "은행에 연락해 지급정지 신청을 문의했나요?",
    "가해자와의 대화방을 나가지 않고 보존했나요?",
  ];

  return (
    <div className="step-submit">
      <div className="report-guide-card">
        <div className="header">
          <div className="icon-wrapper">
            <img src={wall} alt="wall" />
          </div>
          <h2 className="title">신고 채널 안내</h2>
          <p className="subtitle">
            준비된 증거를 가지고 아래 기관에 신고하세요.
          </p>
        </div>

        <div className="channel-list">
          {reportChannels.map((channel) => (
            <button
              key={channel.id}
              onClick={() => (window.location.href = `${channel.url}`)}
              className={`channel-item ${channel.type === "visit" ? "visit" : ""}`}
            >
              <div className="info">
                <span className="name">{channel.title}</span>
                <span className="desc">{channel.desc}</span>
              </div>
              <div className="action-icon">
                <img src={open} alt="open" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="final-check-box">
        <div className="check-title">
          <img src={check} alt="check" className="icon" />
          <span>신고 전 마지막 확인</span>
        </div>
        <ul className="check-list">
          {checkList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <ActionButton
          label={"← 다시 확인하기"}
          variant="gray"
          onClick={onPrev}
        />
        <ActionButton label={"끝내기"} onClick={onNext} />
      </div>
    </div>
  );
}
