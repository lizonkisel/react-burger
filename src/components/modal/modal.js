import ReactDOM from 'react-dom';

import modal from './modal.module.css'

import ModalOverlay from '../modal-overlay/modal-overlay.js';
import React from 'react';

const modalsContainer = document.querySelector('#modals');

export default function Modal({title, onOverlayClick, onEscapeClick}) {

  React.useEffect(
    () => {
      document.addEventListener('keydown', onEscapeClick);

      return () => {
        document.removeEventListener('keydown', onEscapeClick);
      }
    }, []
  )

  return ReactDOM.createPortal(
    (<>
      <div className={modal.modal}>
        <h3>{title}</h3>
        <div className={modal.someContainer}></div>
      </div>

      <ModalOverlay onOverlayClick={onOverlayClick}/>
    </>),

    modalsContainer
  )
}
