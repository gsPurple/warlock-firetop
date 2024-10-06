import React from 'react';
import provisionsSVG from './images/icons/provisions_icon.svg';

const Inventory = ({ playerState, dataVisible, isLargeScreen}) => {
    return (
        <div id='primary-nav' data-visible={dataVisible} className='header-nav-bttns primary-nav'>
            {!isLargeScreen && <h3>Backpack</h3>}
            
            <div className='stat-container stat-border'>
                <div className="stat-content">
                    <object className='icon' data={provisionsSVG} type="image/svg+xml" aria-label="Provisions Icon"/>
                    <div>{playerState.provisions}</div>
                </div>
            </div>

            <div className='equipment-border'>
                <span className='label'>Equipment:</span>
                {playerState.inventory.map((item, index) => (
                    <div key={index}>{item}</div>
                ))}
            </div>
        </div>
    );
};

export default Inventory;
