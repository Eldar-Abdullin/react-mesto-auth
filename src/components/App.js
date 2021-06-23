import React from "react";
import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
import Main from "./Main";
import { Route, Switch, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import InfoToolTip from "./InfoTooltip";
import api from "../utils/api";
import * as auth from "../utils/auth";
import CurrentUserContext from "../contexts/CurrentUserContext";
function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState("");
  const history = useHistory();
  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isInfoTooLTipOpen || isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard) {
      document.addEventListener("keydown", handleEscClose);
    }
    return () => document.removeEventListener("keydown", handleEscClose);
  });
  React.useEffect(() => {
    function handleOverlayClick(evt) {
      if (evt.target.classList.contains("popup")) {
        closeAllPopups();
      }
    }
    if (isInfoTooLTipOpen || isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard) {
      document.addEventListener("click", handleOverlayClick);
    }
    return () => document.removeEventListener("click", handleOverlayClick);
  });
  React.useEffect(() => {
    tokenCheck();
  }, []);

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      auth.getContent(jwt).then((res) => {
        if (res) {
          console.log(res)
          setUserData(res.data.email)
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch(err => console.log(err));
    }
  };
  const handleRegister = (email, password) => {
    auth
      .register(email, password)
      .then((data) => {
        console.log(data);
        localStorage.setItem("jwt", data.jwt);
        setLoggedIn(true);
        setIsInfoTooLTipOpen(true);
        setIsRegOk(true);
        history.push("/");
        console.log(data);
      })
      .catch((err) => {
        setIsInfoTooLTipOpen(true);
        setIsRegOk(false);
        console.log(err);
      });
  };
  const handleLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          console.log(res);
          setUserData(
            email
          )
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  };
  const onSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/sign-in");
  };
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    api
      .getAllCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => setCards((state) => state.filter((c) => c._id !== card._id)))
      .catch((err) => console.log(err));
  }
  const [currentUser, setCurrentUser] = React.useState({});
  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isInfoTooLTipOpen, setIsInfoTooLTipOpen] = React.useState(false);
  const [isRegOk, setIsRegOk] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooLTipOpen(false);
  }
  function handleUpdateAvatar({ avatar }) {
    api
      .changeUserAvatar(avatar)
      .then((data) => {
        console.log(data);
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleUpdateUser({ name, about }) {
    api
      .changeUserInfo(name, about)
      .then((data) => {
        console.log(data);
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleAddPlaceSumit({ name, link }) {
    api
      .addNewCard(name, link)
      .then((newCard) => {
        console.log(newCard);
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="background-color">
        <div className="App">
          <div className="page">
            <Header userData={userData} onSignOut={onSignOut} />
            <Switch>
              <Route path="/sign-up">
                <Register handleRegister={handleRegister} />
              </Route>
              <Route path="/sign-in">
                <Login handleLogin={handleLogin} tokenCheck={tokenCheck} />
              </Route>
              <ProtectedRoute
                component={Main}
                loggedIn={loggedIn}
                exact
                path="/"
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={setSelectedCard}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              ></ProtectedRoute>
            </Switch>
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSumit}
            />
            <PopupWithForm
              isOpen={false}
              onClose={closeAllPopups}
              name="delete"
              title="Вы уверены?"
              button="Да"
            ></PopupWithForm>
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <InfoToolTip
              isOpen={isInfoTooLTipOpen}
              onClose={closeAllPopups}
              regOk={isRegOk}
            />
            <Footer />
          </div>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
