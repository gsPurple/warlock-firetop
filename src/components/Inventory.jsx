import React, { useState } from 'react';
import provisionsSVG from '../images/icons/provisions_icon.svg';
import tooltipText from '../utils/tooltipText';
import * as constants from '../utils/constantsfile';
import '../styles/tooltips.css'
import Modal from '../utils/Modal';

const Inventory = ({ playerState, setPlayerState, dataVisible, isLargeScreen, inBattle = false}) => {
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

    const openModal = (item, effect) => {
        setModalData({ item, effect });
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalData({ item: '', effect: '' });
        setModalOpen(false);
        setSelectedItem(null);
    };

    const missingSta = Number(playerState.initSta) - Number(playerState.currentSta);
    const eatBlocker = playerState.ateOnPage ? "You already ate on this page"
        : Number(playerState.provisions) <= 0 ? "You have no Provisions left"
        : missingSta <= 0 ? "Your Stamina is already full"
        : null;

    const handleEatClick = () => {
        setSelectedItem(constants.PROVISIONS);
        openModal(constants.PROVISIONS, `eat a meal and recover ${Math.min(constants.MEAL_STAMINA, missingSta)} points of Stamina`);
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

    return (
        <div>
            <Modal showModal={isModalOpen}
                item={modalData.item}
                effect={modalData.effect}
                onClose={() => closeModal()}
                onConfirm={() => {
                    console.log(`Using ${modalData.item} to ${modalData.effect}`);
                    setPlayerState(selectedItem === constants.PROVISIONS ? { type: 'EAT' } : { type: 'USE_ITEM', item: selectedItem });
                    setModalOpen(false);
                }}
            />
            <div id='primary-nav' data-visible={dataVisible} className='header-nav-bttns primary-nav'>            
                {!isLargeScreen && <h3>Backpack</h3>}
            
                <div className='provisions-row'>
                    <div className='stat-container stat-border'>
                        <div className="stat-content">
                            <object className='icon' data={provisionsSVG} type="image/svg+xml" aria-label="Provisions Icon"/>
                            <div>{playerState.provisions}</div>
                        </div>
                    </div>
                    {!inBattle && <button className='eat-button' onClick={handleEatClick} disabled={eatBlocker !== null} title={eatBlocker ?? 'Eat a meal'}>Eat</button>}
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
