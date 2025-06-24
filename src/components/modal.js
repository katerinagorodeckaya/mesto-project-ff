//функция открытия поапа
export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleCloseByEsc);
  popup.addEventListener('click', handleCloseByOverlay);
}

// Функция закрытия попапа
export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleCloseByEsc);
  popup.removeEventListener('click', handleCloseByOverlay);
}

// Функция закрытия попапа по клику на Escape
export function handleCloseByEsc(evt) {
  if(evt.key === 'Escape') {
    const popupIsOpen = document.querySelector('.popup_is-opened');
    closeModal(popupIsOpen);
  }
}

// Функция закрытия попапа по клику на оверлей
export function handleCloseByOverlay(evt) {
  if(evt.target.classList.contains('popup')) {
    closeModal(evt.target);
  }
}