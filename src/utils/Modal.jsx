import '../styles/modal.css';

// With `message` it asks that question; otherwise it asks to use `item` to `effect`, or says the item can't be used
const Modal = ({ showModal, onClose, onConfirm, item, effect, message }) => {
  if (!showModal) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
            {message || item ? (
                <>
                    <p>{message ?? `Are you sure you want to use ${item} to ${effect}?`}</p>
                    <div className="modal-buttons">
                        <button onClick={onConfirm}>Yes</button>
                        <button onClick={onClose}>No</button>
                    </div>
                </>
            ) : (
                <>
                    <p>You can't use this item right now</p>
                    <div className="modal-buttons">
                        <button onClick={onClose}>Close</button>
                    </div>
                </>
            )}
        </div>
    </div>
  );
};

export default Modal