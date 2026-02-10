import React from 'react';
import Unchecked from '../../assets/img/ic_identify_unchecked.svg';
import Checked from '../../assets/img/ic_identify_checked.svg';

const CircularProgress = ({ percent = 92, size = 180, stroke = 16 }) => {
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;

    // 0~100 clamp
    const p = Math.max(0, Math.min(100, percent));
    const dash = (circumference * p) / 100;

    return (
        <div className="ring" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="ring_svg">
                {/* 배경 트랙 */}
                <circle
                    className="ring_track"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={stroke}
                />
                {/* 진행 바 */}
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
                    {percent}<span>%</span>
                </div>
                <div className="type">SCANNING</div>
            </div>
        </div>
    );
};

const Identify = () => {
    const percent = 70;

    return (
        <div className="Identify_wrap">
            <div className="circle_progressbar">
                <CircularProgress percent={percent} size={200} stroke={16} />
            </div>
            <div className="text">메시지를 분석하고 있습니다</div>
            <div className="describe">OCR 텍스트 추출 및 머신러닝 모델이<br />피싱 패턴을 정밀 대조 중입니다.</div>
            <div className="elements">
                <div className="element">
                    <img src={Unchecked} alt="Unchecked" />
                    OCR 텍스트 추출
                </div>
                <div className="element">
                    <img src={Unchecked} alt="Unchecked" />
                    위험 키워드 감지
                </div>
                <div className="element">
                    <img src={Unchecked} alt="Unchecked" />
                    데이터베이스 유사도 매칭
                </div>
            </div>
        </div>
    )
}

export default Identify
