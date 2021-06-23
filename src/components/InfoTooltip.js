import React from "react";
import good from "../images/good.svg";
import bad from "../images/bad.svg";
function InfoToolTip({ isOpen, onClose, regOk }) {
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
    <div className={`popup popup_info ${isOpen ? "popup_opened" : ""}`}>
      <div className={`popup__container popup__container_info`}>
        <button
          type="reset"
          className={`popup__close-button popup__close-button_info`}
          onClick={onClose}
        ></button>
        <img
          className="popup__img"
          alt={`${
            regOk
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."
          }`}
          src={`${regOk ? good : bad}`}
        />
        <p className="popup__answer">{`${
          regOk
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."
        }`}</p>
      </div>
    </div>
  );
}
export default InfoToolTip;
