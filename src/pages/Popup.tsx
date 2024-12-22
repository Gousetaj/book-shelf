import React from 'react';
import './Popup.css'
interface PopupProps {
  message: string;
  title?: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ title = 'Confirmation',message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default Popup;
