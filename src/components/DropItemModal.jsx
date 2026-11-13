import { useState } from 'react';
import '../styles/modal.css';

// Selection value for the "throw a Gold Piece" row (can't clash with an item name)
export const GOLD_PIECE = '__gold_piece__';

// Asks which item to leave behind to take `item` (null = closed). A stack ("Potion of Skill x2") only loses one.
// With mode="throw" it asks which item to throw away instead (`item` is just the open flag), and `gold`
// adds a "Gold Piece" row, since a coin can be thrown instead of equipment.
// Clicking a row only selects it; the drop happens when the player confirms. The parent gives this a key
// per item so the selection starts empty each time it opens.
const DropItemModal = ({ item, inventory, onDrop, onCancel, mode = 'leave', gold = 0 }) => {
    const [selected, setSelected] = useState(null);

    if (!item) return null;

    const throwing = mode === 'throw';
    const isStack = (held) => /\sx\d+$/.test(held);
    const action = throwing ? 'Throw' : 'Leave';

    const rows = inventory.map((held) => ({ value: held, label: held, stack: isStack(held) }));
    if (throwing && gold > 0) rows.push({ value: GOLD_PIECE, label: 'Gold Piece', stack: false });

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <p>{throwing ? 'Choose an item to throw:' : `To take the ${item}, choose an item to leave behind:`}</p>
                <ul className="drop-item-list">
                    {rows.map(({ value, label, stack }) => (
                        <li key={value}>
                            <button
                                className={value === selected ? 'selected' : ''}
                                aria-pressed={value === selected}
                                onClick={() => setSelected(value)}>
                                <span>{label}</span>
                                <span className="drop-item-action">{value === selected ? '✓ ' : ''}{stack ? `${action} one` : action}</span>
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="modal-buttons">
                    <button disabled={selected === null} onClick={() => onDrop(selected)}>
                        {selected === null ? 'Choose an item' : throwing ? 'Throw it' : `Leave it & take the ${item}`}
                    </button>
                    <button onClick={onCancel}>{throwing ? 'Cancel' : "Don't take it"}</button>
                </div>
            </div>
        </div>
    );
};

export default DropItemModal;
