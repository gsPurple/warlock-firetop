import React, { useState, useEffect } from 'react';
import Inventory from './Inventory';
import './styles/header.css';
import heartSVG from './images/icons/heart_Icon.svg';
import skillSVG from './images/icons/skill_icon.svg';
import cloverSVG from './images/icons/clover_icon.svg';
import goldSVG from './images/icons/gold_icon.svg';

const Header = ({ playerState }) => {
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
                                <div>{playerState.currentSta}/{playerState.initSta}</div>
                            </div>
                        </div>

                        <div className='stat-container stat-border'>
                            <div className="stat-content">
                                <object className='icon' data={skillSVG} type="image/svg+xml" aria-label="Skill Icon"/>
                                <div>{playerState.currentSkill}/{playerState.initSkill}</div>
                            </div>
                        </div>

                        <div className='stat-container stat-border'>
                            <div className="stat-content">
                                <object className='icon' data={cloverSVG} type="image/svg+xml" aria-label="Luck Icon"/>
                                <div>{playerState.currentLuck}/{playerState.initLuck}</div>
                            </div>
                        </div>

                        <div className='stat-container stat-border'>
                            <div className="stat-content">
                                <object className='icon' data={goldSVG} type="image/svg+xml" aria-label="Gold Icon"/>
                                <div>{playerState.gold}</div>
                            </div>
                        </div>

                        <button onClick={() => clickNavToggle()} className='mobile-nav-toggle' aria-controls='primary-nav' aria-expanded={ariaExpanded}>
                            <span className='sr-only'>Menu</span>
                        </button>
                    </div>
                    
                    <Inventory
                        playerState={playerState} 
                        dataVisible={dataVisible} 
                        isLargeScreen={isLargeScreen}
                        ariaExpanded={ariaExpanded}
                        clickNavToggle={clickNavToggle}
                    />
                    
                </div>
            </div>
        </header>
    );
}

export default Header;
