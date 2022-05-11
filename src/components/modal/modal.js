import ReactDOM from 'react-dom';

import modal from './modal.module.css'

import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay.js';
import IngredientDetails from '../ingredient-details/ingredient-details.js';

import React from 'react';

const modalsContainer = document.querySelector('#modals');

// export default function Modal({title, onOverlayClick, onEscapeClick, onCrossClick, children}) {
  export default function Modal({title, setData, children}) {

    function closeAllModals() {
      setData(null)
  }

  function onEscapeClick(event) {
    if (event.key === "Escape") {
      closeAllModals();
    }
  }

  function onCrossClick() {
    closeAllModals();
  }

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
        <div className={`pt-10 pr-10 pl-10 ${modal.header}`}>
          <h3 className={`text text_type_main-large ${modal.title}`}>{title}</h3>
          <div onClick={onCrossClick}>
            <CloseIcon type="primary" />
          </div>
        </div>
        {children}
      </div>


      <ModalOverlay onOverlayClick={closeAllModals}/>
    </>),

    modalsContainer
  )
}
