import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import Play from '../../assets/img/ic_play.svg';
import Youtube from '../../assets/img/ic_youtube.svg';
import { useNavigate } from 'react-router-dom';
import useApi from "hook/useApi";
import { getSecurityInfo } from "api/security";

const Security = () => {
    const navigate = useNavigate();
    const { execute, data, error, loading } = useApi(getSecurityInfo);

    const pageRef = useRef(null);
    useLayoutEffect(() => {
        pageRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
        // 또는: if (pageRef.current) pageRef.current.scrollTop = 0;
    }, []);

    // 유튜브 가로 스크롤 드래그용
    const scrollerRef = useRef(null);
    const dragState = useRef({
        isDown: false,
        startX: 0,
        startScrollLeft: 0,
    });

    useEffect(() => {
        execute();
    }, [execute]);

    const result = data?.result;

    // 뉴스: 2개만 미리 보여주기(없으면 빈 배열)
    const newsPreview = useMemo(() => {
        const list = result?.securityNews ?? [];
        return list.slice(0, 2);
    }, [result]);

    // 유튜브: 5개 고정 (API가 5개보다 적으면 그만큼만)
    const youtubeChannelUrl = result?.youtube?.channelUrl;
    const youtubeVideos = useMemo(() => {
        const list = result?.youtube?.videos ?? [];
        return list.slice(0, 5);
    }, [result]);

    const openNewTab = (url) => {
        if (!url) return;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    // 드래그 스크롤 핸들러
    const onMouseDown = (e) => {
        const el = scrollerRef.current;
        if (!el) return;

        dragState.current.isDown = true;
        dragState.current.startX = e.pageX - el.offsetLeft;
        dragState.current.startScrollLeft = el.scrollLeft;

        el.classList.add("is-dragging");
    };

    const onMouseLeave = () => {
        const el = scrollerRef.current;
        dragState.current.isDown = false;
        el?.classList.remove("is-dragging");
    };

    const onMouseUp = () => {
        const el = scrollerRef.current;
        dragState.current.isDown = false;
        el?.classList.remove("is-dragging");
    };

    const onMouseMove = (e) => {
        const el = scrollerRef.current;
        if (!el) return;
        if (!dragState.current.isDown) return;

        e.preventDefault();
        const x = e.pageX - el.offsetLeft;
        const walk = x - dragState.current.startX;
        el.scrollLeft = dragState.current.startScrollLeft - walk;
    };

    return (
        <div className="Security_wrap" ref={pageRef}>
            <div className="title">보안 뉴스 & 정보</div>
            <div className="description">최신 피싱 사례와 예방 정보를 확인하세요.</div>
            {error && (
                <div style={{ fontSize: 12, color: "#FF6467", paddingLeft: 20 }}>
                    데이터를 불러오지 못했어요: {error?.message}
                </div>
            )}
            <div className="current_news">
                <div className="subtitle">
                    최신 보안 뉴스
                    <div className="more" onClick={() => navigate('/security/news')}>더보기</div>
                </div>
                <div className="two_news">
                    {loading && (
                        <>
                            <div className="news_card">
                                <div className="card_title">불러오는 중...</div>
                            </div>
                            <div className="news_card">
                                <div className="card_title">불러오는 중...</div>
                            </div>
                        </>
                    )}

                    {!loading &&
                        newsPreview.map((n) => (
                            <div
                                key={n.id}
                                className="news_card"
                                onClick={() => openNewTab(n.linkUrl)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") openNewTab(n.linkUrl);
                                }}
                            >
                                <div className="card_top">
                                    <div className="tag">{n.source}</div>
                                    <div className="date">{n.publishedAt}</div>
                                </div>
                                <div className="card_title">{n.title}</div>
                                <div className="card_description">{n.summary}</div>
                            </div>
                        ))}
                </div>
            </div>
            <div className="youtube">
                <div className="youtube_top">
                    <div className="subtitle">
                        <img src={Youtube} alt="Youtube" />
                        경찰청 공식 유튜브
                    </div>
                    <div className="goto_youtube" onClick={() => openNewTab(youtubeChannelUrl)}>
                        채널 바로가기
                    </div>
                </div>
                <div
                    className="youtube_videos"
                    ref={scrollerRef}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseLeave}
                >
                    {(loading ? Array.from({ length: 5 }) : youtubeVideos).map((v, idx) => {
                        const key = loading ? `skeleton-${idx}` : v.id;

                        return (
                            <div
                                key={key}
                                className="video_card"
                                onClick={() => !loading && openNewTab(v.videoUrl)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (loading) return;
                                    if (e.key === "Enter" || e.key === " ") openNewTab(v.videoUrl);
                                }}
                            >
                                <div className="video_thumbnail">
                                    {loading ? (
                                        <div className="thumb_skeleton" />
                                    ) : (
                                        <img className="thumb" src={v.thumbnailUrl} alt={v.title} />
                                    )}
                                    <img className="play" src={Play} alt="Play" draggable={false} />
                                </div>
                                <div className="video_title">{loading ? "불러오는 중..." : v.title}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default Security
