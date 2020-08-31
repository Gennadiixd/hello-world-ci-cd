export default function Modal({ message, isModalOpen, onCloseModal }) {
  return (
    <div className={`modal__container${isModalOpen ? "" : "--invisible"}`}>
      <div className="modal">
        <div className="modal__message">{message}</div>
        <div className="modal__actions">
          <button onClick={onCloseModal}>Close</button>
        </div>
      </div>
      <div className="modal__layout" />
    </div>
  );
}
