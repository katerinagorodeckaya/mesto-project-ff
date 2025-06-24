import './styles/index.css';
import { initialCards } from './cards.js';
import { createCard, handleDeleteCard, handleLikeCard } from './components/cards.js';
import { openModal, closeModal } from './components/modal.js';

// Элементы попапов
const profilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

// Инициализация анимации попапов
document.querySelectorAll(".popup").forEach(popup => {
  popup.classList.add("popup_is-animated");
});

// Функция для открытия изображения
function handleOpenImage(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(imagePopup);
}

// Инициализация карточек
const placesList = document.querySelector('.places__list');
initialCards.forEach(cardData => {
  placesList.append(createCard(
    cardData, 
    handleDeleteCard, 
    handleLikeCard,
    handleOpenImage
  ));
});

// Навешиваем обработчики закрытия на все крестики
document.querySelectorAll('.popup__close').forEach(button => {
  button.addEventListener('click', () => {
    closeModal(button.closest('.popup'));
  });
});

// Редактирование профиля
const editButton = document.querySelector('.profile__edit-button');
const profileForm = profilePopup.querySelector('.popup__form');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');

function handleProfileSubmit(evt) {
  evt.preventDefault();
  document.querySelector('.profile__title').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;
  closeModal(profilePopup);
}

editButton.addEventListener('click', () => {
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
  openModal(profilePopup); // Используем openModal
});

profileForm.addEventListener('submit', handleProfileSubmit);

// Добавление новой карточки
const addButton = document.querySelector('.profile__add-button');
const cardForm = newCardPopup.querySelector('.popup__form');

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  
  const cardData = {
    name: newCardPopup.querySelector('.popup__input_type_card-name').value,
    link: newCardPopup.querySelector('.popup__input_type_url').value
  };

  placesList.prepend(createCard(
    cardData, 
    handleDeleteCard, 
    handleLikeCard,
    handleOpenImage
  ));
  cardForm.reset();
  closeModal(newCardPopup);
}

addButton.addEventListener('click', () => {
  cardForm.reset();
  openModal(newCardPopup);
});

cardForm.addEventListener('submit', handleNewCardSubmit);