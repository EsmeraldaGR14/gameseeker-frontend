import React from 'react';
import "./DeletionModal.css"

function DeletionModal({ isOpen, onClose, message, onConfirm }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className='deletion-modal-container'>
    <div className="deletion-modal">
      <p className="message">{message}</p>
      <div className="options">
        <button className="yes-button" onClick={onConfirm}>
          Yes
        </button>
        <button className="no-button" onClick={onClose}>
          No
        </button>
      </div>
    </div>
    </div>
  );
  }

export default DeletionModal