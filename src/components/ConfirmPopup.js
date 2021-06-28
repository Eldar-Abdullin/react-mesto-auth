import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup(props) {
    console.log(props.card)
  function handleSubmit(e) {
    e.preventDefault();
    props.onCardDelete(props.card)
  }
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="delete"
      title="Вы уверены?"
      button="Да"
    >
    </PopupWithForm>
  );
}
export default ConfirmPopup;
