import React, { useEffect, useMemo, useState, useRef, useLayoutEffect } from "react";
import Unchecked from "../../assets/img/ic_identify_unchecked.svg";
import Checked from "../../assets/img/ic_identify_checked.svg";
import { useAnalysisStore } from "store/analysisStore";
import { useNavigate } from "react-router-dom";

const CircularProgress = ({ percent = 0, size = 200, stroke = 16 }) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const p = Math.max(0, Math.min(100, Number(percent) || 0));
  const dash = (circumference * p) / 100;

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
        />
      </svg>

      <div className="graph_text">
        <div className="percent">
          {p}
          <span>%</span>
        </div>
        <div className="type">SCANNING</div>
      </div>
    </div>
  );
};

const Identify = () => {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    pageRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const [percent, setPercent] = useState(0);
  const [done, setDone] = useState([false, false, false]);

  const navigate = useNavigate();
  const { result } = useAnalysisStore();

  const steps = useMemo(
    () => ["OCR 텍스트 추출", "위험 키워드 감지", "데이터베이스 유사도 매칭"],
    [],
  );

  useEffect(() => {
    const milestones = [0, 30, 60, 95, 100];

    // 0->30, 30->60, 60->95, 95->100
    const delays = [400, 600, 800, 500];

    const timers = [];
    let acc = 0;

    milestones.slice(1).forEach((target, idx) => {
      acc += delays[idx];
      timers.push(setTimeout(() => setPercent(target), acc));
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    setDone([
      percent >= 30, // OCR 완료
      percent >= 60, // 키워드 완료
      percent >= 95, // 유사도 완료
    ]);
  }, [percent]);

  useEffect(() => {
    if (result) {
      navigate("/dangerous");
    }
  }, [result, navigate]);

  return (
    <div className="Identify_wrap" ref={pageRef}>
      <div className="circle_progressbar">
        <CircularProgress percent={percent} size={200} stroke={16} />
      </div>
      <div className="text">메시지를 분석하고 있습니다</div>
      <div className="describe">
        OCR 텍스트 추출 및 머신러닝 모델이
        <br />
        피싱 패턴을 정밀 대조 중입니다.
      </div>
      <div className="elements">
        {steps.map((label, idx) => (
          <div className="element" key={label}>
            <img
              src={done[idx] ? Checked : Unchecked}
              alt={done[idx] ? "Checked" : "Unchecked"}
            />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Identify;
