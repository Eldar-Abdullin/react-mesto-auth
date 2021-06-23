import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Card from "./Card";
function Main(props) {
  const user = React.useContext(CurrentUserContext);
  return (
    <main>
      <section className="profile">
        <div className="profile__div-avatar">
          <img src={user.avatar} alt="аватар" className="profile__avatar" />
          <button
            type="button"
            aria-label="Изменить"
            className="profile__change-button"
            onClick={props.onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{user.name}</h1>
          <button
            type="button"
            className="profile__edit-button"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__job">{user.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <div></div>
      <section className="elements">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
