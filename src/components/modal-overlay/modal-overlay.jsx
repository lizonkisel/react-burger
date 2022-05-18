import modalOverlay from './modal-overlay.module.css';

import PropTypes from 'prop-types';

export default function ModalOverlay({onOverlayClick}) {
  return (
    <div className={modalOverlay.overlay} onClick={onOverlayClick}></div>
  )
}

ModalOverlay.propTypes = {
  onOverlayClick: PropTypes.func.isRequired
}
