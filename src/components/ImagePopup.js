import React from "react";

function ImagePopup({ card, onClose }) {
  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        onClose();
      }
    }
    if (card) {
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
    if (card) {
      document.addEventListener("click", handleOverlayClick);
    }
    return () => document.removeEventListener("click", handleOverlayClick);
  });
  return (
    <div className={`popup popup_img ${card && "popup_opened"}`}>
      <article className="popup__img-article">
        <button
          type="reset"
          className="popup__close-button popup__close-button_img"
          onClick={onClose}
        ></button>
        <img className="popup__image" src={card?.link} alt={card?.name} />
        <p className="popup__img-caption">{card?.name} </p>
      </article>
    </div>
  );
}
export default ImagePopup;
