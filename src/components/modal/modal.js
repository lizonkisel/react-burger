import ReactDOM from 'react-dom';

import modal from './modal.module.css'

import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay.js';
import IngredientDetails from '../ingredient-details/ingredient-details.js';

import React from 'react';

const modalsContainer = document.querySelector('#modals');

export default function Modal({title, onOverlayClick, onEscapeClick, onCrossClick, children}) {

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
        {/* <IngredientDetails
          ingredient={{
            "_id":"60666c42cc7b410027a1a9b2",
            "name":"Флюоресцентная булка R2-D3",
            "type":"bun",
            "proteins":44,
            "fat":26,
            "carbohydrates":85,
            "calories":643,
            "price":988,
            "image":"https://code.s3.yandex.net/react/code/bun-01.png",
            "image_mobile":"https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            "image_large":"https://code.s3.yandex.net/react/code/bun-01-large.png",
            "__v":0
          }}
        /> */}
      </div>


      <ModalOverlay onOverlayClick={onOverlayClick}/>
    </>),

    modalsContainer
  )
}
