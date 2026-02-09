import React from 'react';
import Back from '../../assets/img/ic_back.svg';

const NewsDetail = () => {
    return (
        <div className='NewsDetail_wrap'>
            <div className="title">
                <div className="go_back">
                    <img src={Back} alt="뒤로가기" />
                </div>
                전체 보안 뉴스
            </div>
            <div className="news_card">
                <div className="card_top">
                    <div className="tag">경찰청 보도자료</div>
                    <div className="date">2023.10.24</div>
                </div>
                <div className="card_title">신종 보이스피싱 '자녀 납치' 수법 주의보</div>
                <div className="card_description">최근 AI 목소리 변조 기술을 악용한 자녀 납치 빙자 보이스피싱이 기승을 부리고 있어 각별한 주의가 요구됩니다.</div>
            </div>
            {/* 추후 뉴스 10개로 변경 예정 */}
        </div>
    )
}

export default NewsDetail
