import React, { useState, useEffect } from 'react';
import './styles/header.css';
import heartSVG from './images/heart_Icon.svg';
import skillSVG from './images/skill_icon.svg';
import cloverSVG from './images/clover_icon.svg';
import goldSVG from './images/gold_icon.svg';
import provisionsSVG from './images/provisions_icon.svg';

const Header = ({ playerData }) => {
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    const [dataVisible, setDataVisible] = useState(false);
    const [ariaExpanded, setAriaExpanded] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 768);
            setDataVisible(window.innerWidth >= 768); // Set dataVisible to true if screen is at least 768 pixels
            setAriaExpanded(window.innerWidth >= 768)
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Initial check for screen size
        handleResize();

        // Cleanup: remove event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const clickNavToggle = () => {
        setDataVisible(!dataVisible);
        setAriaExpanded(!ariaExpanded);
    };

    return (
        <header>
            <div className='parent'>
                <div className='header-container'>
                    <div className='stats'>
                        <div className='stat-container stat-border'>
                            <div className="stat-content">
                                <object className='icon' data={heartSVG} type="image/svg+xml" aria-label="Stamina Icon"/>
                                <div>{playerData.initSta}/{playerData.currentSta}</div>
                            </div>
                        </div>

                        <div className='stat-container stat-border'>
                            <div className="stat-content">
                                <object className='icon' data={skillSVG} type="image/svg+xml" aria-label="Skill Icon"/>
                                <div>{playerData.initSkill}/{playerData.currentSkill}</div>
                            </div>
                        </div>

                        <div className='stat-container stat-border'>
                            <div className="stat-content">
                                <object className='icon' data={cloverSVG} type="image/svg+xml" aria-label="Luck Icon"/>
                                <div>{playerData.initLuck}/{playerData.currentLuck}</div>
                            </div>
                        </div>

                        <div className='stat-container stat-border'>
                            <div className="stat-content">
                                <object className='icon' data={goldSVG} type="image/svg+xml" aria-label="Gold Icon"/>
                                <div>{playerData.gold}</div>
                            </div>
                        </div>

                        <button onClick={() => clickNavToggle()} className='mobile-nav-toggle' aria-controls='primary-nav' aria-expanded={ariaExpanded}>
                            <span className='sr-only'>Menu</span>
                        </button>
                    </div>
                    
                    <div id='primary-nav' data-visible={dataVisible} className='header-nav-bttns primary-nav'>
                        {!isLargeScreen && <h3>Inventory</h3>}
                        
                        <div className='stat-container stat-border'>
                            <div className="stat-content">
                                <object className='icon' data={provisionsSVG} type="image/svg+xml" aria-label="Provisions Icon"/>
                                <div>{playerData.provisions}</div>
                            </div>
                        </div>

                        <div className='equipment-border'>
                            <span className='label'>Equipment:</span>
                            {playerData.inventory.map((item, index) => (
                                <div key={index}>{item}</div>
                            ))}
                        </div>
                        
                    </div> 
                    
                </div>
            </div>
        </header>
    );
}

export default Header;
