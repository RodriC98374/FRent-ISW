import React from 'react';
import { ButtonPrimary } from '../../Buttons/buttonPrimary';
import { ButtonSecondary } from '../../Buttons/buttonSecondary';


export default function CancelModal({ onClose, onConfirm }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>¿Estás seguro que deseas cancelar?</h2>
        <div className="modal-buttons">
          <ButtonPrimary onClick={onConfirm}>Sí</ButtonPrimary>
          <ButtonSecondary onClick={onClose}>No</ButtonSecondary>
        </div>
      </div>
    </div>
  );
}
