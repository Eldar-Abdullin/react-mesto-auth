import React from "react";
import PopupWithForm from "./PopupWithForm";
function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleLinkChange(e) {
    setLink(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: name,
      link: link,
    });
    setName("");
    setLink("");
  }
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="add"
      title="Новое место"
      button="Создать"
    >
      <input
        type="text"
        placeholder="Название"
        name="place"
        id="place-input"
        value={name}
        onChange={handleNameChange}
        className="popup__input popup__input_place_name"
        required
      />
      <span id="place-input-error" className="popup__error"></span>
      <input
        type="url"
        name="link"
        id="link-input"
        value={link}
        onChange={handleLinkChange}
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_place_link"
        required
      />
      <span id="link-input-error" className="popup__error"></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
