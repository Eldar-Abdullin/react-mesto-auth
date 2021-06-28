import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  const user = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === user._id;
  const cardDeleteButtonClassName = `element__delete-button ${
    isOwn ? "" : "element__delete-button_visible"
  }`;
  const isLiked = props.card.likes.some((i) => i._id === user._id);
  const cardLikeButtonClassName = `element__button-like ${
    isLiked ? "element__button-like_active" : ""
  }`;
  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteCard() {
    props.onCardClick(props.card)
    props.onDeleteButtonClick(true);
  }
  return (
    <article className="element">
      <img
        src={props.card.link}
        alt={props.card.name}
        className="element__photo"
        onClick={handleClick}
      />
      {isOwn && (
        <button
          type="button"
          aria-label="Удалить"
          className={cardDeleteButtonClassName}
          onClick={handleDeleteCard}
        ></button>
      )}
      <div className="element__subline">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__block-like">
          <button
            type="button"
            aria-label="Нравится"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="element__quantity-likes">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}
export default Card;
