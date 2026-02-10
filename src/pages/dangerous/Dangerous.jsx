import React, { useEffect, useRef, useLayoutEffect } from "react";
import Check from "../../assets/img/ic_check_danger.svg";
import Doc from "../../assets/img/ic_doc.svg";
import Bulb from "../../assets/img/ic_bulb.svg";
import RightIcon from "../../assets/img/ic_right.svg";

import useApi from "hook/useApi";
import { analysis } from "api/analysis";
import { useAnalysisStore } from "store/analysisStore";
import { useNavigate } from "react-router-dom";

const getProgressMeta = (x) => {
  const v = Math.max(0, Math.min(100, Number(x) || 0));
  if (v < 30) return { color: "#00C950", label: "LOW RISK" };
  if (v < 50) return { color: "#F0B100", label: "CAUTION" };
  if (v < 70) return { color: "#FF6900", label: "WARNING" };
  if (v < 90) return { color: "#FB2C36", label: "DANGEROUS" };
  return { color: "#E7000B", label: "CRITICAL" };
};

const CircularProgress = ({ percent = 92, size = 180, stroke = 16 }) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const p = Math.max(0, Math.min(100, percent));
  const dash = (circumference * p) / 100;

  const { color, label } = getProgressMeta(p);

  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="ring_svg">
        <circle
          className="ring_track"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
        />
        <circle
          className="ring_progress"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          strokeDasharray={`${dash} ${circumference - dash}`}
          style={{ stroke: color }}
        />
      </svg>

      <div className="graph_text">
        <div className="percent">
          {p}
          <span>%</span>
        </div>
        <div className="type" style={{ color }}>
          {label}
        </div>
      </div>
    </div>
  );
};

const Dangerous = () => {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    pageRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const navigate = useNavigate();
  const { execute, loading, data } = useApi(analysis);
  const { result } = useAnalysisStore();

  useEffect(() => {
    if (!result?.result?.analysisId) return;
    execute(result.result.analysisId);
  }, [result, execute]);

  const percent = data?.result?.riskScore;
  const urgency = data?.result?.psychologicalPatterns[0]?.patternScore;
  const secret = data?.result?.psychologicalPatterns[1]?.patternScore;
  const isolation = data?.result?.psychologicalPatterns[2]?.patternScore;
  const falseReward = data?.result?.psychologicalPatterns[3]?.patternScore;
  const scan = data?.result?.rawText;
  const matchPercent = data?.result?.similarCases[0]?.similarityScore;
  const firstCase = data?.result?.similarCases[0]?.matchedRank;
  const firstCaseContent = data?.result?.similarCases[0]?.content;
  const secondCase = data?.result?.similarCases[1]?.matchedRank;
  const secondCaseContent = data?.result?.similarCases[1]?.content;
  const thirdCase = data?.result?.similarCases[2]?.matchedRank;
  const thirdCaseContent = data?.result?.similarCases[2]?.content;
  const resultText = data?.result?.description;

  const psychLabels = [
    { key: "urgency", title: "긴박함 유도", value: urgency },
    { key: "secret", title: "비밀 유지 강요", value: secret },
    { key: "isolation", title: "사회적 고립 시도", value: isolation },
    { key: "falseReward", title: "거짓 보상 제안", value: falseReward },
  ];

  return loading ? null : (
    <div className="Dangerous_wrap" ref={pageRef}>
      <div className="circle_graph">
        <CircularProgress percent={percent} size={190} stroke={16} />
      </div>
      <div className="psych-labels">
        <div className="title">심리 조작 분석 (PSYCH-LABELS)</div>

        {psychLabels.map((item) => {
          const value = Math.max(0, Math.min(100, item.value));
          const { color } = getProgressMeta(value);

          return (
            <div className="label" key={item.key}>
              <div className="texts">
                <div className="subtitle">{item.title}</div>
                <div className="percent">{value}%</div>
              </div>

              <div className="bar">
                <div
                  className="bar_fill"
                  style={{ width: `${value}%`, backgroundColor: color }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="specific_matching">
        <div className="title">정밀 사례 매칭 (SPECIFIC MATCHING)</div>
        <div className="your_scan">
          <div className="subtitle">
            <div className="circle"></div>
            <div className="text">YOUR SCAN</div>
          </div>
          <div className="user_scan">{scan}</div>
        </div>
        <div className="vertical_dot">
          <div className="line"></div>
        </div>
        <div className="match_percent">
          <div className="check">
            <img src={Check} alt="check" />
          </div>
          <div className="text">{matchPercent}% MATCH</div>
        </div>
        <div className="vertical_dot">
          <div className="line"></div>
        </div>
        <div className="historical_case">
          <div className="subtitle">
            <div className="ic_doc">
              <img src={Doc} alt="doc" />
            </div>
            <div className="text">HISTORICAL CASE #{firstCase}</div>
          </div>
          <div className="user_scan">{firstCaseContent}</div>
        </div>
        <div className="historical_case">
          <div className="subtitle">
            <div className="ic_doc">
              <img src={Doc} alt="doc" />
            </div>
            <div className="text">HISTORICAL CASE #{secondCase}</div>
          </div>
          <div className="user_scan">{secondCaseContent}</div>
        </div>
        <div className="historical_case">
          <div className="subtitle">
            <div className="ic_doc">
              <img src={Doc} alt="doc" />
            </div>
            <div className="text">HISTORICAL CASE #{thirdCase}</div>
          </div>
          <div className="user_scan">{thirdCaseContent}</div>
        </div>
        <div className="result">
          <div className="ic_bulb">
            <img src={Bulb} alt="bulb" />
          </div>
          <div className="result_text">
            <strong>분석 결과: </strong>
            {resultText}
          </div>
        </div>
      </div>
      <div className="create_report" onClick={() => navigate("/report")}>
        리포트 생성하기
        <img src={RightIcon} alt="right icon" />
      </div>
    </div>
  );
};

export default Dangerous;
