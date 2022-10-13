import modalOverlay from './modal-overlay.module.css';

import PropTypes from 'prop-types';

import React, { FunctionComponent }  from 'react';

interface IModalOverlayProps {
  onOverlayClick: () => void
}

// export default function ModalOverlay({onOverlayClick}) {
  export const ModalOverlay: FunctionComponent<IModalOverlayProps> = ({onOverlayClick}) => {
  return (
    <div className={modalOverlay.overlay} onClick={onOverlayClick}></div>
  )
}

ModalOverlay.propTypes = {
  onOverlayClick: PropTypes.func.isRequired
}
