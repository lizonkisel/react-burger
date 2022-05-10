import modalOverlay from './modal-overlay.module.css'

export default function ModalOverlay({onOverlayClick}) {
  return (
    <div className={modalOverlay.overlay} onClick={onOverlayClick}></div>
  )
}
