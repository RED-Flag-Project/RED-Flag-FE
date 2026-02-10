import React, { useEffect, useLayoutEffect, useRef } from 'react';
import Back from '../../assets/img/ic_back.svg';
import { useNavigate } from 'react-router-dom';
import useApi from "hook/useApi";
import { getSecurityNews } from "api/security";

const NewsDetail = () => {
    const navigate = useNavigate();
    const { execute, data, error, loading } = useApi(getSecurityNews);

    const pageRef = useRef(null);
    useLayoutEffect(() => {
        pageRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, []);

    useEffect(() => {
        execute();
    }, [execute]);

    const newsList = data?.result?.newsList ?? [];

    const handleBack = () => {
        navigate(-1);
    };

    const handleOpen = (url) => {
        if (!url) return;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <div className='NewsDetail_wrap' ref={pageRef}>
            <div className="title">
                <div className="go_back" onClick={handleBack}>
                    <img src={Back} alt="뒤로가기" />
                </div>
                전체 보안 뉴스
            </div>
            {error && (
                <div style={{ fontSize: 12, color: "#FF6467", marginBottom: 12 }}>
                    데이터를 불러오지 못했어요: {error?.message}
                </div>
            )}

            {loading && (
                <div style={{ fontSize: 12, color: "#99A1AF" }}>
                    불러오는 중...
                </div>
            )}

            {!loading && newsList.map((item) => (
                <div
                    key={item.id}
                    className="news_card"
                    onClick={() => handleOpen(item.linkUrl)}
                >
                    <div className="card_top">
                        <div className="tag">{item.source}</div>
                        <div className="date">{item.publishedAt}</div>
                    </div>
                    <div className="card_title">{item.title}</div>
                    <div className="card_description">{item.summary}</div>
                </div>
            ))}
        </div>
    )
}

export default NewsDetail
