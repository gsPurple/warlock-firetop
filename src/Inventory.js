import React, { useState } from 'react';
import provisionsSVG from './images/icons/provisions_icon.svg';
import tooltipText from './utils/tooltipText';
import * as constants from './utils/constantsfile';
import './styles/tooltips.css'
import Modal from './utils/Modal';

const Inventory = ({ playerState, setPlayerState, dataVisible, isLargeScreen}) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalData, setModalData] = useState({ item: '', effect: '' });

    const isItemConsumable = (item) => {
        const consumableItems = [constants.SKILLPOTION, constants.STRPOTION, constants.FORTPOTION];
        // Check if the base name (before any "x2" suffix) is in the list
        const match = item.match(/(.+?)\s+x\d+$/); // Extract base name if it has a quantity suffix
        const baseName = match ? match[1] : item;
        return consumableItems.includes(baseName);
    };

    const deleteItem = (item) => {
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
    }

    const openModal = (item, effect) => {
        setModalData({ item, effect });
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalData({ item: '', effect: '' });
        setModalOpen(false);
        setSelectedItem(null);
    };

    const handleItemClick = (item) => {
        const match = item.match(/(.+?)\s+x\d+$/);
        const baseName = match ? match[1] : item;
        setSelectedItem(item);
        let effect = "";

        switch(baseName) {

            case constants.SKILLPOTION:
                if (Number(playerState.currentSkill) < Number(playerState.initSkill)) {
                    effect = `recover ${Number(playerState.initSkill) - Number(playerState.currentSkill)} points of Skill`
                    openModal(constants.SKILLPOTION, effect)
                } else {
                    openModal(null, null)
                }
                break;
            case constants.STRPOTION:
                if (Number(playerState.currentSta) < Number(playerState.initSta)) {
                    effect = `recover ${Number(playerState.initSta) - Number(playerState.currentSta)} points of Stamina`
                    openModal(constants.STRPOTION, effect)
                } else {
                    openModal(null, null)
                }
                break;
            case constants.FORTPOTION:
                if (Number(playerState.currentLuck) <= Number(playerState.initLuck)) {
                    effect = `recover ${Number(playerState.initLuck) - Number(playerState.currentLuck)} points of Luck and add 1 point to your Initial Luck`
                    openModal(constants.FORTPOTION, effect)
                } else {
                    openModal(null, null)
                }
                break;
            default:
                console.warn("Item not recognized or not usable.");
                break;

        }
    };

    const confirmItemUsage = (item) => {
        // Extract the base name from the item
        const match = item.match(/(.+?)\s+x\d+$/);
        const baseName = match ? match[1] : item;
    
        let newState = {};
    
        switch (baseName) {
            case constants.SKILLPOTION:
                if (Number(playerState.currentSkill) < Number(playerState.initSkill)) {
                    newState = {
                        currentSkill: playerState.initSkill,
                    };
                }
                break;
    
            case constants.STRPOTION:
                if (Number(playerState.currentSta) < Number(playerState.initSta)) {
                    newState = {
                        currentSta: playerState.initSta,
                    };
                }
                break;
    
            case constants.FORTPOTION:
                if (Number(playerState.currentLuck) <= Number(playerState.initLuck)) {
                    const newInitLuck = Number(playerState.initLuck) + 1;
                    newState = {
                        initLuck: newInitLuck,
                        currentLuck: newInitLuck,
                    };
                }
                break;
    
            default:
                console.warn("Item not recognized or not usable.");
                break;
        }
    
        if (Object.keys(newState).length > 0) {
            setPlayerState((prevState) => ({
                ...prevState,
                ...newState,
            }));
        }

        deleteItem(item);
    };

    return (
        <div>
            <Modal showModal={isModalOpen}
                item={modalData.item}
                effect={modalData.effect}
                onClose={() => closeModal()}
                onConfirm={() => {
                    console.log(`Using ${modalData.item} to ${modalData.effect}`);
                    confirmItemUsage(selectedItem)
                    setModalOpen(false);
                }}
            />
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
                        <div 
                            tabIndex="-1" 
                            className={`invItem tooltip ${isItemConsumable(item) ? 'consumable' : 'non-consumable'}`}
                            onClick={isItemConsumable(item) ? () => handleItemClick(item) : undefined}
                            key={index}>
                            {item}
                            {tooltipText(item)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Inventory;
