import React, { FunctionComponent, ReactNode } from 'react';
import ReactDOM from 'react-dom';

import modal from './modal.module.css'

import PropTypes from 'prop-types';

import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import { ModalOverlay } from '../modal-overlay/modal-overlay';


const modalsContainer = document.querySelector('#modals');

interface IModalProps {
  title?: string,
  onClose: () => void,
  children: ReactNode
}

// export default function Modal({title, onClose, children}) {
export const Modal: FunctionComponent<IModalProps> = ({title, onClose, children}) => {

  function closeModal() {
    onClose();
  }

  //@ts-ignore
  function onEscapeClick(event) {
    if (event.key === "Escape") {
      closeModal();
    }
  }

  function onCrossClick() {
    closeModal();
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


      <ModalOverlay onOverlayClick={closeModal}/>
    </>),
  //@ts-ignore
    modalsContainer
  )
};

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};
