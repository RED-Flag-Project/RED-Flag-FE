import React from 'react';
import Home from '../../assets/img/ic_home.svg';
import HomeActive from '../../assets/img/ic_home_selected.svg';
import Search from '../../assets/img/ic_search.svg';
import SearchActive from '../../assets/img/ic_search_selected.svg';
import Security from '../../assets/img/ic_security.svg';
import SecurityActive from '../../assets/img/ic_security_selected.svg';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
    {
        key: 'dashboard',
        label: '대시보드',
        path: '/dashboard',
        icon: Home,
        activeIcon: HomeActive,
    },
    {
        key: 'upload',
        label: '피싱분석',
        path: '/upload',
        icon: Search,
        activeIcon: SearchActive,
    },
    {
        key: 'security',
        label: '보안정보',
        path: '/security',
        icon: Security,
        activeIcon: SecurityActive,
    },
];

const Nav = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className='Nav_wrap'>
            <div className="buttons">
                {navItems.map((item) => {
                    // 현재 경로가 이 탭의 path로 시작하면 active로 간주
                    const isActive = location.pathname.startsWith(item.path);

                    return (
                        <button
                            key={item.key}
                            type="button"
                            className={`button ${isActive ? 'button--active' : ''}`}
                            onClick={() => navigate(item.path)}
                        >
                            <img
                                src={isActive ? item.activeIcon : item.icon}
                                alt={item.label}
                            />
                            <div className="text">{item.label}</div>
                        </button>
                    );
                })}
            </div>
        </div>
    )
}

export default Nav
