import React from 'react';
import './styles/header.css';

const Header = ( {playerData}) => {
    
    


    const clickNavToggle = () => {
        const primaryNav = document.querySelector('.primary-nav');
        const navToggle = document.querySelector('.mobile-nav-toggle');

        const visibility = primaryNav.getAttribute('data-visible')

        if(visibility === 'false') {
            primaryNav.setAttribute('data-visible', 'true');
            navToggle.setAttribute('aria-expanded', 'true')

        }
        else if (visibility === 'true') {
            primaryNav.setAttribute('data-visible', 'false');
            navToggle.setAttribute('aria-expanded', 'false')
        }
    }

    return(
        <header>
            <div className='parent'>
                <div className='header-container'>
                    <div className='stats'>
                        <div className='stat-container'>STA: {playerData.initSta}/{playerData.currentSta}</div>

                        <div className='stat-container'>SKL: {playerData.initSkill}/{playerData.currentSkill}</div>

                        <div className='stat-container'>LCK: {playerData.initLuck}/{playerData.currentLuck}</div>

                        <button onClick={() => clickNavToggle()} className='mobile-nav-toggle' aria-controls='primary-nav' aria-expanded='false'>
                            <span className='sr-only'>Menu</span>
                        </button>
                    </div>
                    

                    <nav>
                        <ul id='primary-nav' data-visible='false' className='header-nav-bttns primary-nav'>
                            <li className='active'>
                                
                                <span className='hBttn'>cv()</span>
                                
                            </li>
                            <li>
                                
                                <span className='hBttn'>home()</span>
                                
                            </li>
                            <li>
                                
                                <span className='hBttn'>contact()</span>
                                
                            </li>
                            <li>
                                
                                <span className='hBttn'>projects()</span>
                                
                            </li>
                            
                        </ul> 
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header