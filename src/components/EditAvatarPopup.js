import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const inputRef = React.useRef("");
  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="change-avatar"
      title="Обновить аватар"
      button="Сохранить"
    >
      <input
        type="url"
        name="link"
        id="avatar-link-input"
        ref={inputRef}
        placeholder="Ссылка на аватар"
        className="popup__input popup__input_change-avatar"
        required
      />
      <span id="avatar-link-input-error" className="popup__error"></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
