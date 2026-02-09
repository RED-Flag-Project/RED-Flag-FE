import React from 'react';
import Play from '../../assets/img/ic_play.svg';
import Youtube from '../../assets/img/ic_youtube.svg';

const Security = () => {
    return (
        <div className="Security_wrap">
            <div className="title">보안 뉴스 & 정보</div>
            <div className="description">최신 피싱 사례와 예방 정보를 확인하세요.</div>
            <div className="current_news">
                <div className="subtitle">
                    최신 보안 뉴스
                    <div className="more">더보기</div>
                </div>
                <div className="two_news">
                    <div className="news_card">
                        <div className="card_top">
                            <div className="tag">경찰청 보도자료</div>
                            <div className="date">2023.10.24</div>
                        </div>
                        <div className="card_title">신종 보이스피싱 '자녀 납치' 수법 주의보</div>
                        <div className="card_description">최근 AI 목소리 변조 기술을 악용한 자녀 납치 빙자 보이스피싱이 기승을 부리고 있어 각별한 주의가 요구됩니다.</div>
                    </div>
                    <div className="news_card">
                        <div className="card_top">
                            <div className="tag">사이버안전국</div>
                            <div className="date">2023.10.22</div>
                        </div>
                        <div className="card_title">중고거래 사기, '안전결제' 링크 조심하세요</div>
                        <div className="card_description">가짜 안전결제 사이트를 만들어 입금을 유도하는 사기 수법이 발견되었습니다.</div>
                    </div>
                </div>
            </div>
            <div className="youtube">
                <div className="youtube_top">
                    <div className="subtitle">
                        <img src={Youtube} alt="Youtube" />
                        경찰청 공식 유튜브
                    </div>
                    <div className="goto_youtube">채널 바로가기</div>
                </div>
                <div className="youtube_videos">
                    <div className="video_card">
                        <div className="video_thumbnail">
                            <img className="thumb" src="" alt="" />
                            <img className="play" src={Play} alt="Play" />
                        </div>
                        <div className="video_title">[경찰청] 보이스피싱, 아는 만큼 예방합니다</div>
                    </div>
                    {/* 추후 4개 더 추가 예정, 슬라이드 기능 구현 예정 */}
                </div>
            </div>
        </div>
    )
}

export default Security
