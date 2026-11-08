import { useState } from 'react';
import '../styles/modal.css';

// Asks which item to leave behind to take `item` (null = closed). A stack ("Potion of Skill x2") only loses one.
// Clicking a row only selects it; the drop happens when the player confirms. The parent gives this a key
// per item so the selection starts empty each time it opens.
const DropItemModal = ({ item, inventory, onDrop, onCancel }) => {
    const [selected, setSelected] = useState(null);

    if (!item) return null;

    const isStack = (held) => /\sx\d+$/.test(held);

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <p>To take the {item}, choose an item to leave behind:</p>
                <ul className="drop-item-list">
                    {inventory.map((held) => (
                        <li key={held}>
                            <button
                                className={held === selected ? 'selected' : ''}
                                aria-pressed={held === selected}
                                onClick={() => setSelected(held)}>
                                <span>{held}</span>
                                <span className="drop-item-action">{held === selected ? '✓ ' : ''}{isStack(held) ? 'Leave one' : 'Leave'}</span>
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="modal-buttons">
                    <button disabled={selected === null} onClick={() => onDrop(selected)}>
                        {selected === null ? 'Choose an item' : `Leave it & take the ${item}`}
                    </button>
                    <button onClick={onCancel}>Don't take it</button>
                </div>
            </div>
        </div>
    );
};

export default DropItemModal;
