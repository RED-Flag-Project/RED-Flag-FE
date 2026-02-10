import React from 'react';
import Logo from '../../assets/img/ic_logo.svg';
import Alarm from '../../assets/img/ic_alarm.svg';
import Setting from '../../assets/img/ic_setting.svg';

const Header = () => {
    return (
        <div className='Header_wrap'>
            <div className="header_left">
                <div className="logo_img">
                    <img src={Logo} alt="Logo" />
                </div>
                <div className="logo_text">RED Flag</div>
            </div>
            <div className="header_right">
                <div className="alarm">
                    <img src={Alarm} alt="Alarm" />
                </div>
                <div className="setting">
                    <img src={Setting} alt="Setting" />
                </div>
            </div>
        </div>
    )
}

export default Header
