import React, { useEffect, useMemo, useRef, useLayoutEffect } from 'react';
import Cash from '../../assets/img/ic_cash.svg';
import Circle20 from '../../assets/img/ic_circle_20.svg';
import Circle30 from '../../assets/img/ic_circle_30.svg';
import Circle40 from '../../assets/img/ic_circle_40.svg';
import Circle50 from '../../assets/img/ic_circle_50.svg';
import Circle60 from '../../assets/img/ic_circle_60.svg';
import useApi from "hook/useApi";
import { getTodayStats } from "api/dashboard";

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

const formatKRWShort = (amount) => {
    const n = Number(amount);
    if (!Number.isFinite(n)) return "-";

    const sign = n < 0 ? "-" : "";
    let v = Math.abs(n);

    const units = [
        { value: 1e12, label: "조" },
        { value: 1e8, label: "억" },
        { value: 1e4, label: "만" },
    ];

    let out = "";
    for (const u of units) {
        if (v >= u.value) {
            const q = Math.floor(v / u.value);
            v = v % u.value;
            out += `${q}${u.label} `;
        }
    }

    if (!out) out = `${Math.floor(Math.abs(n)).toLocaleString()}원`;
    return `${sign}${out.trim()}`;
};

const clamp0to100 = (x) => {
    const v = Number(x);
    if (!Number.isFinite(v)) return 0;
    return Math.max(0, Math.min(100, v));
};

const Dashboard = () => {
    const pageRef = useRef(null);

    useLayoutEffect(() => {
        pageRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, []);

    const { execute, data, error, loading } = useApi(getTodayStats);

    useEffect(() => {
        execute();
    }, [execute]);

    const result = data?.result;

    const todayCount = result?.todayDetection?.count ?? 0;

    const totalDamageAmount = result?.totalDamageStats?.totalDamageAmount ?? 0;
    const yearTotal = formatKRWShort(totalDamageAmount);
    const increaseRate = result?.totalDamageStats?.yearOverYearChangeRate ?? 0;

    const totalCaseCount = result?.totalDamageStats?.totalIncidentCount ?? 0;
    const caseIncreaseRate = result?.totalDamageStats?.incidentChangeRate ?? 0;

    const round1 = (x) => Math.round(Number(x) * 10) / 10;
    const circlepertentage = useMemo(() => {
        const age = result?.ageDistribution;

        const under20 = round1(clamp0to100(age?.under20 ?? 0));
        const thirties = round1(clamp0to100(age?.thirties ?? 0));
        const forties = round1(clamp0to100(age?.forties ?? 0));
        const fifties = round1(clamp0to100(age?.fifties ?? 0));
        const sixties = round1(clamp0to100(age?.sixties ?? 0));
        const over70 = round1(clamp0to100(age?.over70 ?? 0));

        const sixtyPlus = round1(clamp0to100(sixties + over70));

        return [under20, thirties, forties, fifties, sixtyPlus];
    }, [result]);

    const malePercent = clamp0to100(result?.genderDistribution?.male ?? 0);
    const femalePercent = clamp0to100(result?.genderDistribution?.female ?? 0);

    return (
        <div className='Dashboard_wrap' ref={pageRef}>
            <div className="title">
                피싱 범죄 현황
                <div className="description">최신 금융 사기 피해 현황 및 분석 데이터입니다.</div>
            </div>
            {error && (
                <div style={{ fontSize: 12, color: "#FF6467" }}>
                    데이터를 불러오지 못했어요: {error?.message}
                </div>
            )}
            <div className="today">
                <div className="subtitle">오늘 탐지된 피싱, 스캠 건수</div>
                <div className="today_count">총 {loading ? "..." : todayCount}건</div>
            </div>
            <div className="year_total">
                <div className="subtitle">
                    <img src={Cash} alt="Cash Icon" />
                    2025년 총 피해 규모
                </div>
                <div className="cumulative">누적 피해액</div>
                <div className="year_total_num">{loading ? "..." : `${yearTotal} 원`}</div>
                <div className="comparison">▲ 전년 대비 {loading ? "..." : increaseRate}% 증가</div>
                <div className="divider"></div>
                <div className="cases">
                    <div className="total_case">
                        <div className="subtitle">총 발생 건수</div>
                        <div className="case_num">{loading ? "..." : `${totalCaseCount}건`}</div>
                    </div>
                    <div className="comparison_lastyear">
                        <div className="subtitle">전년 대비 발생 건수</div>
                        <div className="case_increase">{loading ? "..." : `${caseIncreaseRate}% 증가`}</div>
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
