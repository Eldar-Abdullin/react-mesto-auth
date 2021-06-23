import React from "react";

function PopupWithForm({
  isOpen,
  onClose,
  onSubmit,
  name,
  title,
  button,
  children,
}) {
  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
    }
    return () => document.removeEventListener("keydown", handleEscClose);
  });
  React.useEffect(() => {
    function handleOverlayClick(evt) {
      if (evt.target.classList.contains("popup")) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("click", handleOverlayClick);
    }
    return () => document.removeEventListener("click", handleOverlayClick);
  });
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <form
        name={name}
        className={`popup__container popup__container_${name}`}
        onSubmit={onSubmit}
      >
        <button
          type="reset"
          className={`popup__close-button popup__close-button_${name}`}
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        {children}
        <button type="submit" className={`popup__button popup__button_${name}`}>
          {button}
        </button>
      </form>
    </div>
  );
}
export default PopupWithForm;
