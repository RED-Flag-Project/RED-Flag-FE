import React, { useState } from 'react';
import Check from '../../assets/img/ic_checked.svg';
import Uncheck from '../../assets/img/ic_unchecked.svg';
import Doc from '../../assets/img/ic_doc_white.svg';
import RightBlack from '../../assets/img/ic_right_black.svg';

const Pdf = () => {
    const percent = 92;
    const labels = ["긴박함", "비밀유지"];

    const [selected, setSelected] = useState({
        riskScore: true,
        psychLabels: true,
        matching: true,
    });

    const toggle = (key) => {
        setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="Pdf_wrap">
            <div className="title">증거 리포트 구성</div>
            <div className="subtitle">리포트에 포함할 항목을 선택해 주세요.</div>
            <div className="select">
                <div className="select_title">SELECT EVIDENCE</div>
                <div className="evidence">
                    <div className="left">
                        <div className="left_title">AI 위험 지수 (Risk Score)</div>
                        <div className="left_subtitle">{percent}% 위험도 및 위험 단계 요약</div>
                    </div>
                    <button
                        type="button"
                        className={`right ${selected.riskScore ? 'right--checked' : ''}`}
                        onClick={() => toggle('riskScore')}
                        aria-pressed={selected.riskScore}
                        aria-label="AI 위험 지수 포함 여부"
                    >
                        <img src={selected.riskScore ? Check : Uncheck} alt="" />
                    </button>
                </div>
                <div className="evidence">
                    <div className="left">
                        <div className="left_title">심리 조작 분석 (Psych-Labels)</div>
                        <div className="left_subtitle">{labels.join(', ')} 등 분석 결과</div>
                    </div>
                    <button
                        type="button"
                        className={`right ${selected.psychLabels ? 'right--checked' : ''}`}
                        onClick={() => toggle('psychLabels')}
                        aria-pressed={selected.psychLabels}
                        aria-label="심리 조작 분석 포함 여부"
                    >
                        <img src={selected.psychLabels ? Check : Uncheck} alt="" />
                    </button>
                </div>
                <div className="evidence">
                    <div className="left">
                        <div className="left_title">과거 사례 정밀 매칭 결과</div>
                        <div className="left_subtitle">유사한 과거 사례와의 매칭 결과</div>
                    </div>
                    <button
                        type="button"
                        className={`right ${selected.matching ? 'right--checked' : ''}`}
                        onClick={() => toggle('matching')}
                        aria-pressed={selected.matching}
                        aria-label="과거 사례 정밀 매칭 결과 포함 여부"
                    >
                        <img src={selected.matching ? Check : Uncheck} alt="" />
                    </button>
                </div>
            </div>
            <div className="pdf">
                <div className="pdf_title">
                    <img src={Doc} alt="PDF 문서 아이콘" />
                    PDF 리포트 추출
                </div>
                <div className="pdf_subtitle">선택하신 항목을 바탕으로 수사 기관 제출용 전문 보고서를 생성합니다.</div>
                <div className="save_pdf">PDF 리포트 저장하기</div>
            </div>
            <div className="next">
                다음: 안전 조치 가이드
                <img src={RightBlack} alt="다음 아이콘" />
            </div>
        </div>
    );
}

export default Pdf
