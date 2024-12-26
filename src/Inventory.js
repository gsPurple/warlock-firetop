import React from 'react';
import provisionsSVG from './images/icons/provisions_icon.svg';
import tooltipText from './utils/tooltipText';
import './styles/tooltips.css'

const Inventory = ({ playerState, setPlayerState, dataVisible, isLargeScreen}) => {
    const handleItemClick = (item) => {
        setPlayerState((prevState) => {
            const inventory = [...prevState.inventory]; // Create a new inventory array
            const itemIndex = inventory.indexOf(item);

            if (itemIndex !== -1) {
                // Check if the item has a quantity suffix (e.g., "Health Potion x2")
                const match = item.match(/(.+?)\s+x(\d+)$/);
                if (match) {
                    const [, baseName, count] = match;
                    const newCount = parseInt(count) - 1;
                    if (newCount > 0) {
                        inventory[itemIndex] = `${baseName} x${newCount}`; // Update the item with a new count
                    } else {
                        inventory.splice(itemIndex, 1); // Remove the item if the count reaches 0
                    }
                } else {
                    // If no quantity, just remove the item
                    inventory.splice(itemIndex, 1);
                }
            }

            return { ...prevState, inventory }; // Update playerState
        });
    };

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
                    <div tabIndex="-1" className="invItem tooltip" onClick={() => handleItemClick(item)} key={index}>
                        {item}
                        {tooltipText(item)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Inventory;
