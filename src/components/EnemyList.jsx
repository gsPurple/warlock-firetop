import React from 'react';
import heartSVG from '../images/icons/heart_Icon.svg';
import skillSVG from '../images/icons/skill_icon.svg';
//import '../styles/enemyList.css'; // optional, reuse header.css if desired

const EnemyList = ({ enemyVisible, enemies }) => {
    return (
        <div id="enemy-nav" data-visible={enemyVisible} className="header-nav-bttns enemy-nav">
            <h3 className="mobile-only-heading">Enemies</h3>
            <div className="enemy-card-list">
                <span className='label'>Enemies:</span>
                {enemies.map((enemy, index) => {
                    const defeated = enemy.stamina <= 0;
                    return (
                        <div className={`enemy-card${defeated ? ' defeated' : ''}`} key={index}>
                            <span className="enemy-card-name">{enemy.name}</span>
                            <div className="enemy-card-stats">
                                <span className="stat-content">
                                    <object className='icon' data={skillSVG} type="image/svg+xml" aria-label="Skill Icon"/>
                                    {enemy.skill}
                                </span>
                                <span className="stat-content">
                                    <object className='icon' data={heartSVG} type="image/svg+xml" aria-label="Stamina Icon"/>
                                    {enemy.stamina}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EnemyList;
