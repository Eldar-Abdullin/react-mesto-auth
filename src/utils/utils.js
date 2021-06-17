 function openPopup (popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
  }
function closePopup (popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);

  }
const closeByEsc = (evt) => {
    if (evt.key === 'Escape') {
      const currentPopup = document.querySelector('.popup_opened')
      closePopup(currentPopup);
  }
}
export {openPopup, closePopup, closeByEsc}