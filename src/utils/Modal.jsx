import React from 'react';
import '../styles/modal.css';

const Modal = ({ showModal, onClose, onConfirm, item, effect }) => {
  if (!showModal) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
            {item ? (
                <>
                    <p>Are you sure you want to use {item} to {effect}?</p>
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