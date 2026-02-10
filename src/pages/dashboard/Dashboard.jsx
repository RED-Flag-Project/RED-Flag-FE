import React from 'react';
import Cash from '../../assets/img/ic_cash.svg';
import Circle20 from '../../assets/img/ic_circle_20.svg';
import Circle30 from '../../assets/img/ic_circle_30.svg';
import Circle40 from '../../assets/img/ic_circle_40.svg';
import Circle50 from '../../assets/img/ic_circle_50.svg';
import Circle60 from '../../assets/img/ic_circle_60.svg';

const SegmentedDonut = ({
    values = [15, 20, 25, 30, 10],
    size = 140,
    stroke = 18,
    gapPx = 5,
    startDeg = -60,
    colors = ["#4F6EF7", "#2F49D6", "#5D7CFF", "#9CB6FF", "#3B57E8"],
    centerLabel = "Age",
}) => {
    const total = values.reduce((a, b) => a + b, 0) || 1;

    const radius = (size - stroke) / 2;
    const cx = size / 2;
    const cy = size / 2;

    const circumference = 2 * Math.PI * radius;
    const gapDeg = (gapPx / circumference) * 360;

    const polarToXY = (deg) => {
        const rad = (Math.PI / 180) * deg;
        return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
    };

    const arcPath = (start, end) => {
        const s = polarToXY(start);
        const e = polarToXY(end);
        const large = end - start > 180 ? 1 : 0;
        return `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${large} 1 ${e.x} ${e.y}`;
    };

    let acc = 0;

    const segments = values.map((v, idx) => {
        const portionDeg = (v / total) * 360;

        const segStart = startDeg + acc + gapDeg / 2;
        const segEnd = startDeg + acc + portionDeg - gapDeg / 2;
        acc += portionDeg;

        if (segEnd <= segStart) return null;

        return (
            <path
                key={idx}
                d={arcPath(segStart, segEnd)}
                fill="none"
                stroke={colors[idx % colors.length]}
                strokeWidth={stroke}
                strokeLinecap="butt"
            />
        );
    });

    return (
        <div className="donut" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="donut_svg">
                {segments}
            </svg>
            <div className="donut_center">{centerLabel}</div>
        </div>
    );
};

const Dashboard = () => {
    const todayCount = 100;
    const yearTotal = "1조 3,000억";
    const increaseRate = 56;
    const totalCaseCount = 18676;
    const caseIncreaseRate = 15.6;
    const circlepertentage = [15, 20, 25, 30, 10];
    const malePercent = 46;
    const femalePercent = 54;

    return (
        <div className='Dashboard_wrap'>
            <div className="title">
                피싱 범죄 현황
                <div className="description">최신 금융 사기 피해 현황 및 분석 데이터입니다.</div>
            </div>
            <div className="today">
                <div className="subtitle">오늘 탐지된 피싱, 스캠 건수</div>
                <div className="today_count">총 {todayCount}건</div>
            </div>
            <div className="year_total">
                <div className="subtitle">
                    <img src={Cash} alt="Cash Icon" />
                    2025년 총 피해 규모
                </div>
                <div className="cumulative">누적 피해액</div>
                <div className="year_total_num">{yearTotal} 원</div>
                <div className="comparison">▲ 전년 대비 {increaseRate}% 증가</div>
                <div className="divider"></div>
                <div className="cases">
                    <div className="total_case">
                        <div className="subtitle">총 발생 건수</div>
                        <div className="case_num">{totalCaseCount}건</div>
                    </div>
                    <div className="comparison_lastyear">
                        <div className="subtitle">전년 대비 발생 건수</div>
                        <div className="case_increase">{caseIncreaseRate}% 증가</div>
                    </div>
                </div>
            </div>
            <div className="ageNgender">
                <div className="age">
                    <div className="subtitle">연령대별 피해 비율</div>
                    <div className="chart">
                        <div className="circle_graph">
                            <SegmentedDonut
                                values={circlepertentage}
                                colors={["#93C5FD", "#60A5FA", "#3B82F6", "#2563EB", "#1D4ED8"]}
                                size={140}
                                stroke={23}
                                gapPx={5}
                                startDeg={-90}
                                centerLabel="Age"
                            />
                        </div>
                        <div className="ages">
                            <div className="age_groups">
                                <div className="age_group">
                                    <img src={Circle20} alt="20대" />
                                    20대
                                </div>
                                <div className="age_percentage">{circlepertentage[0]}%</div>
                            </div>
                            <div className="age_groups">
                                <div className="age_group">
                                    <img src={Circle30} alt="30대" />
                                    30대
                                </div>
                                <div className="age_percentage">{circlepertentage[1]}%</div>
                            </div>
                            <div className="age_groups">
                                <div className="age_group">
                                    <img src={Circle40} alt="40대" />
                                    40대
                                </div>
                                <div className="age_percentage">{circlepertentage[2]}%</div>
                            </div>
                            <div className="age_groups">
                                <div className="age_group">
                                    <img src={Circle50} alt="50대" />
                                    50대
                                </div>
                                <div className="age_percentage">{circlepertentage[3]}%</div>
                            </div>
                            <div className="age_groups">
                                <div className="age_group">
                                    <img src={Circle60} alt="60대+" />
                                    60대+
                                </div>
                                <div className="age_percentage">{circlepertentage[4]}%</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="gender">
                    <div className="subtitle">성별 피해 비율</div>
                    <div className="gender_percentage">
                        <div className="gender_top">
                            <div className="male_text">남성 ({malePercent}%)</div>
                            <div className="female_text">여성 ({femalePercent}%)</div>
                        </div>

                        <div className="gender_bar">
                            <div
                                className="gender_fill gender_fill--male"
                                style={{ width: `${malePercent}%` }}
                            />
                            <div
                                className="gender_fill gender_fill--female"
                                style={{ width: `${femalePercent}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
