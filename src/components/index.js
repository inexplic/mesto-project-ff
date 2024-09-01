import '../pages/index.css';
import { initialCards } from './cards';
import { deleteCard, createCard, likeCard } from './card';
import { openModal, closeModal, openPopupImage } from './modal';

const placesList = document.querySelector('.places__list');

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const popupContainer = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const page = document.querySelector('.page');

const formEdit = document.forms['edit-profile'];
const nameInput = formEdit.elements.name;
const employmentInput = formEdit.elements.description;

const profTitle = document.querySelector('.profile__title');
const profDescription = document.querySelector('.profile__description');

const formCard = document.forms['new-place'];
const placeNameInput = formCard.elements['place-name'];
const linkInput = formCard.elements.link;

// 6 карточек при загрузке страницы
initialCards.forEach(function (item) {
    const cardItem = createCard(item, deleteCard, likeCard, openPopupImage);
    placesList.append(cardItem);
})

// открытие модального окна для изменения профиля
buttonEdit.addEventListener('click', function(evt) {
    openModal(popupEdit);
    nameInput.value = profTitle.textContent;
    employmentInput.value = profDescription.textContent;
})

// открытие модального окна для добавления карточки
buttonAdd.addEventListener('click', function(evt) {
    openModal(popupNewCard);
    placeNameInput.value = '';
    linkInput.value = '';
})

// слушатель для закрытия модальных окон
popupContainer.forEach(function(popup) {
    popup.addEventListener('click', function(evt) {
        if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
            const popupClose = evt.target.closest('.popup');
            closeModal(popupClose);
        }
    })
})

// слушатель для закрытия модальных окон
page.addEventListener('keydown', function(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closeModal(openedPopup);
        }
    }
})

// обработчик отправки формы
function handleFormSubmit(evt) {
    evt.preventDefault();
    profTitle.textContent = nameInput.value;
    profDescription.textContent = employmentInput.value;
    const popupClose = evt.target.closest('.popup');
    closeModal(popupClose);
}

// слушатель отправки формы редактора профиля
formEdit.addEventListener('submit', handleFormSubmit)


// слушатель отправки формы добавления карточки
formCard.addEventListener('submit', function(evt) {
    evt.preventDefault();
    const newCard = {
        name: '',
        link: '',
        alt: ''
    }
    newCard.name = placeNameInput.value;
    newCard.link = linkInput.value;

    const cardItem = createCard(newCard, deleteCard, likeCard, openPopupImage);
    placesList.prepend(cardItem);

    const popupClose = evt.target.closest('.popup');
    closeModal(popupClose);
})