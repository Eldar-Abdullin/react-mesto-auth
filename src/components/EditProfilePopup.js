import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const user = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    setName(user.name);
    setDescription(user.about);
  }, [user, props.isOpen]);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="profile"
      title="Редактировать профиль"
      button="Сохранить"
    >
      <input
        minLength="2"
        maxLength="40"
        type="text"
        placeholder="Имя"
        name="name"
        id="name-input"
        value={name || ""}
        onChange={handleNameChange}
        className="popup__input popup__input_type_name"
        required
      />
      <span id="name-input-error" className="popup__error"></span>
      <input
        minLength="2"
        maxLength="200"
        type="text"
        name="job"
        id="job-input"
        placeholder="О себе"
        value={description || ""}
        onChange={handleDescriptionChange}
        className="popup__input popup__input_type_job"
        required
      />
      <span id="job-input-error" className="popup__error"></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
